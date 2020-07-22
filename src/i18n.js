import i18n from "i18next"
import Backend from "i18next-xhr-backend"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import supportedLngs from './locales/supportedLngs.json';
import * as en from './locales/en';
import * as zh from './locales/zh';
import * as zh_tc from './locales/zh_tc';


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
      zh: zh.default,
      zh_tc: zh_tc.default,
    }
  })

export default i18n