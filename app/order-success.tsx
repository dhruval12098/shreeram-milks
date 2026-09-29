import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../src/components/atoms/Button";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { useAppStore } from "../src/store/useAppStore";
import { useTheme } from "../src/theme";

export default function OrderSuccessScreen() {
  const theme = useTheme(); const { t } = useTranslation(); const clearCart = useAppStore((state) => state.clearCart); const address = useAppStore((state) => state.addresses.find((item) => item.isDefault));
  return <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}><StatusBar barStyle="dark-content" /><View style={{ flex: 1, justifyContent: "center", padding: theme.layout.screenHorizontalPadding, gap: theme.spacing.md }}><View style={{ alignSelf: "center", width: theme.sizes.avatarLg * 2, height: theme.sizes.avatarLg * 2, borderRadius: theme.radii.pill, alignItems: "center", justifyContent: "center", backgroundColor: theme.colors.colorPrimary }}><ThemedText variant="h1" style={{ color: theme.colors.colorTextInverse }}>✓</ThemedText></View><ThemedText variant="h1" style={{ textAlign: "center" }}>{t("success.title")}</ThemedText><ThemedText style={{ color: theme.colors.colorTextSecondary, textAlign: "center" }}>{t("success.description")}</ThemedText><View style={{ gap: theme.spacing.xs, padding: theme.spacing.md, borderRadius: theme.radii.lg, backgroundColor: theme.colors.colorSurfaceMuted }}><ThemedText variant="bodySmall" weight="semibold">{t("success.order")} #SR-8842</ThemedText><ThemedText variant="body">Tomorrow · 5:00 – 7:00 AM</ThemedText><ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary }}>{address ? `${address.line1}, ${address.city}` : ""}</ThemedText></View><Button onPress={() => { clearCart(); router.replace({ pathname: "/order-tracking", params: { orderId: "SR-8842" } }); }}>{t("success.track")}</Button><Button variant="secondary" onPress={() => { clearCart(); router.replace("/home"); }}>{t("success.home")}</Button></View></SafeAreaView>;
}
