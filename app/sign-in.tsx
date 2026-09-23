import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppInput } from '../src/components/atoms/AppInput';
import { Button } from '../src/components/atoms/Button';
import { ThemedText } from '../src/components/atoms/ThemedText';
import { KeyboardAwareBottomDrawer } from '../src/components/organisms/KeyboardAwareBottomDrawer';
import { useTheme } from '../src/theme';

export default function SignInScreen() {
  const theme = useTheme();
  const [phone, setPhone] = useState('');
  const canContinue = /^\d{10}$/.test(phone);
  return <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}>
    <StatusBar barStyle="dark-content" />
    <View style={{ flex: 1, padding: theme.spacing.lg }}>
      <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={() => router.back()} hitSlop={theme.spacing.sm}><ThemedText variant="h2">‹</ThemedText></Pressable>
      <View style={{ flex: 1, paddingTop: theme.spacing.xl, gap: theme.spacing.xl }}>
        <View style={{ gap: theme.spacing.sm }}><ThemedText variant="caption" style={{ color: theme.colors.colorPrimary }}>SHREERAM MILKS • VEDIC FARMS</ThemedText><ThemedText variant="h1">Welcome to ShreeRam Milks</ThemedText><ThemedText variant="body" style={{ color: theme.colors.colorTextSecondary }}>Enter your phone number to get pure, farm-fresh A2 dairy delivered before dawn.</ThemedText></View>
        <View style={{ gap: theme.spacing.sm }}><ThemedText variant="bodySmall">Mobile Number</ThemedText><View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: theme.borderWidths.hairline, borderColor: theme.colors.colorBorder, borderRadius: theme.radii.md, backgroundColor: theme.colors.colorSurface }}><ThemedText style={{ paddingLeft: theme.spacing.md, paddingRight: theme.spacing.sm }}>🇮🇳 +91</ThemedText><AppInput accessibilityLabel="Mobile number" keyboardType="phone-pad" maxLength={10} onChangeText={(value) => setPhone(value.replace(/\D/g, ''))} placeholder="Enter 10-digit number" style={{ flex: 1, borderWidth: 0 }} value={phone} /></View></View>
        <KeyboardAwareBottomDrawer style={{ marginTop: 'auto', gap: theme.spacing.md }}><Button disabled={!canContinue} onPress={() => router.push('/verify')}>Continue with OTP</Button><ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary, textAlign: 'center' }}>100% Raw A2 • Delivered by 7 AM</ThemedText></KeyboardAwareBottomDrawer>
      </View>
    </View>
  </SafeAreaView>;
}
