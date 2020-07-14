import React from 'react';

import './ScrollDownArrow.scss';
import ArrowDown from 'src/images/home-hero-arrow.svg';

function ScrollDawnArrow() {
  return (
    <div className="scroll-dawn-arrow-container">
      <img src={ArrowDown} className="scroll-dawn-arrow scroll-dawn-arrow1" color="#fff" />
    </div>
  );
}

export default ScrollDawnArrow;
