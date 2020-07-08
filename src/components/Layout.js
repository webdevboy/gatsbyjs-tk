import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"

import Header from "src/components/Header/header"
import Footer from "src/components/Footer/footer"
import Navigation from "src/components/Navigation/Navigation"

import "src/styles/index.scss"

function Layout({ children, theme, title, isFrontPage, isArticlePage, heroIsVisible, pageScroll }) {
  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    document.body.classList.add("wrapper")

    // remove all theme classes
    document.body.classList.remove("light")
    document.body.classList.remove("dark")

    // apply the current theme
    document.body.classList.add(theme)
  }, [title])

  return (
    <>
      <Header
        theme={theme || "light"}
        title={title}
        showNav={showNav}
        setShowNav={() => setShowNav(!showNav)}
        isFrontPage={isFrontPage}
        isArticlePage={isArticlePage}
        heroIsVisible={heroIsVisible}
        pageScroll={pageScroll}
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
