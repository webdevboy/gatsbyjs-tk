import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import { Link } from "gatsby"
import * as cx from "classnames"

import useWindow from 'src/hooks/useWindow';
import { ItemWithSubNav } from './Navigation';
import { isAuthenticated, logout } from 'src/utils/auth';
import replaceAmpersand from 'src/utils/replaceAmpersand';
import convertLinkLocale from 'src/utils/convertLinkLocale';
import Hamburger from 'src/components/common/Hamburger/Hamburger';
import LanguageToggle from 'src/components/LanguageToggle/LanguageToggle';

function MenusEn({ theme, showNav, path, closeNav, filterMenuItems }) {
  const _window = useWindow() || {};
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const subNavOpen = showLanguages || showSubMenu ? true : false;
  const [t, i18n] = useTranslation();
  const { wordpress } = useStaticQuery(graphql`
    query {
      wordpress {
        generalSettings {
          url
        }
        menus(where: { location: EXPANDED }) {
          nodes {
            id
            name
            slug
            menuItems(first: 50) {
              nodes {
                url
                id
                label
                childItems(first: 50) {
                  nodes {
                    url
                    id
                    label
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  const getUrlPath = url => {
    return url.replace(wordpress.generalSettings.url, "");
  }

  const handleNavClick = (e, url) => {
    e.preventDefault();
    closeNav();

    _window.setTimeout(() => {
     _window.location.href = url.replace(/\/$/, '');
    }, 300)
  }

  return wordpress ? (
    <nav
      className={cx({
        navigation: true,
        [theme]: true,
        "slide-in": showNav,
        "home-slide": path === '/',
      })}
    >
      <div className="navigation-head">
        <button onClick={closeNav}>
          <Hamburger isOpen={showNav} theme={theme} />
        </button>
      </div>
      <ul className={cx({
        "main-menu": true,
        "subnav-open": subNavOpen
      })}
      >
        {wordpress.menus &&
          wordpress.menus.nodes &&
          wordpress.menus.nodes.length &&
          wordpress.menus.nodes[0] &&
          wordpress.menus.nodes[0].menuItems &&
          wordpress.menus.nodes[0].menuItems.nodes.length &&
          wordpress.menus.nodes[0].menuItems.nodes.filter(filterMenuItems).map(menu => {
            return menu.childItems.nodes.length <= 1 ? (
              <li key={menu.id}>
                <Link to={convertLinkLocale(getUrlPath(menu.url), i18n.language)} onClick={((e) => handleNavClick(e, convertLinkLocale(getUrlPath(menu.url), i18n.language)))}>
                  {replaceAmpersand(menu.label)}
                </Link>
              </li>
            ) : (
                <ItemWithSubNav
                  key={menu.id}
                  menu={menu}
                  getUrlPath={getUrlPath}
                  setShowSubMenu={setShowSubMenu}
                  showSubMenu={showSubMenu}
                  closeMainNav={closeNav}
                />
              )
          })}
          <li>
            <div className="divider" />
          </li>
          <li className="passive-nav-item">
            <Link to={convertLinkLocale('/about', i18n.language)} onClick={((e) => handleNavClick(e, convertLinkLocale('/about', i18n.language)))}>
              {t('nav-about')}
            </Link>
          </li>
        {!isAuthenticated() && (
          <li className="passive-nav-item">
            <Link to={convertLinkLocale('/login', i18n.language)} onClick={((e) => handleNavClick(e, convertLinkLocale('/login', i18n.language)))}>
              {t('nav-login')}
            </Link>
          </li>
        )}
        {isAuthenticated() && (
          <li className="passive-nav-item">
            <Link to={convertLinkLocale('/account', i18n.language)} onClick={((e) => handleNavClick(e, convertLinkLocale('/account', i18n.language)))}>
              {t('nav-account')}
            </Link>
          </li>
        )}
        <li className="passive-nav-item">
          <a href="mailto:subscriptions@tasting-kitchen.com" target="_blank">{t('nav-subscribe')}</a>
        </li>
        <li className={cx({
          "with-menu": true,
          "mobile-language": true,
          "passive-nav-item": true,
        })}>
          <button className="open-menu" onClick={() => setShowLanguages(true)}>
            {t('nav-language')}
            <span className="arrow next"></span>
          </button>
          <ul
            className={cx({
              "sub-menu": true,
              show: showLanguages
            })}
          >
            <li className="go-back">
              <button onClick={() => setShowLanguages(false)}>
                <span className="arrow prev"></span>
                {t('nav-language')}
              </button>
            </li>
            <li className="language-li">
              <LanguageToggle />
            </li>
          </ul>
        </li>
        {isAuthenticated() && (
          <li onClick={logout}>
            {t('logout')}
          </li>
        )}
      </ul>
    </nav>
  ) : (
      <div>Error retreiving navigation info</div>
    )
}

export default MenusEn
