import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Link } from "gatsby"
import * as cx from "classnames"

import "./Navigation.scss"

function ItemWithSubNav({ menu, getUrlPath }) {
  const [showSubMenu, setShowSubMenu] = useState(false)

  return (
    <li className="with-menu" key={menu.id}>
      <button className="open-menu" onClick={() => setShowSubMenu(true)}>
        {menu.name}
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
            {menu.name}
          </button>
        </li>
        {menu.menuItems.nodes.map(node => {
          return (
            <li key={node.id}>
              <Link to={getUrlPath(node.url)}>{node.label}</Link>
            </li>
          )
        })}
      </ul>
    </li>
  )
}

function Navigation({ theme, showNav }) {
  const { wordpress } = useStaticQuery(
    graphql`
      query {
        wordpress {
          generalSettings {
            url
          }
          menus {
            nodes {
              id
              name
              slug
              menuItems {
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
    `
  )

  const getUrlPath = url => {
    return url.replace(wordpress.generalSettings.url, "")
  }

  return wordpress ? (
    <nav
      className={cx({
        navigation: true,
        [theme]: true,
        "slide-in": showNav,
      })}
    >
      <ul className="main-menu">
        {wordpress.menus &&
          wordpress.menus.nodes &&
          wordpress.menus.nodes.length &&
          wordpress.menus.nodes.map(menu => {
            // specific check for articles while more posts get added
            return menu.menuItems.nodes.length <= 1 &&
              menu.slug !== "articles" ? (
              <li key={menu.id}>
                <Link to={getUrlPath(menu.menuItems.nodes[0].url)}>
                  {menu.name}
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

export default Navigation
