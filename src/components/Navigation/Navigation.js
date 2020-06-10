import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import * as cx from "classnames"

import "./Navigation.scss"

function SecondaryItemWithSubNav({ menu, getUrlPath }) {
    const [showSubMenu, setShowSubMenu] = useState(false)

    const handleClick = event => {
        event.preventDefault()
        setShowSubMenu(true)
    }

    const goBack = event => {
        event.preventDefault()
        setShowSubMenu(false)
    }
    return (
        <li className="with-menu" key={menu.id}>
            <button onClick={handleClick}>{menu.label}</button>
            <ul
                className={cx({
                    "sub-menu": true,
                    show: showSubMenu,
                })}
            >
                <li className="go-back">
                    <button onClick={goBack}>
                        <span className="arrow prev"></span>
                        {menu.label}
                    </button>
                </li>
                {menu.childItems.nodes.map(node => {
                    console.log(node);
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

function ItemWithSubNav({ menu, getUrlPath }) {
  const [showSubMenu, setShowSubMenu] = useState(false)

  const handleClick = event => {
    event.preventDefault()
    setShowSubMenu(true)
  }

  const goBack = event => {
    event.preventDefault()
    setShowSubMenu(false)
  }
  return (
    <li className="with-menu" key={menu.id}>
      <button onClick={handleClick}>{menu.name}</button>
      <ul
        className={cx({
          "sub-menu": true,
          show: showSubMenu,
        })}
      >
        <li className="go-back">
          <button onClick={goBack}>
            <span className="arrow prev"></span>
            {menu.name}
          </button>
        </li>
              {menu.menuItems.nodes.map(node => {
                  console.log(node);
                if (node.childItems && node.childItems.nodes && node.childItems.nodes.length > 0) {
                    return (
                        <SecondaryItemWithSubNav menu={node} getUrlPath={getUrlPath} />
                    )
                }
                else {
                    return (
                        <li key={node.id}>
                            <Link to={getUrlPath(node.url)}>{node.label}</Link>
                        </li>
                    )
                }
              
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
          categories {
            edges {
                node {
                    id,
                    slug
                    name
                }
            }
          }
        }
      }
    `
  )
    console.log(wordpress);
  const getUrlPath = url => {
    return url.replace(wordpress.generalSettings.url, "")
  }

  return wordpress ? (
    // <nav className={`navigation ${theme}`}>
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
