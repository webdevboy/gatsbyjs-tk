import React, { useState, useEffect } from "react"
import { useStaticQuery } from "gatsby"
import { Link, graphql } from "gatsby"
import { ArrowDown } from "src/svgs"
import { useTranslation } from "react-i18next"
import { useNavigate, useLocation } from '@reach/router';
import cx from 'classnames';
import useWindow from 'src/hooks/useWindow';
import convertLinkLocale from 'src/utils/convertLinkLocale';

import "./LanguageToggle.scss"

function LanguageToggle({ theme, pageScroll }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [language, setLanguage] = useState(null);
  const [dropdown, setDropdown] = useState(false);
  const _window = useWindow();
  const { t, i18n } = useTranslation();

  const { wordpress } = useStaticQuery(
    graphql`
      query {
        wordpress {
          languages {
            code
            slug
            name
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

  const chnageLanguage = lang => {
    setDropdown(false);
    setLanguage(lang);
    i18n.changeLanguage(lang.slug);
    if(_window) {
      const { pathname } = _window.location;
      _window.location.pathname = convertLinkLocale(pathname, lang.slug);
    }
  }

  useEffect(() => {
    if(pageScroll && pageScroll.current) {
      pageScroll.current.addEventListener('scroll', () => {
        setDropdown(false);
      });
    }
  }, []);
  if(wordpress && wordpress.languages && wordpress.languages.length <= 0) return null;
  const activeLang = wordpress.languages.find(lang => lang.slug === i18n.language);
  return (
    <div className="language-container">
      <div className={cx('language__selected-wrapper', theme, { open: dropdown })}>
        <div onClick={() => {setDropdown(!dropdown)}} className="language__selected">
          {i18n.language && <span>{activeLang.slug === 'en' ? 'En' : activeLang.name}</span>}
          <ArrowDown style={{ width: '25px', height: '13px', marginTop: '3px' }} />
        </div>
        <ul className={cx('language__dropdown', theme, { open: dropdown })}>
          {wordpress.languages &&
            wordpress.languages.map((lang, index) => {

              return (
                <li key={index} onClick={() => {chnageLanguage(lang)}}>
                  <span className="language__dropdown__text">
                    {lang.name}
                  </span>
                </li>
              )
            })} 
          </ul>
      </div>
    </div>
  )
}

export default LanguageToggle
