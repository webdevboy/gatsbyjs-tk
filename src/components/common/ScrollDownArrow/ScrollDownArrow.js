import React from 'react';

import './ScrollDownArrow.scss';

const handleArrowClick = () => {
  let url = window.location.href;
  window.location.href = "#content";
  window.history.replaceState(null,null,url);   //
}

function ScrollDawnArrow() {
  return (
    <div className="scroll-dawn-arrow-container" onClick={handleArrowClick}>
			  <span className="scroll-arrows unu"></span>
			  <span className="scroll-arrows doi"></span>
    </div>
  );
}

export default ScrollDawnArrow;
