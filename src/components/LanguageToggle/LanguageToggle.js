import React from "react"
import { useStaticQuery } from "gatsby"
import { Link, graphql } from "gatsby"

const LanguageToggle = ({ theme }) => {
  const { wordpress } = useStaticQuery(
    graphql`
      query {
        wordpress {
          languages {
            code
          }
          posts {
            nodes {
              slug
            }
          }
        }
      }
    `
  )

  const getLangCode = code => {
    switch (code) {
      case "EN":
        return ""
      case "ZH":
        return "zh"
      case "ES":
        return "es"
      default:
        return ""
    }
  }

  const getPath = () => {
    const isBrowser = typeof window !== "undefined"

    if (!isBrowser) return

    const { pathname } = window.location

    switch (pathname.includes("/es/") || pathname.includes("/zh/")) {
      case true:
        return pathname.split("/")[2]
      case false:
        return pathname.split("/")[1]
      default:
        return pathname
    }
  }

  const handleLanguageToggle = langCode => {
    const slugs = wordpress.posts.nodes.map(s => s.slug)
    const path = getPath()
    const code = getLangCode(langCode)

    return slugs.includes(path) ? `/${code}/${path}` : "/"
  }

  return (
    <ul>
      {wordpress.languages &&
        wordpress.languages.map((lang, index) => {
          const path = handleLanguageToggle(lang.code)

          return (
            <li key={index}>
              <Link to={path}>
                {/* TODO: this needs to be styled */}
                <span style={{ color: theme === "dark" ? "white" : "black" }}>
                  {lang.code}
                </span>
              </Link>
            </li>
          )
        })}
    </ul>
  )
}

export default LanguageToggle
