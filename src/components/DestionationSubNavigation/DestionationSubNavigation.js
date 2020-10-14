import React from 'react';

import './DestionationSubNavigation.scss';

function DestionationSubNavigation(props) {
  console.log(props);
  return (
    <div className="destionation-sub-navigation-container">
      <div className="destionation-sub-navigation">
        <div>Nav 1</div>
        <div>Nav 2</div>
      </div>
    </div>
  )
}

export default DestionationSubNavigation;
