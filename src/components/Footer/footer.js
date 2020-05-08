import React from "react"

import "./footer.scss"

const Footer = () => {
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
          <button>SUBSCRIBE</button>
        </div>
      </div>
    </footer>
  )
}

export default Footer
