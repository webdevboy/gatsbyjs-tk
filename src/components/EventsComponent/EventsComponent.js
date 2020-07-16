import React from 'react';
import { Link } from 'gatsby';
import moment from 'moment';
import { Parallax } from 'react-scroll-parallax';

import './EventsComponent.scss';

function EventsComponent({
  eventStartDate,
  eventEndDate,
  eventBackground,
  eventDescription1,
  eventDescription2,
  eventName,
  updateParallaxState = () => {},
}) {
  const startDateArr = eventStartDate.split('-');
  const endDateArr = eventEndDate.split('-');
  const startDate = startDateArr.length > 0 && moment().set({'year': startDateArr[2], 'month': startDateArr[0], 'date': startDateArr[1]});
  const endDate = endDateArr.length > 0 && moment().set({'year': endDateArr[2], 'month': endDateArr[0], 'date': endDateArr[1]});
  return (
    <div className="events-component">
      {eventBackground && eventBackground.sourceUrl && (
        <Parallax className="events-component__img-wrapper" y={[-10, 5]}>
          <img
            className="events-component__img"
            src={eventBackground.sourceUrl}
            alt=""
            onLoad={updateParallaxState}
          />
        </Parallax>
      )}
      <div className="events-component__body">
        <div>
          {eventStartDate && (
            <div className="events-component__date">
              {`${startDate.utc().format('MMM DD')} - ${endDate.utc().format('MMM DD')}`}
            </div>
          )}
          {eventStartDate && (
            <div className="events-component__day">{startDate.utc().format('D')}</div>
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

          <Link className="event__link" to="/events">
            View Calendar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventsComponent;
