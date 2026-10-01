import { router } from 'expo-router';
import { Image } from 'expo-image';
import { useTranslation } from 'react-i18next';
import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../src/components/atoms/Button';
import { ThemedText } from '../src/components/atoms/ThemedText';
import { useTheme } from '../src/theme';

export default function OnboardingScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  return <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}>
    <StatusBar barStyle="dark-content" />
    <View style={{ flex: 1, paddingHorizontal: theme.spacing.lg }}>
      <View style={{ minHeight: theme.sizes.buttonHeight + theme.spacing.md, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}><Image source={require('../assets/icon.png')} contentFit="contain" accessibilityLabel={t('onboarding.logo')} style={{ width: theme.sizes.avatarSm, height: theme.sizes.avatarSm }} /><ThemedText variant="bodySmall" weight="semibold">{t('common.appName')}</ThemedText></View>
        <Button variant="secondary" style={{ minHeight: theme.layout.touchTargetMin, paddingHorizontal: theme.spacing.md }} onPress={() => router.replace('/home')}>{t('onboarding.skip')}</Button>
      </View>
      <Image source={require('../assets/onboarding-milk-hero.png')} contentFit="cover" accessibilityLabel={t('onboarding.heroLabel')} style={{ height: 264, marginTop: theme.spacing.sm, borderRadius: theme.radii.lg, backgroundColor: theme.colors.colorPrimaryTint }} />
      <View style={{ flex: 1, paddingTop: theme.spacing.lg, gap: theme.spacing.md }}>
        <ThemedText variant="h1" weight="extrabold">{t('onboarding.title')}</ThemedText>
        <ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary }}>{t('onboarding.description')}</ThemedText>
      </View>
      <View style={{ gap: theme.spacing.md, paddingBottom: theme.spacing.md }}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: theme.spacing.xs }}><View style={{ width: theme.spacing.lg, height: theme.spacing.xs, borderRadius: theme.radii.pill, backgroundColor: theme.colors.colorPrimary }} /><View style={{ width: theme.spacing.xs, height: theme.spacing.xs, borderRadius: theme.radii.pill, backgroundColor: theme.colors.colorBorder }} /><View style={{ width: theme.spacing.xs, height: theme.spacing.xs, borderRadius: theme.radii.pill, backgroundColor: theme.colors.colorBorder }} /></View>
        <Button onPress={() => router.push('/sign-in')}>{t('onboarding.getStarted')}</Button>
        <ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary, textAlign: 'center' }}>{t('onboarding.member')}</ThemedText>
      </View>
    </View>
  </SafeAreaView>;
}
