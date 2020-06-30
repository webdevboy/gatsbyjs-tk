import React, { useState } from "react"
import { useStaticQuery } from "gatsby"
import { Link, graphql } from "gatsby"
import { ArrowDown } from "src/svgs"
import { useTranslation } from "react-i18next"
import { useNavigate, useLocation } from '@reach/router';
import cx from 'classnames';

import "./LanguageToggle.scss"

function LanguageToggle({ theme }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguage] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const { t, i18n } = useTranslation();

  const { wordpress } = useStaticQuery(
    graphql`
      query {
        wordpress {
          languages {
            code
            slug
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


  // const getPath = () => {
  //   const isBrowser = typeof window !== "undefined"

  //   if (!isBrowser) return

  //   const { pathname } = window.location

  //   switch (pathname.includes("/zh_cn/") || pathname.includes("/zh_tw/")) {
  //     case true:
  //       return pathname.split("/")[2]
  //     case false:
  //       return pathname.split("/")[1]
  //     default:
  //       return pathname
  //   }
  // }

  // const handleLanguageToggle = langCode => {
  //   const slugs = wordpress.posts.nodes.map(s => s.slug)
  //   const path = getPath()
  //   const code = getLangCode(langCode)

  //   return slugs.includes(path) ? `/${code}/${path}` : "/"
  // }

  const chnageLanguage = lang => {
    setDropdown(false);
    setLanguage(lang);
    i18n.changeLanguage(lang.slug);
  }


  if(wordpress && wordpress.languages && wordpress.languages.length <= 0) return null;
  return (
    <div className="language-container">
      <div onClick={() => {setDropdown(!dropdown)}} className="language__selected">
        {i18n.language && <span>{i18n.language.toUpperCase()}</span>}
        <ArrowDown style={{ width: '25px', height: '13px' }} />
      </div>
      {dropdown && (
        <ul className={cx('language__dropdown', theme)}>
          {wordpress.languages &&
            wordpress.languages.map((lang, index) => {
              // const path = handleLanguageToggle(lang.slug)

              return (
                <li key={index} onClick={() => {chnageLanguage(lang)}}>
                  {/* TODO: this needs to be styled */}
                  <span>
                    {lang.code}
                  </span>
                </li>
              )
            })}
        </ul>
      )}
    </div>
  )
}

export default LanguageToggle
