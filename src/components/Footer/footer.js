/* eslint jsx-a11y/anchor-is-valid: 0 */
import React from "react"
import { Facebook, Pinterest, Twitter, Instagram, SiteLogo } from "src/svgs"
import { Link } from "@reach/router"

import "./footer.scss"

function Footer() {
  const date = new Date()

  return (
    <footer className="footer">
      <div className="opt-in">
        <h2>Keep Tasting</h2>
        <p>
          Stay up to date with the latest from Tasting Kitchen, Asia’s premier
          epicurean lifestyle magazine, presenting the best in fine food and
          drink, art and design, and luxury travel across the globe.
        </p>
        {/* FIXME: setup to link to sign-up page */}
        <Link to="/signup">SIGN UP</Link>
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
        <div className="social-container">
          <ul>
            <li>
              <a href="https://www.instagram.com/tastingkitchen">
                <Instagram />
              </a>
            </li>
            <li>
              {/* TODO: Get URL for Pinterest */}
              <Pinterest />
            </li>
            <li>
              <a href="https://twitter.com/tastingkitchen8">
                <Twitter />
              </a>
            </li>
            <li>
              <a href="https://www.facebook.com/tastingkitchen/">
                <Facebook />
              </a>
            </li>
          </ul>
        </div>
        <p className="about">
          Tasting Kitchen is a celebration of the finest restaurants, greatest
          chefs and most delicious food. Our mission is simple: to share our
          enthusiasm for all the great culinary experiences the world has to
          offer.
        </p>
        <div className="logo">
          <SiteLogo fill="white" />
          <span>TASTING KITCHEN</span>
        </div>
        <p className="copyright">
          &copy; {date.getFullYear()} Tasting Kitchen. All Rights Reserved
        </p>
      </div>
    </footer>
  )
}

export default Footer
