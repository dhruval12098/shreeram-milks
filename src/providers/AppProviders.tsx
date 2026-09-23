import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import '../lib/i18n';
import { ThemeProvider } from '../theme';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

export function AppProviders({ children }: PropsWithChildren) {
  return <KeyboardProvider><SafeAreaProvider><ThemeProvider><QueryClientProvider client={queryClient}>{children}</QueryClientProvider></ThemeProvider></SafeAreaProvider></KeyboardProvider>;
}
