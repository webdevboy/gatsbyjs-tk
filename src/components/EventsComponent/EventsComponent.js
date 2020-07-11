import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import moment from 'moment';
import { Linear } from 'gsap';
import { isBrowser } from 'src/utils/auth';

import './EventsComponent.scss';

function EventsComponent({
  eventStartDate,
  eventEndDate,
  eventBackground,
  eventDescription1,
  eventDescription2,
  eventName,
}) {
  const startDate = moment(new Date(eventStartDate))
  const endDate = moment(new Date(eventEndDate))
  return (
    <div className="events-component">
      {eventBackground && eventBackground.sourceUrl && (
        <img
          className="events-component__img"
          src={eventBackground.sourceUrl}
          alt=""
        />
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
          <div className="event__cutline">EVENT</div>
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
