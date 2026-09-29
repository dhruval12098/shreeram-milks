import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../src/components/atoms/Button";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { CheckoutProgress } from "../src/components/molecules/CheckoutProgress";
import { useAppStore } from "../src/store/useAppStore";
import { useTheme } from "../src/theme";

type PaymentMethod = "upi" | "card" | "wallet";
export default function CheckoutPaymentScreen() {
  const theme = useTheme(); const { t } = useTranslation(); const cart = useAppStore((state) => state.cart); const [method, setMethod] = useState<PaymentMethod>("upi"); const [processing, setProcessing] = useState(false); const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const methods: { key: PaymentMethod; detail: string; disabled?: boolean; title: string }[] = [{ key: "upi", title: t("payment.upi"), detail: t("payment.upiDetail") }, { key: "card", title: t("payment.card"), detail: t("payment.cardDetail"), disabled: true }, { key: "wallet", title: t("payment.wallet"), detail: t("payment.walletDetail"), disabled: true }];
  const continueToSuccess = () => { setProcessing(true); setTimeout(() => router.replace("/order-success"), theme.motion.duration.fast); };
  return <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}><StatusBar barStyle="dark-content" /><View style={{ flex: 1, padding: theme.layout.screenHorizontalPadding, gap: theme.spacing.lg }}><CheckoutProgress step={3} title={t("payment.title")} /><View style={{ gap: theme.spacing.xs, padding: theme.spacing.md, borderRadius: theme.radii.lg, backgroundColor: theme.colors.colorSurfaceMuted }}><ThemedText variant="bodySmall" style={{ color: theme.colors.colorTextSecondary }}>{t("payment.amount")}</ThemedText><ThemedText variant="h1" style={{ color: theme.colors.colorPrimary }}>₹{total}</ThemedText></View><View style={{ gap: theme.spacing.sm }}>{methods.map((item) => { const selected = method === item.key; return <Pressable key={item.key} accessibilityRole="radio" accessibilityState={{ selected, disabled: item.disabled }} disabled={item.disabled} onPress={() => setMethod(item.key)} style={{ minHeight: theme.layout.touchTargetMin + theme.spacing.sm, gap: theme.spacing.xs, padding: theme.spacing.md, borderRadius: theme.radii.lg, borderWidth: selected ? theme.borderWidths.medium : theme.borderWidths.hairline, borderColor: selected ? theme.colors.colorPrimary : theme.colors.colorBorder, backgroundColor: selected ? theme.colors.colorPrimaryTint : theme.colors.colorSurface, opacity: item.disabled ? theme.opacity.disabled : theme.opacity.full }}><ThemedText variant="body" weight="semibold">{item.title}</ThemedText><ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary }}>{item.detail}</ThemedText></Pressable>; })}</View><ThemedText variant="bodySmall" style={{ color: theme.colors.colorTextSecondary }}>{t("payment.reassurance")}</ThemedText><View style={{ flex: 1 }} /><Button loading={processing} onPress={continueToSuccess}>{t(processing ? "payment.processing" : "payment.continue")}</Button></View></SafeAreaView>;
}
