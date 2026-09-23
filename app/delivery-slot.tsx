import { router } from 'expo-router';
import { useState } from 'react';
import { Animated, Pressable, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppIcon } from '../src/components/atoms/AppIcon';
import { Button } from '../src/components/atoms/Button';
import { ThemedText } from '../src/components/atoms/ThemedText';
import { DeliverySetupHeader } from '../src/components/molecules/DeliverySetupHeader';
import { useScrollResponsiveBottomAction } from '../src/components/organisms/ScrollResponsiveBottomAction';
import { CalendarIcon, LocationIcon } from '../src/icons/appIcons';
import { useTheme } from '../src/theme';

interface ProtocolSwitchProps { label: string; description: string; value: boolean; onChange: (value: boolean) => void; }

function ProtocolSwitch({ label, description, value, onChange }: ProtocolSwitchProps) {
  const theme = useTheme();
  return <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm, paddingTop: theme.spacing.sm, borderTopWidth: theme.borderWidths.hairline, borderColor: theme.colors.colorBorder }}>
    <View style={{ flex: 1, gap: 2 }}><ThemedText variant="bodySmall" weight="semibold">{label}</ThemedText><ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary }}>{description}</ThemedText></View>
    <Pressable accessibilityRole="switch" accessibilityState={{ checked: value }} accessibilityLabel={label} onPress={() => onChange(!value)} style={{ width: 48, height: 28, justifyContent: 'center', borderRadius: theme.radii.pill, padding: 3, backgroundColor: value ? theme.colors.colorPrimary : theme.colors.colorBorder }}>
      <View style={{ width: 22, height: 22, alignSelf: value ? 'flex-end' : 'flex-start', borderRadius: theme.radii.pill, backgroundColor: theme.colors.colorSurface }} />
    </Pressable>
  </View>;
}

