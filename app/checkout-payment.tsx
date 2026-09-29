import { router } from 'expo-router';
import { Pressable, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../src/components/atoms/Button';
import { ThemedText } from '../src/components/atoms/ThemedText';
import { useAppStore } from '../src/store/useAppStore';
import { useTheme } from '../src/theme';

export default function CheckoutPaymentScreen() {
  const theme = useTheme(); const cart = useAppStore((state) => state.cart); const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}><StatusBar barStyle="dark-content" /><View style={{ flex: 1, padding: theme.spacing.lg, gap: theme.spacing.lg }}><Pressable onPress={() => router.back()}><ThemedText variant="h2">‹</ThemedText></Pressable><View style={{ gap: theme.spacing.xs }}><ThemedText variant="caption" weight="semibold" style={{ color: theme.colors.colorPrimary }}>STEP 3 OF 3</ThemedText><ThemedText variant="h1">Payment</ThemedText><ThemedText variant="bodySmall" style={{ color: theme.colors.colorTextSecondary }}>This is a frontend demo. No real payment will be processed.</ThemedText></View><View style={{ padding: theme.spacing.md, borderRadius: theme.radii.lg, borderWidth: 2, borderColor: theme.colors.colorPrimary, backgroundColor: theme.colors.colorSurface }}><ThemedText variant="body" weight="semibold">UPI / PhonePe</ThemedText><ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary }}>Fast and secure payment</ThemedText></View><View style={{ padding: theme.spacing.md, borderRadius: theme.radii.lg, backgroundColor: theme.colors.colorSurfaceDisabled }}><ThemedText variant="bodySmall">Amount to pay</ThemedText><ThemedText variant="h1" style={{ color: theme.colors.colorPrimary }}>₹{total}</ThemedText></View><View style={{ flex: 1 }} /><Button onPress={() => router.replace('/order-success')}>Pay ₹{total} securely</Button></View></SafeAreaView>;
}
