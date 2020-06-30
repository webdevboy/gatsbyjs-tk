import i18n from "i18next"
import Backend from "i18next-xhr-backend"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import supportedLngs from './locales/supportedLngs.json';
import * as en from './locales/en';
import * as zh_cn from './locales/zh_cn';
import * as zh_tw from './locales/zh_tw';


i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    
    // have a common namespace used around the full app
    ns: ["common"],
    defaultNS: "common",
    debug: true,
    supportedLngs,
    react: {
      wait: true,
      useSuspense: false,
    },
    resources: {
      en: en.default,
      zh_cn: zh_cn.default,
      zh_tw: zh_tw.default,
    }
  })

export default i18n