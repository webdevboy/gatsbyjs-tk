import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import Header from "src/components/Header/header"
import Footer from "src/components/Footer/footer"
import Navigation from "src/components/Navigation/Navigation"

import "src/styles/index.scss"

function Layout({ children, theme, title }) {
  const [showNav, setShowNav] = useState(false)
  useEffect(() => {
    document.body.classList.add("wrapper")
    document.body.classList.add(theme)
  })

  return (
    <>
      <Header
        theme={theme || "light"}
        title={title}
        showNav={showNav}
        setShowNav={() => setShowNav(!showNav)}
      />
      <Navigation theme={theme} showNav={showNav} />
      <div>
        <main>{children}</main>
        <Footer />
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
