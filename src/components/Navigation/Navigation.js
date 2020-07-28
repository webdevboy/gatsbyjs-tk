import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import { useLocation } from '@reach/router';
import { Link } from "gatsby"
import * as cx from "classnames"

import convertLinkLocale from 'src/utils/convertLinkLocale';
import MenusZhTc from './Menus.zh_tc';
import MenusZhCn from './Menus.zh';
import MenusEn from './Menus.en';
import "./Navigation.scss"

export function ItemWithSubNav({ menu, getUrlPath, showSubMenu, setShowSubMenu }) {
  const [t, i18n] = useTranslation('article');

  return (
    <li className="with-menu" key={menu.id}>
      <button className="open-menu" onClick={() => setShowSubMenu(true)}>
        {menu.label}
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
            {menu.label}
          </button>
        </li>
        {menu.childItems.nodes.map(node => {
          if(node.connectedObject && node.connectedObject.language && node.connectedObject.language.slug && node.connectedObject.translation && node.connectedObject.translation.slug) {
            return (
              <li key={node.id}>
                <Link to={convertLinkLocale(`/${node.connectedObject.language.slug}/category/${node.connectedObject.translation.slug}`, i18n.language)}>{node.label}</Link>
              </li>
            )
          }
          else {
            return (
              <li key={node.id}>
                <Link to={convertLinkLocale(getUrlPath(node.url), i18n.language)}>{node.label}</Link>
              </li>
            )
          }
          
        })}
      </ul>
    </li>
  )
}

function Navigation({ theme, showNav, closeNav }) {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const path = convertLinkLocale(location.pathname,'');

  const getMenus = lang => {

    if(!lang) return null;
    switch(lang.toLowerCase()) {
      case 'zh': {
        return <MenusZhCn {...{ theme, showNav, path, closeNav }} />
      }
      case 'zh_tc': {
        return <MenusZhTc {...{ theme, showNav, path, closeNav }} />
      }
      default: {
        return <MenusEn {...{ theme, showNav, path, closeNav }} />
      }
    }
  }

  return getMenus(i18n.language);
}

export default Navigation
