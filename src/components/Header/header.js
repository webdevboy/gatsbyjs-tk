import React from "react"
import { Link } from "gatsby"
import Logo from "src/components/Logo/logo"

import "./header.scss"

function Header() {
  return (
    <header className="header">
      {/* <div className="search"></div> */}
      <Logo theme="dark" />
      {/* <div className="hamburger"></div> */}
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
