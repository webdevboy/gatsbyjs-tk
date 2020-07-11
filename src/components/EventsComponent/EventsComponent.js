import React from 'react';
import { Link } from 'gatsby';
import moment from 'moment';
import { Parallax, useController } from 'react-scroll-parallax';

import './EventsComponent.scss';

function EventsComponent({
  eventStartDate,
  eventEndDate,
  eventBackground,
  eventDescription1,
  eventDescription2,
  eventName,
}) {
  const { parallaxController } = useController();
  const startDate = moment(new Date(eventStartDate))
  const endDate = moment(new Date(eventEndDate))
  return (
    <div className="events-component">
      {eventBackground && eventBackground.sourceUrl && (
        <Parallax className="events-component__img-wrapper" y={[-10, 20]}>
          <img
            className="events-component__img"
            src={eventBackground.sourceUrl}
            alt=""
            onLoad={() => {
              parallaxController.update(); 
            }}
          />
        </Parallax>
      )}
      <div className="events-component__body">
        <div>
          {eventStartDate && (
            <div className="events-component__date">
              {`${startDate.format('MMM DD')} - ${endDate.format('MMM DD')}`}
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

          <Link className="event__link" to="/events">
            View Calendar
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EventsComponent;
