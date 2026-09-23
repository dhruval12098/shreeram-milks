import { create } from 'zustand';

import i18n from '../lib/i18n';
import type { AppLanguage } from '../types/models';

interface AppState {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
}

export const useAppStore = create<AppState>((set) => ({
  language: i18n.language === 'gu' ? 'gu' : 'en',
  setLanguage: (language) => {
    void i18n.changeLanguage(language);
    set({ language });
  },
}));