export default function DeliverySlotScreen() {
  const theme = useTheme();
  const { bottomActionStyle, onScroll } = useScrollResponsiveBottomAction();
  const [slot, setSlot] = useState<'silent' | 'handover'>('silent');
  const [ringBell, setRingBell] = useState(false);
  const [insulatedPouch, setInsulatedPouch] = useState(true);
  const slotCard = (key: 'silent' | 'handover', title: string, time: string, recommended = false) => {
    const active = slot === key;
    return <Pressable key={key} accessibilityRole="radio" accessibilityState={{ selected: active }} onPress={() => setSlot(key)} style={[{ flex: 1, minHeight: 138, justifyContent: 'space-between', borderRadius: theme.radii.lg, padding: theme.spacing.md, backgroundColor: active ? theme.colors.colorPrimary : theme.colors.colorSurface, borderWidth: active ? 0 : theme.borderWidths.hairline, borderColor: theme.colors.colorBorder }, active ? theme.elevation.card : theme.elevation.none]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}><View style={{ width: 30, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: theme.radii.pill, backgroundColor: active ? 'rgba(255,255,255,0.16)' : theme.colors.colorSurfaceMuted }}><AppIcon icon={CalendarIcon} accessibilityLabel="" size="sm" tone={active ? 'onPrimary' : 'secondary'} /></View><View style={{ width: 20, height: 20, alignItems: 'center', justifyContent: 'center', borderRadius: theme.radii.pill, backgroundColor: active ? theme.colors.colorPrimaryTint : theme.colors.colorBorder }}><ThemedText variant="caption" weight="semibold" style={{ color: active ? theme.colors.colorPrimary : theme.colors.colorTextSecondary }}>{active ? '✓' : ''}</ThemedText></View></View>
      <View style={{ gap: theme.spacing.xs }}><ThemedText variant="bodySmall" weight="semibold" style={{ color: active ? theme.colors.colorTextInverse : theme.colors.colorTextPrimary }}>{title}</ThemedText>{recommended ? <ThemedText variant="caption" weight="semibold" style={{ color: active ? theme.colors.colorPrimaryTint : theme.colors.colorTextSecondary }}>RECOMMENDED</ThemedText> : null}<ThemedText variant="caption" style={{ color: active ? theme.colors.colorPrimaryTint : theme.colors.colorTextSecondary }}>{time}</ThemedText></View>
    </Pressable>;
  };

  return <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}><StatusBar barStyle="dark-content" /><View style={{ flex: 1, paddingHorizontal: theme.spacing.lg }}><DeliverySetupHeader step={2} />
    <Animated.ScrollView onScroll={onScroll} scrollEventThrottle={16} showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: theme.spacing.lg, paddingTop: theme.spacing.lg, paddingBottom: 132 }}>
      <View style={{ gap: theme.spacing.xs }}><ThemedText variant="h1">Choose your morning slot</ThemedText><ThemedText variant="bodySmall" style={{ color: theme.colors.colorTextSecondary }}>Our sunrise delivery partners drop fresh bottles before your household wakes.</ThemedText></View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm, borderRadius: theme.radii.lg, padding: theme.spacing.md, backgroundColor: theme.colors.colorSurfaceDisabled }}><View style={{ width: theme.sizes.avatarMd, height: theme.sizes.avatarMd, alignItems: 'center', justifyContent: 'center', borderRadius: theme.radii.pill, backgroundColor: theme.colors.colorSurface }}><AppIcon icon={LocationIcon} accessibilityLabel="Delivering to" size="sm" /></View><View style={{ flex: 1, gap: 2 }}><ThemedText variant="caption" weight="semibold" style={{ color: theme.colors.colorTextSecondary }}>DELIVERING TO</ThemedText><ThemedText variant="bodySmall" numberOfLines={1} weight="semibold">Villa 4B, Greenwood Meadows</ThemedText><ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary }}>Satara • 415001</ThemedText></View><Pressable accessibilityRole="button" accessibilityLabel="Edit address" onPress={() => router.back()} style={{ borderRadius: theme.radii.pill, paddingHorizontal: theme.spacing.sm, paddingVertical: theme.spacing.xs, backgroundColor: theme.colors.colorSurface }}><ThemedText variant="caption" weight="semibold" style={{ color: theme.colors.colorPrimary }}>Edit</ThemedText></Pressable></View>
      <View style={{ gap: theme.spacing.sm }}><ThemedText variant="caption" weight="semibold" style={{ color: theme.colors.colorTextSecondary }}>SELECT PREFERRED WINDOW</ThemedText><View style={{ flexDirection: 'row', gap: theme.spacing.sm }}>{slotCard('silent', 'Silent Morning', '5:00 AM – 7:00 AM', true)}{slotCard('handover', 'Morning Handover', '7:00 AM – 8:30 AM')}</View></View>
      <View style={{ gap: theme.spacing.sm, borderRadius: theme.radii.lg, padding: theme.spacing.md, backgroundColor: theme.colors.colorSurfaceDisabled }}><ThemedText variant="body" weight="semibold">☷  Doorstep Protocol</ThemedText><ProtocolSwitch label="Ring bell on arrival" description="Recommended OFF for silent sunrise drops" value={ringBell} onChange={setRingBell} /><ProtocolSwitch label="Insulated morning pouch" description="Leave in doorstep to sustain <4°C chill" value={insulatedPouch} onChange={setInsulatedPouch} /></View>
    </Animated.ScrollView>
    <Animated.View style={[{ position: 'absolute', right: theme.spacing.lg, bottom: theme.spacing.sm, left: theme.spacing.lg, gap: theme.spacing.sm, paddingTop: theme.spacing.sm, backgroundColor: theme.colors.colorBackground }, bottomActionStyle]}><Button onPress={() => router.replace('/home')}>Complete Setup  →</Button><Pressable accessibilityRole="button" onPress={() => router.replace('/home')}><ThemedText variant="bodySmall" style={{ color: theme.colors.colorTextSecondary, textAlign: 'center' }}>Skip for now, explore products</ThemedText></Pressable></Animated.View>
  </View></SafeAreaView>;
}
