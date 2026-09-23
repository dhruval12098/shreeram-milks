import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
import gu from '../locales/gu.json';

const deviceLanguage = Localization.getLocales()[0]?.languageCode;

i18n.use(initReactI18next).init({
  compatibilityJSON: 'v4',
  resources: { en: { translation: en }, gu: { translation: gu } },
  lng: deviceLanguage === 'gu' ? 'gu' : 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
