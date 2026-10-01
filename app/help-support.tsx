import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppIcon } from "../src/components/atoms/AppIcon";
import { Button } from "../src/components/atoms/Button";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { ScreenHeader } from "../src/components/molecules/ScreenHeader";
import { useOrders } from "../src/hooks/useOrders";
import { HelpIcon, PhoneIcon } from "../src/icons/appIcons";
import { useTheme } from "../src/theme";

const categories = ["deliveryMissing", "late", "wrongProduct", "quality", "paymentIssue", "subscriptionIssue", "addressIssue", "other"];
const faqs = ["faqDelivery", "faqPause", "faqPayments", "faqQuality"];

export default function HelpSupportScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { data: orders = [] } = useOrders();
  const [selection, setSelection] = useState<string | null>(null);
  const latest = orders[0];
  const answerKey = selection && faqs.includes(selection) ? `support.${selection}Answer` : null;
  const noticeKey = selection === "chat" ? "support.chatDetail" : selection === "call" ? "support.callUnavailable" : selection === "report" || (selection && categories.includes(selection)) ? "support.reportUnavailable" : null;

  return <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}><StatusBar barStyle="dark-content" /><View style={{ flex: 1, paddingHorizontal: theme.layout.screenHorizontalPadding }}>
    <ScreenHeader backLabel={t("commonActions.back")} title={t("support.title")} />
    <ScrollView contentContainerStyle={{ gap: theme.spacing.lg, paddingVertical: theme.spacing.md, paddingBottom: theme.spacing.xxl }}>
      <ThemedText variant="bodySmall" style={{ color: theme.colors.colorTextSecondary }}>{t("support.subtitle")}</ThemedText>
      <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
        <SupportAction icon={HelpIcon} title={t("support.chat")} detail={t("support.chatDetail")} onPress={() => setSelection("chat")} />
        <SupportAction icon={PhoneIcon} title={t("support.call")} detail={t("support.callDetail")} onPress={() => setSelection("call")} />
      </View>
      {noticeKey ? <View accessibilityLiveRegion="polite" style={{ padding: theme.spacing.md, borderRadius: theme.radii.md, backgroundColor: theme.colors.colorInfoTint }}><ThemedText variant="bodySmall">{selection && categories.includes(selection) ? `${t(`support.${selection}`)}: ` : ""}{t(noticeKey)}</ThemedText></View> : null}
      {latest ? <View style={{ gap: theme.spacing.sm, padding: theme.spacing.md, borderRadius: theme.radii.lg, backgroundColor: theme.colors.colorSurfaceMuted }}><ThemedText variant="overline" style={{ color: theme.colors.colorTextSecondary }}>{t("support.recent")}</ThemedText><ThemedText variant="body" weight="semibold">{latest.id}</ThemedText><ThemedText variant="bodySmall" style={{ color: theme.colors.colorTextSecondary }}>{latest.deliveryWindow} · {latest.items.map((item) => item.name).join(", ")}</ThemedText><Button variant="secondary" onPress={() => setSelection("report")}>{t("support.report")}</Button></View> : null}
      <View style={{ gap: theme.spacing.sm }}><ThemedText variant="body" weight="semibold">{t("support.categories")}</ThemedText><View style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.spacing.sm }}>{categories.map((category) => <Pressable key={category} accessibilityRole="button" accessibilityState={{ selected: selection === category }} onPress={() => setSelection(category)} style={({ pressed }) => ({ minHeight: theme.layout.touchTargetMin, paddingHorizontal: theme.spacing.md, alignItems: "center", justifyContent: "center", borderRadius: theme.radii.pill, backgroundColor: theme.colors.colorPrimaryTint, opacity: pressed ? theme.opacity.subdued : theme.opacity.full })}><ThemedText variant="bodySmall" style={{ color: theme.colors.colorPrimary }}>{t(`support.${category}`)}</ThemedText></Pressable>)}</View></View>
      <View style={{ gap: theme.spacing.sm }}><ThemedText variant="body" weight="semibold">{t("support.faq")}</ThemedText>{faqs.map((faq) => <Pressable key={faq} accessibilityRole="button" accessibilityState={{ expanded: selection === faq }} onPress={() => setSelection(selection === faq ? null : faq)} style={({ pressed }) => ({ minHeight: theme.layout.touchTargetMin, gap: theme.spacing.sm, padding: theme.spacing.md, borderRadius: theme.radii.md, backgroundColor: theme.colors.colorSurface, opacity: pressed ? theme.opacity.subdued : theme.opacity.full })}><ThemedText variant="bodySmall" weight="semibold">{t(`support.${faq}`)}</ThemedText>{selection === faq && answerKey ? <ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary }}>{t(answerKey)}</ThemedText> : null}</Pressable>)}</View>
    </ScrollView>
  </View></SafeAreaView>;
}

function SupportAction({ detail, icon, onPress, title }: { detail: string; icon: typeof HelpIcon; onPress: () => void; title: string }) {
  const theme = useTheme();
  return <Pressable accessibilityRole="button" accessibilityLabel={title} onPress={onPress} style={({ pressed }) => ({ flex: 1, minHeight: theme.sizes.avatarLg * 2, gap: theme.spacing.sm, padding: theme.spacing.md, borderRadius: theme.radii.lg, backgroundColor: theme.colors.colorSurface, opacity: pressed ? theme.opacity.subdued : theme.opacity.full })}><AppIcon icon={icon} accessibilityLabel="" size="sm" /><ThemedText variant="bodySmall" weight="semibold">{title}</ThemedText><ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary }}>{detail}</ThemedText></Pressable>;
}
