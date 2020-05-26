import React from "react"
import { IntlContextConsumer, changeLocale } from "gatsby-plugin-intl"
import browserLang from 'browser-lang';


// return the preferred language in browser: e.g. "ko-KR" or "ko".
const myLanguage = browserLang({
  languages: ['en', 'es'], 
  fallback: 'en',
});


const languageName = {
  en: "EN",
  es: "ES",
  zh: "ZH"
}

const myFunction = (lang) => {
  console.log("inside my function")
  changeLocale(lang)
}

const Language = () => {
  return (
    <div>
      <IntlContextConsumer>
        {({ languages, language: currentLocale }) =>
          languages.map(language => (
            <a
              key={language}
              onClick={() => changeLocale(language === 'en' ? '/' : language)}
              style={{
                color: currentLocale === language ? `red` : `black`,
                margin: 10,
                textDecoration: `underline`,
                cursor: `pointer`,
              }}
            >
              {languageName[language]}
            </a>
          ))
        }
      </IntlContextConsumer>
    </div>
  )
}

export default Language