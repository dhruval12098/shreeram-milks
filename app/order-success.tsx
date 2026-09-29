import { router } from 'expo-router';
import { StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../src/components/atoms/Button';
import { ThemedText } from '../src/components/atoms/ThemedText';
import { useAppStore } from '../src/store/useAppStore';
import { useTheme } from '../src/theme';

export default function OrderSuccessScreen() { const theme = useTheme(); const clearCart = useAppStore((state) => state.clearCart); return <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}><StatusBar barStyle="dark-content" /><View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: theme.spacing.lg, gap: theme.spacing.md }}><View style={{ width: 72, height: 72, borderRadius: theme.radii.pill, alignItems: 'center', justifyContent: 'center', backgroundColor: theme.colors.colorPrimary }}><ThemedText variant="h1" style={{ color: theme.colors.colorTextInverse }}>✓</ThemedText></View><ThemedText variant="h1" style={{ textAlign: 'center' }}>Order confirmed!</ThemedText><ThemedText variant="body" style={{ color: theme.colors.colorTextSecondary, textAlign: 'center' }}>Your fresh order is scheduled for tomorrow between 5:00 AM and 7:00 AM.</ThemedText><View style={{ width: '100%', padding: theme.spacing.md, borderRadius: theme.radii.lg, backgroundColor: theme.colors.colorSurface }}><ThemedText variant="bodySmall" weight="semibold">Order #SRM-1024</ThemedText><ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary }}>We’ll leave it at Villa 4B, Greenwood Meadows.</ThemedText></View><Button onPress={() => { clearCart(); router.replace('/home'); }}>Back to home</Button></View></SafeAreaView>; }
