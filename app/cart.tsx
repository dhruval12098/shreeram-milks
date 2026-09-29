import { router } from 'expo-router';
import { FlatList, Pressable, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../src/components/atoms/Button';
import { ThemedText } from '../src/components/atoms/ThemedText';
import { BottomNavigation } from '../src/components/organisms/BottomNavigation';
import { CartIcon, CalendarIcon, HomeIcon, MinusIcon, AddIcon, ProductsIcon, ProfileIcon } from '../src/icons/appIcons';
import { useAppStore } from '../src/store/useAppStore';
import { useTheme } from '../src/theme';

export default function CartScreen() {
  const theme = useTheme();
  const cart = useAppStore((state) => state.cart);
  const updateQuantity = useAppStore((state) => state.updateCartQuantity);
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  return <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.colorSurfaceMuted }}><StatusBar barStyle="dark-content" /><View style={{ flex: 1, padding: theme.spacing.md }}>
    <View style={{ paddingVertical: theme.spacing.md, gap: theme.spacing.xs }}><ThemedText variant="h1">Your basket</ThemedText><ThemedText variant="bodySmall" style={{ color: theme.colors.colorTextSecondary }}>{cart.length ? `${cart.length} fresh product${cart.length === 1 ? '' : 's'}` : 'Your basket is ready for something fresh.'}</ThemedText></View>
    {cart.length === 0 ? <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', gap: theme.spacing.md }}><ThemedText variant="h2">Your basket is empty</ThemedText><ThemedText variant="bodySmall" style={{ color: theme.colors.colorTextSecondary, textAlign: 'center' }}>Choose your daily essentials and we’ll deliver them before dawn.</ThemedText><Button onPress={() => router.replace('/products')}>Browse products</Button></View> : <FlatList data={cart} keyExtractor={(item) => item.product.id} contentContainerStyle={{ gap: theme.spacing.sm, paddingBottom: theme.spacing.lg }} renderItem={({ item }) => <View style={{ flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md, padding: theme.spacing.md, borderRadius: theme.radii.lg, backgroundColor: theme.colors.colorSurface }}><View style={{ flex: 1, gap: theme.spacing.xs }}><ThemedText variant="body" weight="semibold">{item.product.name}</ThemedText><ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary }}>{item.product.unit} · ₹{item.product.price}</ThemedText></View><Pressable accessibilityRole="button" accessibilityLabel="Decrease quantity" onPress={() => updateQuantity(item.product.id, item.quantity - 1)}><ThemedText variant="h2">−</ThemedText></Pressable><ThemedText variant="body" weight="semibold">{item.quantity}</ThemedText><Pressable accessibilityRole="button" accessibilityLabel="Increase quantity" onPress={() => updateQuantity(item.product.id, item.quantity + 1)}><ThemedText variant="h2">+</ThemedText></Pressable></View>} ListFooterComponent={<View style={{ gap: theme.spacing.md, paddingTop: theme.spacing.md }}><View style={{ flexDirection: 'row', justifyContent: 'space-between' }}><ThemedText variant="body">Subtotal</ThemedText><ThemedText variant="body" weight="semibold">₹{total}</ThemedText></View><ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary }}>Free early-morning delivery on subscription orders.</ThemedText><Button onPress={() => router.push('/checkout-address')}>Continue to checkout</Button></View>} />}
  </View><BottomNavigation activeKey="cart" onChange={(key) => { if (key === 'home') router.replace('/home'); if (key === 'products') router.replace('/products'); if (key === 'subscriptions') router.replace('/subscriptions'); if (key === 'profile') router.replace('/profile'); }} items={[{ key: 'home', label: 'Home', icon: HomeIcon }, { key: 'products', label: 'Products', icon: ProductsIcon }, { key: 'subscriptions', label: 'Subscriptions', icon: CalendarIcon }, { key: 'cart', label: 'Cart', icon: CartIcon }, { key: 'profile', label: 'Profile', icon: ProfileIcon }]} /></SafeAreaView>;
}
