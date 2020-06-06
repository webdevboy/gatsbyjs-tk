import React from "react"
//import { Link } from "gatsby"
import Logo from "src/svgs/tk_logo"
import Hamburger from "src/svgs/hamburger"
import Close from "src/svgs/close"
import Language from "../Language/language"
import { FormattedMessage, Link } from "gatsby-plugin-intl"

import "./header.scss"

function Header({ theme, title, showNav, setShowNav }) {
  return (
    <header className={`header ${theme}`}>
      <Link to="/">
        <Logo className="logo" />
      </Link>
      {/* <Language /> */}
      <button onClick={() => setShowNav()}>
        <span>
          {showNav ? (
            <Close className="close" />
          ) : (
            <Hamburger className="hamburger" />
          )}
          <p className="title">{title}</p>
        </span>
      </button>
    </header>
  )
}

export default Header
