import React from 'react';
import cx from 'classnames';

function DestionationSubNavigationItem({ title, imageUrl, imageRolloverUrl, onClick, selected }) {
  return (
    <div className={cx('destionation-sub-navigation__item', { 'destionation-sub-navigation__item--selected': selected })} onClick={onClick}>
      <div className="destionation-sub-navigation__item__img">
        <img src={imageUrl} alt="" />
        <img src={imageRolloverUrl} alt="" className="destionation-sub-navigation__item__img__hover" />
      </div>
      <div className="destionation-sub-navigation__item__title" dangerouslySetInnerHTML={{ __html: title }} />
    </div>
  )
}

export default DestionationSubNavigationItem;
