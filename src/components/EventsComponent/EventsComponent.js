import React from 'react';
import { Link } from 'gatsby';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { Parallax } from 'react-scroll-parallax';
import AdaptiveImage from 'src/components/common/AdaptiveImage/AdaptiveImage';

import './EventsComponent.scss';
import convertLinkLocale from 'src/utils/convertLinkLocale';

function EventsComponent({
  eventStartDate,
  eventEndDate,
  eventBackground,
  eventBackgroundMobile,
  eventBackgroundMedium,
  eventDescription1,
  eventDescription2,
  eventName,
  eventPageSlug,
  updateParallaxState = () => {},
}) {
  const [t, i18n] = useTranslation();
  const startDateArr = eventStartDate && eventStartDate.split('-');
  const endDateArr = eventEndDate && eventEndDate.split('-');

  const startDate = startDateArr.length > 0 && moment(new Date(`${startDateArr[0]}/${startDateArr[1]}/${startDateArr[2]}`));
  const endDate = endDateArr.length > 0 && moment(new Date(`${endDateArr[0]}/${endDateArr[1]}/${endDateArr[2]}`));

  return (
    <div className="events-component">
      {eventBackground && eventBackground.sourceUrl && (
        <Parallax className="events-component__img-wrapper" y={[-10, 5]}>
          <AdaptiveImage
            src={eventBackground.sourceUrl}
            smallSrc={eventBackgroundMobile && eventBackgroundMobile.sourceUrl}
            mediumSrc={eventBackgroundMedium && eventBackgroundMedium.sourceUrl}
            innerProps={{
              onLoad: updateParallaxState,
              className: 'events-component__img',
              style: {
                width: '100%'
              }
            }}
          />
        </Parallax>
      )}
      <div className="events-component__body">
        <div>
          {eventStartDate && (
            <div className="events-component__date">
              {startDate && startDate.format('MMM DD')} - {endDate && endDate.format('MMM DD')}
            </div>
          )}
          {eventStartDate && (
            <div className="events-component__day">{startDate.format('D')}</div>
          )}
        </div>
        <div className="event">
          <div className="event__cutline">EVENTS</div>
          {eventName && <div className="event__title">{eventName}</div>}

          {eventDescription1 && (
            <div className="event__desc1">{eventDescription1}</div>
          )}

          {eventDescription2 && (
            <div className="event__desc2">{eventDescription2}</div>
          )}

          <Link className="event__link" to={convertLinkLocale(`/${eventPageSlug}`, i18n.language)}>
            View Calendar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventsComponent;
