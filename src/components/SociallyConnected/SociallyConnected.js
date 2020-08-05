import React from 'react';
import Swiper from "react-id-swiper";
import moment from 'moment';
import { navigate, useStaticQuery, graphql } from "gatsby";
import { useTranslation } from "react-i18next";

import { MEDIUM_BREAKPOINT, XLARGE_BREAKPOINT } from "src/utils/breakpoints";
import convertLinkLocale from 'src/utils/convertLinkLocale';
import Instagram from 'src/images/Instagram_icon_gray.png';

import "../Chefs/Chefs.scss"
import "./SociallyConnected.scss"

function SociallyConnectedItem({
  type,
  title,
  byline,
  imageUrl,
  articleUrl,
  timestamp,
}) {
  const [t, i18n] = useTranslation('article');
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
        </div>
        {title && (
          <div className="socially__columns__column__info_title">{title}</div>
        )}
        <div className="socially__columns__column__info__social-date">
          {/* {`POSTED BY TASTING KITCHEN • ${moment(new Date(+`${timestamp}000`)).format('MMMM DD, YYYY')}`} */}
          {`${moment(new Date(+`${timestamp}000`)).format('MMMM DD, YYYY')}`}
        </div>
        {byline && (
          <div className="socially__columns__column__info_description">
            {byline}
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

function SociallyConnected({ column1, column2, column3 }) {
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
  
  return (
    <div className="socially-connected">
      <div className="container">
        <div className="socially__title">{t('socially-connected')}</div>
        <div className="socially__columns">
          <Swiper {...params}>
            {posts.slice(0, 3).map(node => {
              let byline = node.node.caption.split(/\r?\n/);
              return (
                <div key={node.node.id}>
                  <SociallyConnectedItem
                    {...{
                      type: 'instagram',
                      title: 'From: tastingkitchen',
                      byline: byline.length > 0 ? byline[0] : '',
                      imageUrl: node.node.original,
                      articleUrl: `https://www.instagram.com/p/${node.node.id}/`,
                      timestamp: node.node.timestamp,
                    }}
                  />
                </div>
              )
            })}
            {/* {column1 && (
              <div>
                <SociallyConnectedItem {...getFormattedArticle(column1)} />
              </div>
            )}
            {column2 && (
              <div>
                <SociallyConnectedItem {...getFormattedArticle(column2)} />
              </div>
            )}
            {column3 && (
              <div>
                <SociallyConnectedItem {...getFormattedArticle(column3)} />
              </div>
            )} */}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default SociallyConnected
