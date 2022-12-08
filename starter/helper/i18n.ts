import { I18n } from 'i18n-js'
import { mergeDeepRight } from 'ramda'
export let currentLocale = ''

let i18n: I18n | undefined

export const setUpI18n = (translations: Object) => {
  i18n = new I18n(mergeDeepRight(translations, defaultTranslation()))
}

export const changeLocale = (locale: string) => {
  currentLocale = locale
  if (!!i18n) {
    i18n.locale = locale
  } 
}

export const t = (key: string) => {
  return i18n?.t(key) || key
}

const defaultTranslation = () => {
  const translation = require('./translationDefault.json')
  return {
    en: translation.en,
    zh: translation.zh,
    zh_CN: translation.zh_CN,
  }
}
