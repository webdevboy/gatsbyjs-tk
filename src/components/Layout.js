import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import cx from 'classnames';
import { useTranslation } from 'react-i18next';

import Header from "src/components/Header/header";
import Footer from "src/components/Footer/footer";
import Navigation from "src/components/Navigation/Navigation";

import "src/styles/index.scss";

function Layout({ children, theme, title, isFrontPage, isArticlePage, heroIsVisible, pageScroll, homeHeroLoaded, removeTopPadding, pageScrolled, articleImageUrl }) {
  const [showNav, setShowNav] = useState(false);
  const [t, i18n] = useTranslation();

  useEffect(() => {
    if (typeof document !== `undefined`) {
      document.body.classList.add("wrapper")

      // remove all theme classes
      document.body.classList.remove("light")
      document.body.classList.remove("dark")

      // apply the current theme
      document.body.classList.add(theme)
    }
  }, [title])

  // prevent scrolling of content when navigation is open
  if (typeof document !== `undefined`) {
    if (showNav) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
  }

  return (
    <div className={cx({ 'chinese-language': i18n.language === 'zh', 'chinese-language-tc': i18n.language === 'zh_tc' })}>
      <Navigation theme={theme || 'light'} showNav={showNav} closeNav={() => setShowNav(false)} />
      <Header
        theme={theme || "light"}
        title={title}
        showNav={showNav}
        setShowNav={() => setShowNav(!showNav)}
        isFrontPage={isFrontPage}
        isArticlePage={isArticlePage}
        articleImageUrl={articleImageUrl}
        heroIsVisible={heroIsVisible}
        pageScroll={pageScroll}
        shifted={showNav}
        homeHeroLoaded={homeHeroLoaded}
        pageScrolled={pageScrolled}
      />
      <div className={cx('sidebar-open-overlay', { hidden: !showNav })} onClick={() => setShowNav(false)} />
      <div className={cx('page-body', { shifted: showNav, 'page-body--no-padding': removeTopPadding })}>
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
