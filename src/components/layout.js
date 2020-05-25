import React from "react"
import PropTypes from "prop-types"

import Header from "src/components/Header/header"
import Footer from "src/components/Footer/footer"
import { useEffect } from "react"

import "src/styles/index.scss"

function Layout({ children, theme, title }) {
  useEffect(() => {
    document.body.classList.add("wrapper")
    document.body.classList.add(theme)
  })

  return (
    <>
      <Header theme={theme || "light"} title={title} />
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
