import { useTranslation } from "react-i18next";
import { Pressable, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { ScreenHeader } from "../src/components/molecules/ScreenHeader";
import { useAppStore } from "../src/store/useAppStore";
import { useTheme } from "../src/theme";
import type { AppLanguage } from "../src/types/models";

export default function LanguageScreen() {
  const theme = useTheme(); const { t } = useTranslation(); const language = useAppStore((state) => state.language); const setLanguage = useAppStore((state) => state.setLanguage);
  const options: { value: AppLanguage; label: string }[] = [{ value: "en", label: t("language.english") }, { value: "gu", label: t("language.gujarati") }];
  return <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}><StatusBar barStyle="dark-content" /><View style={{ flex: 1, paddingHorizontal: theme.layout.screenHorizontalPadding, gap: theme.spacing.md }}><ScreenHeader backLabel={t("commonActions.back")} title={t("language.title")} /><ThemedText variant="bodySmall" style={{ color: theme.colors.colorTextSecondary }}>{t("language.description")}</ThemedText><View style={{ gap: theme.spacing.sm }}>{options.map((option) => { const selected = option.value === language; return <Pressable key={option.value} accessibilityRole="radio" accessibilityState={{ selected }} onPress={() => setLanguage(option.value)} style={{ minHeight: theme.layout.touchTargetMin + theme.spacing.sm, paddingHorizontal: theme.spacing.md, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderRadius: theme.radii.lg, borderWidth: selected ? theme.borderWidths.medium : theme.borderWidths.hairline, borderColor: selected ? theme.colors.colorPrimary : theme.colors.colorBorder, backgroundColor: selected ? theme.colors.colorPrimaryTint : theme.colors.colorSurface }}><ThemedText variant="body" weight="semibold">{option.label}</ThemedText><View style={{ width: theme.spacing.md, height: theme.spacing.md, borderRadius: theme.radii.pill, borderWidth: theme.borderWidths.medium, borderColor: selected ? theme.colors.colorPrimary : theme.colors.colorBorder, backgroundColor: selected ? theme.colors.colorPrimary : theme.colors.colorSurface }} /></Pressable>; })}</View></View></SafeAreaView>;
}
