import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

import { AppIcon } from '../atoms/AppIcon';
import { ThemedText } from '../atoms/ThemedText';
import { BackIcon } from '../../icons/appIcons';
import { useTheme } from '../../theme';

interface DeliverySetupHeaderProps {
  step: 1 | 2;
}

export function DeliverySetupHeader({ step }: DeliverySetupHeaderProps) {
  const theme = useTheme();
  return <View style={{ gap: theme.spacing.md }}><View style={{ height: theme.sizes.buttonHeight, alignItems: 'center', justifyContent: 'center' }}><Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={() => router.back()} hitSlop={theme.spacing.sm} style={{ position: 'absolute', left: 0, width: theme.layout.touchTargetMin, height: theme.layout.touchTargetMin, alignItems: 'center', justifyContent: 'center' }}><AppIcon icon={BackIcon} accessibilityLabel="" size="md" /></Pressable><ThemedText variant="caption" weight="semibold" style={{ color: theme.colors.colorTextSecondary }}>DELIVERY SETUP</ThemedText></View><View style={{ gap: theme.spacing.sm }}><ThemedText variant="caption" style={{ textAlign: 'center', color: theme.colors.colorTextSecondary }}>{`STEP ${step} OF 2`}</ThemedText><View style={{ flexDirection: 'row', gap: theme.spacing.sm }}><View style={{ flex: 1, height: theme.borderWidths.medium, borderRadius: theme.radii.pill, backgroundColor: theme.colors.colorPrimary }} /><View style={{ flex: 1, height: theme.borderWidths.medium, borderRadius: theme.radii.pill, backgroundColor: step === 2 ? theme.colors.colorPrimary : theme.colors.colorBorder }} /></View></View></View>;
}
