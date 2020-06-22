import React from "react"
import * as cx from "classnames"
import Logo from "src/svgs/tk_logo"
import LanguageToggle from "src/components/LanguageToggle/LanguageToggle"
import LoginLogout from "src/components/LoginLogout/LoginLogout"
import { Link } from "gatsby"

import "./header.scss"

function Hamburger({ isOpen }) {
  return (
    <div className={cx("nav-icon", { open: isOpen })}>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  )
}

function Header({ theme, title, showNav, setShowNav }) {
  return (
    <header className={`header ${theme}`}>
      <Link to="/">
        <Logo className="logo" />
      </Link>
      {/* TODO: This needs to be styled */}
      <LanguageToggle theme={theme} />
      <LoginLogout />
      <button onClick={() => setShowNav()}>
        <Hamburger isOpen={showNav} />
        {/* {title && <p className="title">{title}</p>} */}
      </button>
    </header>
  )
}

export default Header
