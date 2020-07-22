import React, { useState, useEffect } from "react"
import { useStaticQuery } from "gatsby"
import { Link, graphql } from "gatsby"
import { ArrowDown } from "src/svgs"
import { useTranslation } from "react-i18next"
import { useNavigate, useLocation } from '@reach/router';
import cx from 'classnames';

import "./LanguageToggle.scss"

function LanguageToggle({ theme, pageScroll }) {
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
    console.log(lang);
    i18n.changeLanguage(lang.slug);
  }

  useEffect(() => {
    if(pageScroll && pageScroll.current) {
      pageScroll.current.addEventListener('scroll', () => {
        setDropdown(false);
      });
    }
  }, []);
  if(wordpress && wordpress.languages && wordpress.languages.length <= 0) return null;
  return (
    <div className="language-container">
      <div className={cx('language__selected-wrapper', theme, { open: dropdown })}>
        <div onClick={() => {setDropdown(!dropdown)}} className="language__selected">
          <div className={cx('language__selected__border', {
            'border-transparent': i18n.language === 'en',
            'border-orange': i18n.language === 'zh_tc'
            })}>
            {i18n.language && <span>{i18n.language}</span>}
            <ArrowDown style={{ width: '25px', height: '13px', marginTop: '3px' }} />
          </div>
        </div>
        <ul className={cx('language__dropdown', theme, { open: dropdown })}>
          {wordpress.languages &&
            wordpress.languages.map((lang, index) => {

              return (
                <li key={index} onClick={() => {chnageLanguage(lang)}} className={cx({ 'en-lang': lang.slug === 'en' })}>
                  {console.log(lang)}
                  <div className={cx('language__dropdown__text', { 'border-red': lang.slug === 'zh', 'border-orange': lang.slug === 'zh_tc' })}>
                    {lang.name}
                  </div>
                </li>
              )
            })} 
          </ul>
      </div>
    </div>
  )
}

export default LanguageToggle
