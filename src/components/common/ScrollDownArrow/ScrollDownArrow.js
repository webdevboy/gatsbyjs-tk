import React from 'react';

import './ScrollDownArrow.scss';
import ArrowDown from 'src/svgs/arrow_down';

function ScrollDawnArrow() {
  return (
    <div className="scroll-dawn-arrow-container">
      <ArrowDown className="scroll-dawn-arrow scroll-dawn-arrow1" color="#fff" />
      <ArrowDown className="scroll-dawn-arrow scroll-dawn-arrow2" color="#fff" />
      <ArrowDown className="scroll-dawn-arrow scroll-dawn-arrow3" color="#fff" />
    </div>
  );
}

export default ScrollDawnArrow;
