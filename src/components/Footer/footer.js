/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { useState } from "react"
import * as cx from "classnames"
import { FormattedMessage } from "gatsby-plugin-intl"
import addToMailchimp from "gatsby-plugin-mailchimp"

import "./footer.scss"

function Footer() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleError = () => {
    setError(true)

    setTimeout(() => {
      setError(false)
    }, 3000)
  }

  const addUser = email => {
    const emailRegExp = new RegExp(
      /(^[A-Za-z0-9._%+-]{1,64}@(?:(([A-Za-z-]*[\d]*[A-Za-z-]+[\d]*){1,63})\.){1,125}[A-Za-z]{2,63}$)/
    )

    if (emailRegExp.test(email)) {
      addToMailchimp(email)
        .then(({ msg, result }) => {
          if (result !== "success") {
            throw new Error(msg)
          }
          console.log({ msg, result })
          setSubmitted(true)
        })
        .catch(err => {
          console.log({ err })
          handleError()
        })
    } else {
      handleError()
    }
  }

  const handleEmailChange = event => {
    event.preventDefault()
    setEmail(event.target.value)
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
        <p className={cx("message", { show: error || submitted })}>
          {!error && !submitted && `Please Enter a valid email`}
          {error && `Please Enter a valid email`}
          {submitted && `Submitted`}
        </p>
        <div className="inputs">
          <input
            placeholder="Email"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
          <button onClick={() => addUser(email)}>
            <FormattedMessage id="subscribe-btn" />
          </button>
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
