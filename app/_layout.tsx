import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppProviders } from '../src/providers/AppProviders';
import { useAppFonts } from '../src/theme';
import { useAppStore } from '../src/store/useAppStore';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useAppFonts();
  const [languageLoaded, setLanguageLoaded] = useState(false);

  useEffect(() => {
    void AsyncStorage.getItem('appLanguage').then((language) => {
      if (language === 'en' || language === 'gu') useAppStore.getState().setLanguage(language);
    }).catch(() => undefined).finally(() => setLanguageLoaded(true));
  }, []);

  useEffect(() => {
    if ((fontsLoaded || fontError) && languageLoaded) void SplashScreen.hideAsync();
  }, [fontError, fontsLoaded, languageLoaded]);

  if ((!fontsLoaded && !fontError) || !languageLoaded) return null;
  if (fontError) throw fontError;

  return <AppProviders><Stack screenOptions={{ headerShown: false, animation: 'none' }} /></AppProviders>;
}
