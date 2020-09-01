import React, { useRef, useState, useEffect } from 'react';
import Swiper from "react-id-swiper";
import moment from 'moment';
import { navigate, useStaticQuery, graphql } from "gatsby";
import { useTranslation } from "react-i18next";

import { MEDIUM_BREAKPOINT, XLARGE_BREAKPOINT } from "src/utils/breakpoints";
import useWindow from 'src/hooks/useWindow';
import convertLinkLocale from 'src/utils/convertLinkLocale';
import {
  TASTING_KITCHEN_INSTAGRAM_ID,
  MARK_HAMMONS_INSTAGRAM_ID,
} from 'src/utils/constants';
import Instagram from 'src/images/Instagram_icon_gray.png';
import Facebook from 'src/images/Facebook_icon_gray.png';

import "../Chefs/Chefs.scss"
import "./SociallyConnected.scss"

function SociallyConnectedItem({
  type,
  title,
  byline,
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
          <div className="socially__columns__column__info_title">{title}</div>
        )}
        <div className="socially__columns__column__info__social-date">
          {date}
        </div>
        {byline && (
          <div className="socially__columns__column__info_description">
            <span>{byline.length > descriptionMaxLength ? `${byline.slice(0, descriptionMaxLength)}...` : byline}</span>
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

function SociallyConnected({ fbPost }) {
  const [t, i18n] = useTranslation('common');
  const { allInstaNode } = useStaticQuery(graphql`
    query {
      allInstaNode {
        edges {
          node {
            likes
            id
            username
            comments
            original
            preview
            caption
            mediaType
            thumbnails {
              config_height
              config_width
              src
            }
            timestamp
            type
          }
        }
      }
    }
  `);
  const params = {
    spaceBetween: 20,
    slidesPerView: 'auto',
    noSwiping: false,
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

  const convertByline = byline => {
    const newByline = byline.split(/\r?\n/);
    return newByline.length > 0 ? newByline[0] : ''; 
  }
  const posts = allInstaNode && allInstaNode.edges && allInstaNode.edges;
  posts.sort((firstPost, secondPost) => {
    const firstPostDate = moment(new Date(+`${firstPost.node.timestamp}000`));
    const secondPostDate = moment(new Date(+`${secondPost.node.timestamp}000`));
    if(secondPostDate.isBefore(firstPostDate)) {
      return -1;
    }
    else if(firstPostDate.isBefore(secondPostDate)) {
      return 1;
    }
    return 0;
  });
  const tkPost = posts.find(post => {
    if(post.node.username.toString() === TASTING_KITCHEN_INSTAGRAM_ID) {
      return post;
    }
    return false;
  });
  const secondPost = fbPost;
  const markPost = posts.find(post => {
    if(post.node.username.toString() === MARK_HAMMONS_INSTAGRAM_ID) {
      return post;
    }
    return false;
  });
  
  
  console.log(secondPost);

  return (
    <div className="socially-connected">
      <div className="container">
        <div className="socially__title">{t('socially-connected')}</div>
        <div className="socially__columns">    
          <Swiper {...params}>
            {tkPost && (
              <div>
                <SociallyConnectedItem
                  {...{
                    type: 'instagram',
                    title: 'tastingkitchen',
                    byline: convertByline(tkPost.node.caption),
                    imageUrl: tkPost.node.original,
                    articleUrl: `https://www.instagram.com/p/${tkPost.node.id}/`,
                    date: `${moment(new Date(+`${tkPost.node.timestamp}000`)).format('MMMM DD, YYYY')}`,
                  }}
                />
              </div>
            )}
            {secondPost && (
              <div>
                <SociallyConnectedItem
                  {...{
                    type: 'facebook',
                    title: 'tastingkitchen',
                    byline: secondPost.message,
                    imageUrl: secondPost.full_picture,
                    articleUrl: `https://www.facebook.com/tastingkitchen/`,
                    date: `${moment(new Date(secondPost.created_time.slice(0, 16))).format('MMMM DD, YYYY')}`,
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
                    byline: convertByline(markPost.node.caption),
                    imageUrl: markPost.node.original,
                    articleUrl: `https://www.instagram.com/p/${markPost.node.id}/`,
                    date: `${moment(new Date(+`${markPost.node.timestamp}000`)).format('MMMM DD, YYYY')}`,
                  }}
                />
              </div>
            )}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default SociallyConnected
