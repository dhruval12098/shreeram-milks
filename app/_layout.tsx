import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { AppProviders } from '../src/providers/AppProviders';
import { useAppFonts } from '../src/theme';

void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useAppFonts();

  useEffect(() => {
    if (fontsLoaded || fontError) void SplashScreen.hideAsync();
  }, [fontError, fontsLoaded]);

  if (!fontsLoaded && !fontError) return null;
  if (fontError) throw fontError;

  return <AppProviders><Stack screenOptions={{ headerShown: false }} /></AppProviders>;
}
