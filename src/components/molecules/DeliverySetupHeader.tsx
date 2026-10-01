import { router } from 'expo-router';
import { Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { AppIcon } from '../atoms/AppIcon';
import { ThemedText } from '../atoms/ThemedText';
import { BackIcon } from '../../icons/appIcons';
import { useTheme } from '../../theme';

interface DeliverySetupHeaderProps {
  step: 1 | 2;
  title: string;
  skipLabel: string;
}

export function DeliverySetupHeader({ step, title, skipLabel }: DeliverySetupHeaderProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  return <View style={{ gap: theme.spacing.sm }}><View style={{ minHeight: theme.sizes.buttonHeight, flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs }}><Pressable accessibilityRole="button" accessibilityLabel={t("deliverySetup.back")} onPress={() => router.back()} hitSlop={theme.spacing.sm} style={{ width: theme.layout.touchTargetMin, height: theme.layout.touchTargetMin, alignItems: 'center', justifyContent: 'center' }}><AppIcon icon={BackIcon} accessibilityLabel="" size="md" /></Pressable><ThemedText variant="body" weight="semibold" numberOfLines={1} style={{ flex: 1 }}>{title}</ThemedText><Pressable accessibilityRole="button" onPress={() => router.replace('/home')} hitSlop={theme.spacing.sm} style={{ minWidth: theme.layout.touchTargetMin, minHeight: theme.layout.touchTargetMin, alignItems: 'center', justifyContent: 'center' }}><ThemedText variant="bodySmall" weight="semibold" style={{ color: theme.colors.colorPrimary }}>{skipLabel}</ThemedText></Pressable></View><View style={{ gap: theme.spacing.xs }}><ThemedText variant="caption" weight="bold" style={{ textAlign: 'center', color: theme.colors.colorTextSecondary }}>{t("deliverySetup.step", { step })}</ThemedText><View style={{ flexDirection: 'row', gap: 2, marginHorizontal: -theme.spacing.lg }}><View style={{ flex: 1, height: 3, borderRadius: theme.radii.pill, backgroundColor: theme.colors.colorPrimary }} /><View style={{ flex: 1, height: 3, borderRadius: theme.radii.pill, backgroundColor: step === 2 ? theme.colors.colorPrimary : theme.colors.colorBorder }} /></View></View></View>;
}
