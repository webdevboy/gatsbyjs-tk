import React from 'react';
import { path } from 'ramda';

import './DestinationIntroduction.scss';
import PhoneIcon from 'src/images/phone.svg';
import AirplaneIcon from 'src/images/airplane.svg';
import PointerIcon from 'src/images/pointer.svg';
import WorldIcon from 'src/images/world.svg';

function DestinationIntroduction({ destinationIntroductionBody }) {
  
  const backgroundColor = path(['backgroundColor'], destinationIntroductionBody);
  const copyColor = path(['copyColor'], destinationIntroductionBody);
  const destinationIntroductionTitle = path(['destinationIntroductionTitle'], destinationIntroductionBody);
  const bodyCopy = path(['bodyCopy'], destinationIntroductionBody);
  const countryIconLabel = path(['countryIconLabel'], destinationIntroductionBody);
  const languageIconLabel = path(['languageIconLabel'], destinationIntroductionBody);
  const mainAirportIconLabel = path(['mainAirportIconLabel'], destinationIntroductionBody);
  const areaCodeIconLabel = path(['areaCodeIconLabel'], destinationIntroductionBody);

  return (
    <div className="destination-introduction" style={{ backgroundColor: backgroundColor }}>
      <div className="destination-introduction__copy" style={{ color: copyColor }}>
        <div className="destination-introduction__copy__title" dangerouslySetInnerHTML={{ __html: destinationIntroductionTitle }} />
        <div className="destination-introduction__copy__body" dangerouslySetInnerHTML={{ __html: bodyCopy }} />
        <div className="destination-introduction__copy__info">
          <div className="destination-introduction__copy__info__item">
            <img src={PointerIcon} alt="pointer" />
            <span>{countryIconLabel}</span>
          </div>
          <div className="destination-introduction__copy__info__item">
            <img src={AirplaneIcon} alt="pointer" />
            <span>{mainAirportIconLabel}</span>
          </div>
          <div className="destination-introduction__copy__info__item">
            <img src={WorldIcon} alt="pointer" />
            <span>{languageIconLabel}</span>
          </div>
          <div className="destination-introduction__copy__info__item">
            <img src={PhoneIcon} alt="pointer" />
            <span>{areaCodeIconLabel}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DestinationIntroduction;
