import { router } from 'expo-router';
import { useState } from 'react';
import { Animated, Pressable, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppIcon } from '../src/components/atoms/AppIcon';
import { AppInput } from '../src/components/atoms/AppInput';
import { Button } from '../src/components/atoms/Button';
import { ThemedText } from '../src/components/atoms/ThemedText';
import { DeliverySetupHeader } from '../src/components/molecules/DeliverySetupHeader';
import { KeyboardAwareBottomDrawer } from '../src/components/organisms/KeyboardAwareBottomDrawer';
import { useScrollResponsiveBottomAction } from '../src/components/organisms/ScrollResponsiveBottomAction';
import { useServiceAreas } from '../src/hooks/useServiceAreas';
import { LocationIcon } from '../src/icons/appIcons';
import { useTheme } from '../src/theme';

function DummyMapBackground() {
  const theme = useTheme();
  return <View style={[StyleSheet.absoluteFill, { overflow: 'hidden' }]} pointerEvents="none">
    <View style={{ position: 'absolute', top: 20, left: -10, width: 220, height: 2, backgroundColor: theme.colors.colorBorder, transform: [{ rotate: '18deg' }] }} />
    <View style={{ position: 'absolute', top: 70, left: -20, width: 260, height: 2, backgroundColor: theme.colors.colorBorder, transform: [{ rotate: '-8deg' }] }} />
    <View style={{ position: 'absolute', top: 10, left: 40, width: 2, height: 120, backgroundColor: theme.colors.colorBorder, transform: [{ rotate: '10deg' }] }} />
    <View style={{ position: 'absolute', top: 24, left: 90, width: 28, height: 20, borderRadius: theme.radii.sm, backgroundColor: theme.colors.colorSurfaceMuted }} />
    <View style={{ position: 'absolute', bottom: 30, right: 60, width: 36, height: 24, borderRadius: theme.radii.sm, backgroundColor: theme.colors.colorSurfaceMuted }} />
  </View>;
}

export default function LocationScreen() {
  const theme = useTheme();
  const { bottomActionStyle, onScroll } = useScrollResponsiveBottomAction();
  const { data: serviceAreas = [] } = useServiceAreas();
  const [address, setAddress] = useState('Villa 4B');
  const [landmark, setLandmark] = useState('Greenwood Meadows Phase 1');
  const [addressType, setAddressType] = useState('Home');
  const area = serviceAreas[0]?.locality ?? 'Greenwood Meadows, Satellite';

  return <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}><StatusBar barStyle="dark-content" /><View style={{ flex: 1, paddingHorizontal: theme.spacing.lg }}><DeliverySetupHeader step={1} /><Animated.ScrollView keyboardShouldPersistTaps="handled" onScroll={onScroll} scrollEventThrottle={16} style={{ flex: 1 }} contentContainerStyle={{ gap: theme.spacing.lg, paddingTop: theme.spacing.lg, paddingBottom: 132 }} showsVerticalScrollIndicator={false}>
    <View style={{ gap: theme.spacing.xs }}><ThemedText variant="h1">Where should we deliver?</ThemedText><ThemedText variant="bodySmall" style={{ color: theme.colors.colorTextSecondary }}>Select your delivery location to check early morning service.</ThemedText></View>
    <View style={{ overflow: 'hidden', borderRadius: theme.radii.lg, backgroundColor: theme.colors.colorSurface }}><View style={{ height: 128, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.colorSurfaceDisabled }}><DummyMapBackground /><View style={{ width: 48, height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: theme.radii.pill, backgroundColor: theme.colors.colorPrimary, borderWidth: theme.borderWidths.medium, borderColor: theme.colors.colorSurface }}><AppIcon icon={LocationIcon} accessibilityLabel="Pinned location" size="md" tone="onPrimary" /></View><View style={{ position: 'absolute', bottom: theme.spacing.sm, left: theme.spacing.sm, borderRadius: theme.radii.pill, paddingHorizontal: theme.spacing.sm, paddingVertical: theme.spacing.xs, backgroundColor: theme.colors.colorSurface }}><ThemedText variant="caption" weight="semibold">● EARLY DROP AVAILABLE (BY 7:00 AM)</ThemedText></View></View><View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm, padding: theme.spacing.md }}><View style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center', borderRadius: theme.radii.pill, backgroundColor: theme.colors.colorPrimaryTint }}><AppIcon icon={LocationIcon} accessibilityLabel="Pinned area" size="sm" /></View><View style={{ flex: 1, gap: theme.spacing.xs }}><ThemedText variant="caption" weight="semibold" style={{ color: theme.colors.colorTextSecondary }}>PINNED AREA</ThemedText><ThemedText variant="bodySmall" numberOfLines={1}>{area}</ThemedText><ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary }}>Near Podar School, Maharashtra</ThemedText></View><Pressable accessibilityRole="button" accessibilityLabel="Change delivery area" style={{ borderRadius: theme.radii.pill, paddingHorizontal: theme.spacing.sm, paddingVertical: theme.spacing.xs, backgroundColor: theme.colors.colorSurfaceMuted }}><ThemedText variant="caption" weight="semibold">⌾ Change</ThemedText></Pressable></View></View>
    <View style={{ gap: theme.spacing.xs }}><View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><ThemedText variant="bodySmall" weight="semibold">House / Flat / Villa / Block number</ThemedText><ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary }}>Required</ThemedText></View><AppInput accessibilityLabel="House or villa number" onChangeText={setAddress} value={address} /></View>
    <View style={{ gap: theme.spacing.xs }}><View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><ThemedText variant="bodySmall" weight="semibold">Street, Society or Landmark</ThemedText><ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary }}>Required</ThemedText></View><AppInput accessibilityLabel="Street, society or landmark" onChangeText={setLandmark} value={landmark} /></View>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm }}><ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary }}>Save address as:</ThemedText>{['Home', 'Work', 'Other'].map((item) => <Pressable key={item} accessibilityRole="radio" accessibilityState={{ selected: addressType === item }} onPress={() => setAddressType(item)} style={{ borderRadius: theme.radii.pill, paddingHorizontal: theme.spacing.sm, paddingVertical: theme.spacing.xs, backgroundColor: addressType === item ? theme.colors.colorPrimary : theme.colors.colorSurfaceMuted }}><ThemedText variant="caption" weight="semibold" style={{ color: addressType === item ? theme.colors.colorTextInverse : theme.colors.colorTextPrimary }}>{item}</ThemedText></Pressable>)}</View>
  </Animated.ScrollView><Animated.View style={[{ position: 'absolute', right: theme.spacing.lg, bottom: theme.spacing.sm, left: theme.spacing.lg, paddingTop: theme.spacing.sm, backgroundColor: theme.colors.colorBackground }, bottomActionStyle]}><KeyboardAwareBottomDrawer style={{ gap: theme.spacing.sm, paddingBottom: theme.spacing.sm }}><Button onPress={() => router.push('/delivery-slot')}>Continue to Delivery Slot  →</Button><Pressable accessibilityRole="button" onPress={() => router.replace('/home')}><ThemedText variant="bodySmall" style={{ color: theme.colors.colorTextSecondary, textAlign: 'center' }}>Skip for now, explore products</ThemedText></Pressable></KeyboardAwareBottomDrawer></Animated.View></View></SafeAreaView>;
}
