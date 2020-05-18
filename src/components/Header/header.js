import React from "react"
import Logo from "src/svgs/tk_logo"
import Hamburger from "src/svgs/hamburger"

import "./header.scss"

function Header({ theme }) {
  return (
    <header className={`header ${theme}`}>
      <Logo className="logo" />
      {/* TODO: Implement NAV component */}
      <button onClick={() => console.log("open nav")}>
        <Hamburger className="hamburger" />
      </button>
    </header>
  )
}

export default Header
