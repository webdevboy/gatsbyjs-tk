import React from "react"
import { Link } from "gatsby"
import Logo from "src/svgs/tk_logo"
import Hamburger from "src/svgs/hamburger"

import "./header.scss"

function Header({ theme, title }) {
  return (
    <header className={`header ${theme}`}>
      <Link to="/">
        <Logo className="logo" />
      </Link>
      {/* TODO: Implement NAV component */}
      <button onClick={() => console.log("open nav")}>
        <span>
          <Hamburger className="hamburger" />
          <p className="title">{title}</p>
        </span>
      </button>
    </header>
  )
}

export default Header
