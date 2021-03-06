import React from 'react';
import * as cx from "classnames";

import './FiftyFifty.scss';

function FiftyFifty({
  copyBlock,
  headline,
  image,
  reverse,
  copyBackgroundColor,
  copyColor,
  theme,
}) {
  return (
    <section
      className={cx({
        'fifty-fifty': true,
        [theme]: true,
        reversed: reverse,
      })}
      style={{ backgroundColor: copyBackgroundColor }}
    >
      <div className="image-block">
        {image && image.sourceUrl && (
          <div className="img-wrapper">
            <img src={image.sourceUrl} alt={image.alt || 'Foodie image'} />
          </div>
        )}
      </div>
      <div className="copy-block">
        <div
          className="arrow arrow-up"
          style={{
            borderBottom: `15px solid ${copyBackgroundColor}`,
          }}
        ></div>
        <div className="wrapper">
          <h4 style={{ color: copyColor }} dangerouslySetInnerHTML={{ __html: headline }} />
          <p
            style={{ color: copyColor }}
            dangerouslySetInnerHTML={{ __html: copyBlock }}
          ></p>
        </div>
      </div>
    </section>
  );
}

export default FiftyFifty;
