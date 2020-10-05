import React from 'react';
import { Link } from 'gatsby';
import moment from 'moment';
import 'moment/locale/zh-cn';
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
  const [t, i18n] = useTranslation(['common']);
  
  const startDate = eventStartDate && moment(new Date(eventStartDate.replace(/\-/g, '/'))).add(1, 'days'); 
  const endDate = eventEndDate && moment(new Date(eventEndDate.replace(/\-/g, '/'))).add(1, 'days');
  const lang = i18n.language !== 'en' ? 'zh-cn' : 'en';

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
              {`${startDate.locale(lang).utc().format('MMM DD')}${eventEndDate ? ` - ${endDate.locale(lang).utc().format('MMM DD')}` : ''}`}
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
            {t('event-view-calendar')}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventsComponent;
