import React from 'react';
import { Link } from 'gatsby';
import moment from 'moment';

import './EventsComponent.scss';

function EventsComponent({ eventStartDate, eventEndDate, eventBackground, eventDescription1, eventDescription2, eventName }) {
  const startDate = moment(new Date(eventStartDate));
  const endDate = moment(new Date(eventEndDate));
  console.log(startDate, endDate);
  return (
    <div className="events-component" style={{ backgroundImage: `url("${eventBackground && eventBackground.sourceUrl || '' }")` }}>
      <div>
        {eventStartDate && (
          <div className="events-component__date">
            {`${startDate.format('MMM DD')} - ${endDate.format('MMM DD')}`}
          </div>
        )}
        {eventStartDate && (
          <div className="events-component__day">
            {startDate.format('D')}
          </div>
        )}
        
      </div>
      <div className="event">
        <div className="event__cutline">
          Event
        </div>
        {eventName && (
          <div className="event__title">
            {eventName}
          </div>
        )}
        
        {eventDescription1 && (
          <div className="event__desc1">
            {eventDescription1}
          </div>
        )}
        
        {eventDescription2 && (
          <div className="event__desc2">
            {eventDescription2}
          </div>
        )}
        
        <Link className="event__link" to="/events">View Calendar</Link>
      </div>
    </div>
  )
}

export default EventsComponent;
