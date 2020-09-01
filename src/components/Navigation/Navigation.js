import React from "react"
import { useTranslation } from "react-i18next"
import { useLocation } from '@reach/router';
import { Link, useStaticQuery } from "gatsby"
import * as cx from "classnames"
import useWindow from 'src/hooks/useWindow';

import convertLinkLocale from 'src/utils/convertLinkLocale';
import getIsPageAvailable from 'src/utils/getIsPageAvailable';
import replaceAmpersand from 'src/utils/replaceAmpersand';
import MenusZhTc from './Menus.zh_tc';
import MenusZh from './Menus.zh';
import MenusEn from './Menus.en';
import "./Navigation.scss"

export function ItemWithSubNav({ menu, getUrlPath, showSubMenu, setShowSubMenu, closeMainNav }) {
  const [t, i18n] = useTranslation('article');
  const _window = useWindow() || {};

  const handleNavClick = (e, url) => {
    e.preventDefault();
    closeMainNav();
    _window.setTimeout(() => {
       _window.location.href = url.replace(/\/$/, '');
    }, 300)
  }

  return (
    <li className="with-menu" key={menu.id}>
      <button className="open-menu" onClick={() => setShowSubMenu(true)}>
        {replaceAmpersand(menu.label)}
        <span className="arrow next"></span>
      </button>
      <ul
        className={cx({
          "sub-menu": true,
          show: showSubMenu,
        })}
      >
        <li className="go-back">
          <button onClick={() => setShowSubMenu(false)}>
            <span className="arrow prev"></span>
            {replaceAmpersand(menu.label)}
          </button>
        </li>
        {menu.childItems.nodes.map(node => {
          return (
            <li key={node.id}>
              <Link to='#' onClick={((e) => handleNavClick(e, convertLinkLocale(getUrlPath(node.url), i18n.language)))}>{replaceAmpersand(node.label)}</Link>
            </li>
          )
        })}
      </ul>
    </li>
  )
}

function Navigation({ theme, showNav, closeNav }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const path = convertLinkLocale(location.pathname,'');
  const { wordpress, allSitePage } = useStaticQuery(graphql`
    query {
      allSitePage {
        nodes {
          path
          id
        }
      }
      wordpress {
        generalSettings {
          url
        }
      }
    }
  `);

  const getUrlPath = url => {
    return url.replace(wordpress.generalSettings.url, "");
  }

  const filterMenuItems = (menuItem) => {
    if(allSitePage && allSitePage.nodes) {
      return getIsPageAvailable(allSitePage.nodes, convertLinkLocale(getUrlPath(menuItem.url), i18n.language));
    }
    return false;
  }

  const getMenus = lang => {
    if(!lang) return null;
    switch(lang.toLowerCase()) {
      case 'zh': {
        return <MenusZh {...{ theme, showNav, path, closeNav, filterMenuItems }} />
      }
      case 'zh_tc': {
        return <MenusZhTc {...{ theme, showNav, path, closeNav, filterMenuItems }} />
      }
      default: {
        return <MenusEn {...{ theme, showNav, path, closeNav, filterMenuItems }} />
      }
    }
  }

  return getMenus(i18n.language);
}

export default Navigation
