import React from "react"
import { Link } from "gatsby"
import logo from "src/images/tk_logo.png"

import "./header.scss"

function Header({ theme }) {
  return (
    <header className={`header ${theme}`}>
      <img src={logo} alt="Site logo" />
      <div className="hamburger"></div>
    </header>
  )
}

export default Header

{
  /* <div>
  <nav>
    <Link to="/">
      <span style={{ color: "white", padding: "10px" }}>Home</span>
    </Link>
    <Link to="/account/">
      <span style={{ color: "white", padding: "10px" }}>My Account</span>
    </Link>{" "}
    <Link to="/account/posts/">
      <span style={{ color: "white", padding: "10px" }}>Posts</span>
    </Link>{" "}
    <Link to="/account/pages/">
      <span style={{ color: "white", padding: "10px" }}>Pages</span>
    </Link>{" "}
  </nav>
</div> */
}
