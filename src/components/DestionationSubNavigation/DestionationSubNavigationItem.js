import React from 'react';

function DestionationSubNavigationItem({ title, imageUrl, imageRolloverUrl }) {
  return (
    <div className="destionation-sub-navigation__item">
      <div className="destionation-sub-navigation__item__img">
        <img src={imageUrl} alt="" />
        <img src={imageRolloverUrl} alt="" className="destionation-sub-navigation__item__img__hover" />
      </div>
      <div className="destionation-sub-navigation__item__title" dangerouslySetInnerHTML={{ __html: title }} />
    </div>
  )
}

export default DestionationSubNavigationItem;
