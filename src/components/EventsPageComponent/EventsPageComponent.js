import React from "react"

import './EventsPageComponent.scss';
import Calendar from 'src/images/Calendar.png';
import Cursor from 'src/images/mouse.png';
import Pointer from 'src/images/pin.png';

function EventsPageComponent({ eventCategory, eventDescription, eventTitle, eventColumns, eventImage }) {
  const column1 = eventColumns[0].column1;
  const column2 = eventColumns[0].column2;
  const column3 = eventColumns[0].column3;
  return (
    <div className="events-page">
      <div className="container">
        <img src={eventImage.sourceUrl} className="events-page__img" alt="" />
        <div className="events-page__body">
          <div className="events-page__body__cutline" dangerouslySetInnerHTML={{ __html: eventCategory }} />
          <div className="events-page__body__title" dangerouslySetInnerHTML={{ __html: eventTitle }} />
          <div className="events-page__body__blocks">
            <div className="events-page__body__block">
              <img src={column1.columnIcon.sourceUrl} className="events-page__body__block__icon" alt="" />
              <div className="events-page__body__block__text" dangerouslySetInnerHTML={{ __html: column1.columnTitle }} />
            </div>
            <div className="events-page__body__block">
              <img src={column2.columnIcon.sourceUrl} className="events-page__body__block__icon" alt="" />
              <div className="events-page__body__block__text" dangerouslySetInnerHTML={{ __html: column2.columnTitle }} />
            </div>
            <div className="events-page__body__block">
              <img src={column3.columnIcon.sourceUrl} className="events-page__body__block__icon" alt="" />
              <div className="events-page__body__block__text" dangerouslySetInnerHTML={{ __html: column3.columnTitle }} />
            </div>
          </div>
          {eventDescription && (
            <div className="events-page__body__description" dangerouslySetInnerHTML={{ __html: eventDescription }} />
          )}
        </div>
      </div>
      <div className="events-page__controls-wrapper">
        {/* <div className="events-page__controls">
          <div>Previous</div>
          <div>All Events</div>
          <div>Next</div>
        </div> */}
      </div>
    </div>
  )
}

export default EventsPageComponent;
