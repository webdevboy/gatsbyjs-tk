import React from "react"

import './EventsPage.scss';
import { Calendar, Pointer, Cursor } from '../../svgs';

function EventsPage() {
  return (
    <div className="events-page">
      <div className="container">
        <div className="events-page__img" style={{ backgroundImage: `url("http://ec2-3-21-169-223.us-east-2.compute.amazonaws.com/wp-content/uploads/2020/06/Photo-1.png")` }} />
        <div className="events-page__body">
          <div className="events-page__body__cutline">ART</div>
          <div className="events-page__body__title">Event title</div>
          <div className="events-page__body__blocks">
            <div className="events-page__body__block">
              <Calendar className="events-page__body__block__icon" style={{ width: '30px', height: '30px' }} />
              <div className="events-page__body__block__text">
                February 13, 2020 - <br /> April 12. 2020
              </div>
            </div>
            <div className="events-page__body__block">
              <Pointer className="events-page__body__block__icon" style={{ width: '30px', height: '30px' }} />
              <div className="events-page__body__block__text">
                Hauser & Wirth <br />
                901-900 E 3rd St, Los <br />
                Angeles, CA 90013
              </div>
            </div>
            <div className="events-page__body__block">
              <Cursor className="events-page__body__block__icon" style={{ width: '30px', height: '30px' }} />
              <div className="events-page__body__block__text">
                hauserwirth.com
              </div>
            </div>
          </div>
          <div className="events-page__body__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
            ut labore et dolore magna aliqua. Dapibus ultrices in iaculis nunc sed augue lacus. Quam
            nulla porttitor massa id neque aliquam. Ultrices mi tempus imperdiet nulla malesuada.
            Eros in cursus turpis massa tincidunt dui ut ornare lectus. Egestas sed sed risus pretium.
            Lorem dolor sed viverra ipsum. Gravida rutrum quisque non tellus. Rutrum tellus
            pellentesque eu tincidunt tortor. Sed blandit libero volutpat sed cras ornare. Et netus
            et malesuada fames ac. Ultrices eros in cursus turpis massa tincidunt dui ut ornare.
            Lacus sed viverra tellus in. Sollicitudin ac orci phasellus egestas. Purus in mollis
            nunc sed. Sollicitudin ac orci phasellus egestas tellus rutrum tellus pellentesque.
            Interdum consectetur libero id faucibus nisl tincidunt eget.
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventsPage
