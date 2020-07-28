import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import { Link } from "gatsby"
import * as cx from "classnames"

import { ItemWithSubNav } from './Navigation';
import { isAuthenticated, logout } from 'src/utils/auth';
import convertLinkLocale from 'src/utils/convertLinkLocale';
import Hamburger from 'src/components/common/Hamburger/Hamburger';

function MenusZhCn({ theme, showNav, path, closeNav, filterMenuItems }) {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [t, i18n] = useTranslation();
  const { wordpress } = useStaticQuery(graphql`
    query {
      wordpress {
        generalSettings {
          url
        }
        menus(where: {location: EXPANDED___ZH}) {
          nodes {
            id
            name
            slug
            menuItems {
              nodes {
                url
                id
                label
                childItems {
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
        "subnav-open": showSubMenu
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
                <Link to={convertLinkLocale(getUrlPath(menu.url), i18n.language)}>
                  {menu.label}
                </Link>
              </li>
            ) : (
                <ItemWithSubNav
                  key={menu.id}
                  menu={menu}
                  getUrlPath={getUrlPath}
                  setShowSubMenu={setShowSubMenu}
                  showSubMenu={showSubMenu}
                />
              )
          })}
        <li>
          <Link to={convertLinkLocale('/about', i18n.language)}>
            {t('nav-about')}
          </Link>
        </li>
        {!isAuthenticated() && (<li>
          <Link to={convertLinkLocale('/login', i18n.language)}>
            {t('nav-login')}
          </Link>
        </li>
        )}
        {isAuthenticated() && (
          <li>
            <Link to={convertLinkLocale('/account', i18n.language)}>
              {t('nav-account')}
            </Link>
          </li>
        )}
        <li>
          <Link to={convertLinkLocale('/login', i18n.language)}>
            {t('nav-subscribe')}
          </Link>
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

export default MenusZhCn
