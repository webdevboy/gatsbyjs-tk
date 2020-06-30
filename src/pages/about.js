import React from "react"
import Layout from "src/components/layout"

import "src/styles/about.scss"

const About = () => {
  const title = "About Tasting Kitchen"

  return (
    <Layout theme="light" title={title}>
      <div className="about-page">
        <h1 className="about-headline">{title}</h1>

        <div className="content-block">
          <div className="img-wrapper">
            <img src="http://fpoimg.com/450x880?text=Preview" alt="FPO" />
            <p className="cutline">Photography by David Hartung</p>
          </div>
          <div className="copyblock">
            <p>
              Tasting Kitchen (TK) is Asia’s foremost epicurean lifestyle and
              travel magazine. Published every two months in English and
              Chinese,TK is a celebration of the world’s finest restaurants,
              greatest chefs, and most delicious food. Our mission is simple: to
              share our enthusiasm for all the great culinary experiences the
              world has to offer.
            </p>
            <p>
              TK, which is distributed in Shanghai, Beijing, Guangzhou,
              Shenzhen, Chengdu, Hong Kong and Macau, reaches an affluent
              audience of 300,000 readers. It can be found in nearly all of the
              region’s best hotels, at more than 800 fine restaurants, in more
              than a hundred private clubs, on ferries, and in airplane lounges,
              boutique coffee shops, bookstores, wine shops, and gourmet food
              emporiums.
            </p>
            <p>
              TK has won a total of nine SOPA (Society of Publishers in Asia)
              awards for editorial excellence over the past six years, more than
              any other lifestyle publication.
            </p>
            <p>
              With a total circulation of 80,000 in Mainland China, 20,000 in
              Hong Kong and 10,000 in Macau, TK continues to expand its reach
              across Greater China by building a comprehensive epicurean
              lifestyle brand through inspiring content and events.
            </p>
          </div>
        </div>
        <div className="info-block">
          <h4 className="about-sub-head">Offices</h4>
          <ul className="info-container">
            <li>
              <p>Shanghai</p>
              <p>Room H2, No 25 , Lane 550 South Shaanxi Road, Shanghai</p>
            </li>
            <li>
              <p>Hong Kong</p>
              <p>
                Units 1-2, 6/F., Oceanic Industrial Centre, 2 Lee Lok Street, Ap
                Lei Chau, Hong Kong
              </p>
            </li>
            <li>
              <p>Macau</p>
              <p>Rua do Volong n2-a Lazarus Verde Cave A, Macau</p>
            </li>
          </ul>
        </div>
        <div className="info-block">
          <h4 className="about-sub-head">Contacts</h4>
          <ul className="info-container">
            <li>
              <p>General</p>
              <p>
                For all customer service questions or comments, sales and
                distribution enquiries, kindly email{" "}
                <b>info@tasting-kitchen.com</b>
              </p>
            </li>
            <li>
              <p>Event</p>
              <p>
                For event inquiries, please email{" "}
                <b>oceantable@tasting-kitchen.com</b>
              </p>
            </li>
            <li>
              <p>Editorial</p>
              <p>
                For editorial content inquiries or article submission, please
                email <b>editorial@tasting-kitchen.com</b>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}

export default About

// Resources
// Editorial Team
// Newsletter signup only on mobile?
