import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import cx from 'classnames';

import Header from "src/components/Header/header";
import Footer from "src/components/Footer/footer";
import Navigation from "src/components/Navigation/Navigation";

import "src/styles/index.scss";

function Layout({ children, theme, title, isFrontPage, isArticlePage, heroIsVisible, pageScroll }) {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    document.body.classList.add("wrapper")

    // remove all theme classes
    document.body.classList.remove("light")
    document.body.classList.remove("dark")

    // apply the current theme
    document.body.classList.add(theme)
  }, [title])

  return (
    <div>
      <Navigation theme={theme || 'light'} showNav={showNav} closeNav={() => setShowNav(false)} />
      <Header
        theme={theme || "light"}
        title={title}
        showNav={showNav}
        setShowNav={() => setShowNav(!showNav)}
        isFrontPage={isFrontPage}
        isArticlePage={isArticlePage}
        heroIsVisible={heroIsVisible}
        pageScroll={pageScroll}
        shifted={showNav}
      />
      <div className={cx('sidebar-open-overlay', { hidden: !showNav })} />
      <div className={cx('page-body', { shifted: showNav })}>
        
        <main>{children}</main>
        <Footer />
        
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
