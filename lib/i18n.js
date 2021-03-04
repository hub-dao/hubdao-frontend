import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import KO from '../public/locales/ko/common.json'
import EN from '../public/locales/en/common.json'
import ZH from '../public/locales/zh/common.json'

const resources = {
  ko: {
    translation: KO
  },
  en: {
    translation: EN
  },
  zh: {
    translation: ZH
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: ['en', 'ko', 'zh'],
    debug: true,
    interpolation: {
      escapeValue: false
    },
    load: 'languageOnly'
  })

  export default i18n