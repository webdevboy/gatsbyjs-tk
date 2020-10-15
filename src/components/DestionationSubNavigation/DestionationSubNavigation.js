import React, { useState } from 'react';
import Swiper from 'react-id-swiper';
import { path } from 'ramda';

import './DestionationSubNavigation.scss';
import DestionationSubNavigationItem from './DestionationSubNavigationItem';
import DestionationArticle from './DestionationArticle';

function DestionationSubNavigation({ navigationItems }) {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const params = {
    spaceBetween: 0,
    noSwiping: false,
    slidesPerView: 'auto',
  };
  return (
    <div className="destionation-sub-navigation-container">
      <div className="destionation-sub-navigation">
        <Swiper {...params}>
          {navigationItems.map((item, index) => (
            <div className="destionation-sub-navigation__item-container" key={index}>
              <DestionationSubNavigationItem 
                {...{
                  title: path(['navigationItem', 'title'], item),
                  titleColor: path(['navigationItem', 'titleColor'], item),
                  titleHoverOpacity: path(['navigationItem', 'titleHoverOpacity'], item),
                  titleIdleOpacity: path(['navigationItem', 'titleIdleOpacity'], item),
                  imageUrl: path(['navigationItem', 'image', 'sourceUrl'], item),
                  imageRolloverUrl: path(['navigationItem', 'imageRollover', 'sourceUrl'], item),
                  article: path(['navigationItem', 'article'], item),
                  onClick: () => {setSelectedArticle(item.navigationItem.article)},
                  selected: (selectedArticle && selectedArticle.id) === (item.navigationItem.article && item.navigationItem.article.id),
                }}
              />
            </div>
          ))}
        </Swiper>
        {selectedArticle && (
          <DestionationArticle article={selectedArticle} />
        )}
      </div>
    </div>
  )
}

export default DestionationSubNavigation;
