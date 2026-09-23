import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, StatusBar, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../src/components/atoms/Button';
import { ThemedText } from '../src/components/atoms/ThemedText';
import { KeyboardAwareBottomDrawer } from '../src/components/organisms/KeyboardAwareBottomDrawer';
import { useTheme } from '../src/theme';

export default function VerifyScreen() {
  const theme = useTheme();
  const inputRef = useRef<TextInput>(null);
  const [otp, setOtp] = useState('');
  const canContinue = /^\d{4}$/.test(otp);
  return <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}>
    <StatusBar barStyle="dark-content" />
    <View style={{ flex: 1, padding: theme.spacing.lg }}>
      <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={() => router.back()} hitSlop={theme.spacing.sm}><ThemedText variant="h2">‹</ThemedText></Pressable>
      <View style={{ flex: 1, paddingTop: theme.spacing.xl, gap: theme.spacing.xl }}>
        <View style={{ gap: theme.spacing.sm }}><ThemedText variant="h1">Verify mobile number</ThemedText><ThemedText variant="body" style={{ color: theme.colors.colorTextSecondary }}>Enter the 4-digit code sent to your mobile number.</ThemedText></View>
        <View style={{ gap: theme.spacing.sm }}><ThemedText variant="bodySmall">Verification code</ThemedText><Pressable accessibilityRole="button" accessibilityLabel="Enter four digit verification code" onPress={() => inputRef.current?.focus()}><View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>{[0, 1, 2, 3].map((index) => { const digit = otp[index]; const selected = index === otp.length && otp.length < 4; return <View key={index} style={{ flex: 1, height: 64, alignItems: 'center', justifyContent: 'center', borderRadius: theme.radii.lg, borderWidth: selected ? theme.borderWidths.medium : theme.borderWidths.hairline, borderColor: selected ? theme.colors.colorPrimary : theme.colors.colorBorder, backgroundColor: theme.colors.colorSurface, shadowColor: selected ? theme.colors.colorPrimary : theme.colors.colorTransparent, shadowOpacity: selected ? 0.12 : 0, shadowRadius: selected ? 4 : 0, shadowOffset: { width: 0, height: 1 }, elevation: selected ? 1 : 0 }}>{digit ? <ThemedText variant="h2" style={{ color: theme.colors.colorTextPrimary }}>{digit}</ThemedText> : <ThemedText variant="h2" style={{ color: theme.colors.colorTextSecondary }}>•</ThemedText>}</View>; })}</View></Pressable><TextInput ref={inputRef} accessibilityLabel="Verification code input" autoFocus keyboardType="number-pad" maxLength={4} onChangeText={(value) => setOtp(value.replace(/\D/g, ''))} style={{ position: 'absolute', width: 1, height: 1, opacity: 0 }} value={otp} /></View>
        <KeyboardAwareBottomDrawer style={{ marginTop: 'auto', gap: theme.spacing.md }}><Button disabled={!canContinue} onPress={() => router.replace('/location')}>Verify & Continue</Button><ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary, textAlign: 'center' }}>Demo: enter any four digits to continue.</ThemedText></KeyboardAwareBottomDrawer>
      </View>
    </View>
  </SafeAreaView>;
}
