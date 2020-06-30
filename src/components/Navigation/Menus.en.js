import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { useTranslation } from "react-i18next"
import { Link } from "gatsby"
import * as cx from "classnames"

import { ItemWithSubNav } from './Navigation';
import convertLinkLocale from 'src/utils/convertLinkLocale';

function MenusEn({ theme, showNav, path }) {
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
      <ul className="main-menu">
        {wordpress.menus &&
          wordpress.menus.nodes &&
          wordpress.menus.nodes.length &&
          wordpress.menus.nodes[0] && 
          wordpress.menus.nodes[0].menuItems &&
          wordpress.menus.nodes[0].menuItems.nodes.length &&
          wordpress.menus.nodes[0].menuItems.nodes.map(menu => {
            // specific check for articles while more posts get added
            return menu.childItems.nodes.length <= 1 &&
              menu.slug !== "articles" ? (
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
              />
            )
          })}
      </ul>
    </nav>
  ) : (
    <div>Error retreiving navigation info</div>
  )
}

export default MenusEn