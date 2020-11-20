import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { path } from 'ramda';
import axios from 'axios';
import Swiper from "react-id-swiper";
import moment from 'moment';
import 'moment/locale/zh-cn';
import { useStaticQuery, graphql } from "gatsby";
import { useTranslation } from "react-i18next";

import { MEDIUM_BREAKPOINT, XLARGE_BREAKPOINT } from "src/utils/breakpoints";
import useWindow from 'src/hooks/useWindow';
import {
  TASTING_KITCHEN_INSTAGRAM_ID,
  MARK_HAMMONS_INSTAGRAM_ID,
} from 'src/utils/constants';
import Instagram from 'src/images/Instagram_icon_gray.png';
import Facebook from 'src/images/Facebook_icon_gray.png';

import "../Chefs/Chefs.scss";
import "./SociallyConnected.scss";

function SociallyConnectedItem({
  type,
  title,
  caption,
  imageUrl,
  articleUrl,
  date,
}) {
  const [t, i18n] = useTranslation('article');
  const _window = useWindow();
  const [descriptionMaxLength, setDescriptionMaxLength] = useState(215);
  

  useEffect(() => {
    let windowResizeListener = null;
    if(_window) {
      if(_window.innerWidth > MEDIUM_BREAKPOINT) {
        setDescriptionMaxLength(320);
      }
      windowResizeListener = _window.addEventListener('resize', () => {
        if(_window.innerWidth < MEDIUM_BREAKPOINT) {
          setDescriptionMaxLength(215);
        }
        else if(_window.innerWidth > MEDIUM_BREAKPOINT) {
          setDescriptionMaxLength(320);
        }
      });
    }
    return () => {
      if(_window && windowResizeListener) {
        _window.removeEventListener(windowResizeListener);
      }
    }
  }, []);
  
  return (
    <a
      className="socially__columns__column"
      href={articleUrl}
      target="_blank"
    >
      {imageUrl && (
        <div className="socially__columns__column__img__wrapper">
          <img
            className="socially__columns__column__img"
            src={imageUrl}
            alt=""
          />
        </div>
      )}

      <div className="socially__columns__column__info">
        <div className="socially__columns__column__info__social-type">
          {type === 'instagram' && <img src={Instagram} alt="instagram" />}
          {type === 'facebook' && <img src={Facebook} alt="facebook" />}
        </div>
        {title && (
          <div className="socially__columns__column__info_title"><span className="socially__columns__column__info_at">@</span>{title}</div>
        )}
        <div className="socially__columns__column__info__social-date">
          {date}
        </div>
        {caption && (
          <div className="socially__columns__column__info_description">
            <span>{caption.length > descriptionMaxLength ? `${caption.slice(0, descriptionMaxLength)}...` : caption}</span>
          </div>
        )}

        <div className="socially__columns__column__info_more">
          <span className="socially__columns__column__info_more__link">
            {t('see-post')}
          </span>
        </div>
      </div>
    </a>
  )
}

function SociallyConnected() {
  const [t, i18n] = useTranslation('common');
  const [fbPost, setFbPost] = useState(null);
  const [tkPost, setTkPost] = useState(null);
  const [markPost, setMarkPost] = useState(null);
  const [swiperInit, setSwiperInit] = useState(false);
  const _window = useWindow();

  const lang = i18n.language !== 'en' ? 'zh-cn' : 'en';

  const convertCaption = byline => {
    const newByline = byline.split(/\r?\n/);
    return newByline.length > 0 ? newByline[0] : ''; 
  }

  const converInstPost = post => {
    const captions = path(['edge_media_to_caption', 'edges'], post);
    const caption = captions && captions.length > 0 && captions[0].node.text;
    return {
      caption: convertCaption(caption),
      imageUrl: post.thumbnail_src,
      articleUrl: `https://www.instagram.com/p/${post.shortcode}/`,
      date: `${moment(new Date(+`${post.taken_at_timestamp}000`)).locale(lang).format('MMMM DD, YYYY')}`,
    }
  }

  const params = {
    spaceBetween: 20,
    slidesPerView: 'auto',
    noSwiping: false,
    shouldSwiperUpdate: true,
    rebuildOnUpdate: true,
    scrollbar: {
      el: ".socially__scrollbar",
      hide: false,
      draggable: true,
      dragSize: 68,
    },
    breakpoints: {
      [MEDIUM_BREAKPOINT]: {
        slidesPerView: 2,
        spaceBetween: 41,
        noSwiping: false,
        allowSlidePrev: true,
        allowSlideNext: true,
        scrollbar: {
          dragSize: 126,
        },
      },
      [XLARGE_BREAKPOINT]: {
        slidesPerView: 3,
        spaceBetween: 41,
        noSwiping: true,
        allowSlidePrev: false,
        allowSlideNext: false,
        scrollbar: {
          hide: true,
        },
      },
    },
  }

  useEffect(() => {
    if(_window) {
      _window.fbAsyncInit = function() {
        _window.FB.init({
          appId            : '603773567003337',
          version          : 'v8.0'
        });
        _window.FB.api('/me?fields=feed.limit(1){full_picture,id,message,created_time}', 'GET', {
          access_token: process.env.GATSBY_FACEBOOK_GRAPH_TOKEN,
        }, async res => {
          const posts = path(['feed', 'data'], res);
          const tkInstResp = await axios.get('https://www.instagram.com/tastingkitchen/?__a=1');
          const markInstResp = await axios.get('https://www.instagram.com/mark_hammons/?__a=1');
          const tkInstPosts = path(['data', 'graphql', 'user', 'edge_owner_to_timeline_media', 'edges'], tkInstResp);
          const markInstPosts = path(['data', 'graphql', 'user', 'edge_owner_to_timeline_media', 'edges'], markInstResp);
          const tkPost = tkInstPosts && tkInstPosts.length > 0 && tkInstPosts[0].node;
          const markPost = markInstPosts && markInstPosts.length > 0 && markInstPosts[0].node;
          if(posts && posts.length > 0) {
            setFbPost(posts[0]);
            setTkPost(tkPost);
            setMarkPost(markPost);

            setSwiperInit(true);
          }
        });
      };
    }
  }, []);

  return (
    <div className="socially-connected">
      <Helmet>
        <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js" />
      </Helmet>
      <div className="container">
        <div className="socially__title">{t('socially-connected')}</div>
        <div className="socially__columns">    
          {swiperInit && (
            <Swiper {...params} className="swiper-obj">
              {tkPost && (
                <div>
                  <SociallyConnectedItem
                    {...{
                      type: 'instagram',
                      title: 'tastingkitchen',
                      ...converInstPost(tkPost),
                    }}
                  />
                </div>
              )}
              {fbPost && (
                <div>
                  <SociallyConnectedItem
                    {...{
                      type: 'facebook',
                      title: 'tastingkitchen',
                      caption: fbPost.message,
                      imageUrl: fbPost.full_picture,
                      articleUrl: `https://www.facebook.com/tastingkitchen/`,
                      date: `${moment(new Date(fbPost.created_time.slice(0, 16))).locale(lang).format('MMMM DD, YYYY')}`,
                    }}
                  />
                </div>
              )}
              {markPost && (
                <div>
                  <SociallyConnectedItem
                    {...{
                      type: 'instagram',
                      title: 'mark_hammons',
                      ...converInstPost(markPost),
                    }}
                  />
                </div>
              )}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  )
}

export default SociallyConnected
