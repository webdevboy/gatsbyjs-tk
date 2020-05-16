import React from "react"

import "./footer.scss"

function Footer() {
  const handleSubscribeClick = () => {
    console.log("Add user")
  }

  return (
    <footer className="footer">
      <div className="opt-in">
        <h2>Join the inner circle.</h2>
        <p>
          Stay updated with the latest news, stories and events. Lorem ipsum
          dolor etatiti ipsum dolor sit ametait consectetur aditing elit, sed
          doesnts it eiusmodilai tepo incidiad unt ut labore et dolori.
        </p>
        <div className="inputs">
          <input placeholder="Email" type="text" name="email" id="email" />
          <button onClick={handleSubscribeClick}>SUBSCRIBE</button>
        </div>
      </div>
      <div className="site-links">
        <div className="tabs">
          <div className="tab">
            <input type="checkbox" id="chck1" />
            <label className="tab-label" htmlFor="chck1">
              Website
            </label>
            <div className="tab-content">
              <a href="#">Terms</a>
              <a href="#">Shipping</a>
              <a href="#">FAQs</a>
            </div>
          </div>
          <div className="tab">
            <input type="checkbox" id="chck2" />
            <label className="tab-label" htmlFor="chck2">
              Info
            </label>
            <div className="tab-content">
              <a href="#">Subscribe</a>
              <a href="#">Advertise / Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
