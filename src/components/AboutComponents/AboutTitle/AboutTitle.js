import React from 'react';

import './AboutTitle.scss';

const AboutTitle = ({ title }) => (
  <div className="about-title">
    <h1 className="about-headline">{title}</h1>
  </div>
);

export default AboutTitle;
