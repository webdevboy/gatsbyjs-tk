import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
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
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
