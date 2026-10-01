import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../src/components/atoms/Button";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { useAppStore } from "../src/store/useAppStore";
import { useTheme } from "../src/theme";

export default function OrderSuccessScreen() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const clearCart = useAppStore((state) => state.clearCart);
  const order = useAppStore((state) => state.previewOrder);
  const deliveryDate = order ? new Date(new Date(order.placedAt).getTime() + 24 * 60 * 60 * 1000).toLocaleDateString(i18n.language, { day: "numeric", month: "short", year: "numeric" }) : "";

  return <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}><StatusBar barStyle="dark-content" /><View style={{ flex: 1, justifyContent: "center", padding: theme.layout.screenHorizontalPadding, gap: theme.spacing.md }}>
    {order ? <>
      <View style={{ alignSelf: "center", width: theme.sizes.avatarLg * 2, height: theme.sizes.avatarLg * 2, borderRadius: theme.radii.pill, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.colorPrimary }}><ThemedText variant="h1" style={{ color: theme.colors.colorTextInverse }}>✓</ThemedText></View>
      <ThemedText variant="h1" style={{ textAlign: "center" }}>{t("success.title")}</ThemedText>
      <ThemedText style={{ color: theme.colors.colorTextSecondary, textAlign: "center" }}>{t("success.description")}</ThemedText>
      <View style={{ gap: theme.spacing.xs, padding: theme.spacing.md, borderRadius: theme.radii.lg, backgroundColor: theme.colors.colorSurfaceMuted }}><ThemedText variant="bodySmall" weight="semibold">{t("success.order", { number: order.id })}</ThemedText><ThemedText variant="body">{deliveryDate} · {order.deliveryWindow}</ThemedText><ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary }}>{order.address}</ThemedText></View>
      <Button onPress={() => { clearCart(); router.replace({ pathname: "/order-tracking", params: { orderId: order.id } }); }}>{t("success.track")}</Button>
    </> : <ThemedText variant="body" style={{ textAlign: "center" }}>{t("tracking.unavailable")}</ThemedText>}
    <Button variant="secondary" onPress={() => { clearCart(); router.replace("/home"); }}>{t("success.home")}</Button>
  </View></SafeAreaView>;
}
