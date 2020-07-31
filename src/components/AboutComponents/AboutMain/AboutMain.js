import React from 'react';

import './AboutMain.scss';

const AboutMain = ({ aboutMainDescription, aboutMainImage, aboutMainImageAuthor }) => (
  <div className="about-main">
    <div className="content-block-wrapper">
      <div className="content-block">
        <div className="img-wrapper">
          {aboutMainImage && (
            <img
              src={aboutMainImage.sourceUrl}
              alt="About"
            />
          )}
          {aboutMainImageAuthor && <p className="cutline">{aboutMainImageAuthor}</p>}
        </div>
        
        <div className="copyblock">
          {aboutMainDescription && aboutMainDescription.map(p => (
            <p dangerouslySetInnerHTML={{ __html: p.paragraph }} />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default AboutMain;

