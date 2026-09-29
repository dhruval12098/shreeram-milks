import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppIcon } from "../src/components/atoms/AppIcon";
import { Avatar } from "../src/components/atoms/Avatar";
import { Button } from "../src/components/atoms/Button";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { AccountMenuRow } from "../src/components/molecules/AccountMenuRow";
import { SettingsToggleRow } from "../src/components/molecules/SettingsToggleRow";
import {
  AlertsIcon,
  BackIcon,
  CalendarIcon,
  DownloadIcon,
  EditIcon,
  LanguageIcon,
  LockIcon,
  LogoutIcon,
  ShieldIcon,
} from "../src/icons/appIcons";
import { useTheme } from "../src/theme";

function SettingsGroup({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const theme = useTheme();
  return (
    <View style={{ gap: theme.spacing.sm }}>
      <ThemedText
        variant="bodySmall"
        weight="bold"
        style={{ color: theme.colors.colorPrimary }}
      >
        {title}
      </ThemedText>
      <View
        style={{
          overflow: "hidden",
          borderRadius: theme.radii.lg,
          borderWidth: theme.borderWidths.hairline,
          borderColor: theme.colors.colorBorder,
          backgroundColor: theme.colors.colorSurface,
        }}
      >
        {children}
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [dispatchAlerts, setDispatchAlerts] = useState(true);
  const [photoProof, setPhotoProof] = useState(true);
  const [seasonalUpdates, setSeasonalUpdates] = useState(false);
  const [biometricLock, setBiometricLock] = useState(false);
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}
    >
      <StatusBar barStyle="dark-content" />
      <View
        style={{
          minHeight: theme.sizes.buttonHeight + theme.spacing.md,
          paddingHorizontal: theme.layout.screenHorizontalPadding,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Pressable
          accessibilityLabel={t("settings.back")}
          hitSlop={theme.spacing.sm}
          onPress={() => router.back()}
          style={{
            width: theme.layout.touchTargetMin,
            height: theme.layout.touchTargetMin,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppIcon icon={BackIcon} accessibilityLabel="" />
        </Pressable>
        <ThemedText variant="h2">{t("settings.title")}</ThemedText>
        <View style={{ width: theme.layout.touchTargetMin }} />
      </View>
      <ScrollView
        contentContainerStyle={{
          padding: theme.layout.screenHorizontalPadding,
          paddingBottom: theme.spacing.xxl,
          gap: theme.spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            padding: theme.spacing.md,
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing.sm,
            borderRadius: theme.radii.lg,
            borderWidth: theme.borderWidths.hairline,
            borderColor: theme.colors.colorBorder,
            backgroundColor: theme.colors.colorSurface,
          }}
        >
          <Avatar
            imageUrl="https://images.unsplash.com/photo-1626193082710-a16206f819f2?auto=format&fit=crop&w=168&h=168&q=80"
            initials="PS"
            size="lg"
          />
          <View style={{ flex: 1, gap: theme.spacing.xs }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: theme.spacing.xs,
              }}
            >
              <ThemedText variant="body" weight="bold">
                {t("profile.customerName")}
              </ThemedText>
              <View
                style={{
                  paddingHorizontal: theme.spacing.xs,
                  borderRadius: theme.radii.pill,
                  backgroundColor: theme.colors.colorPrimary,
                }}
              >
                <ThemedText
                  variant="caption"
                  weight="semibold"
                  style={{ color: theme.colors.colorTextInverse }}
                >
                  {t("settings.memberLabel")}
                </ThemedText>
              </View>
            </View>
            <ThemedText
              variant="bodySmall"
              style={{ color: theme.colors.colorTextSecondary }}
            >
              {t("settings.memberDetail")}
            </ThemedText>
          </View>
          <Pressable accessibilityRole="button" accessibilityLabel={t("profile.editProfile")} hitSlop={theme.spacing.sm} onPress={() => router.push("/edit-profile")} style={{ width: theme.layout.touchTargetMin, height: theme.layout.touchTargetMin, alignItems: "center", justifyContent: "center" }}><AppIcon icon={EditIcon} accessibilityLabel="" tone="secondary" size="sm" /></Pressable>
        </View>
        <SettingsGroup title={t("settings.alertsSection")}>
          <SettingsToggleRow
            enabled={dispatchAlerts}
            icon={AlertsIcon}
            onChange={setDispatchAlerts}
            subtitle={t("settings.dispatchAlertSubtitle")}
            title={t("settings.dispatchAlert")}
          />
          <SettingsToggleRow
            enabled={photoProof}
            icon={CalendarIcon}
            onChange={setPhotoProof}
            subtitle={t("settings.photoProofSubtitle")}
            title={t("settings.photoProof")}
          />
          <SettingsToggleRow
            enabled={seasonalUpdates}
            icon={AlertsIcon}
            isLast
            onChange={setSeasonalUpdates}
            subtitle={t("settings.seasonalSubtitle")}
            title={t("settings.seasonal")}
          />
        </SettingsGroup>
        <SettingsGroup title={t("settings.deliverySection")}>
          <SettingsToggleRow
            enabled={biometricLock}
            icon={LockIcon}
            onChange={setBiometricLock}
            subtitle={t("settings.biometricSubtitle")}
            title={t("settings.biometric")}
          />
          <AccountMenuRow
            icon={ShieldIcon}
            subtitle={t("settings.doorbellSubtitle")}
            title={t("settings.doorbell")}
            trailing={t("settings.custom")}
          />
          <AccountMenuRow
            icon={CalendarIcon}
            isLast
            subtitle={t("settings.dropInstructionSubtitle")}
            title={t("settings.dropInstruction")}
          />
        </SettingsGroup>
        <SettingsGroup title={t("settings.accountSection")}>
          <AccountMenuRow
            icon={LanguageIcon}
            subtitle={t("settings.languageSubtitle")}
            title={t("settings.language")}
            trailing={t("settings.english")}
            isLast
            onPress={() => router.push("/language")}
          />
        </SettingsGroup>
        <View
          style={{
            padding: theme.spacing.md,
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing.sm,
            borderRadius: theme.radii.lg,
            borderWidth: theme.borderWidths.hairline,
            borderColor: theme.colors.colorBorder,
            backgroundColor: theme.colors.colorSurfaceMuted,
          }}
        >
          <Avatar initials="R" size="lg" />
          <View style={{ flex: 1, gap: theme.spacing.xs }}>
            <ThemedText variant="body" weight="semibold">
              {t("settings.recycleTitle")}
            </ThemedText>
            <ThemedText
              variant="bodySmall"
              style={{ color: theme.colors.colorTextSecondary }}
            >
              {t("settings.recycleSubtitle")}
            </ThemedText>
          </View>
        </View>
        <Button icon={LogoutIcon} variant="secondary">
          {t("settings.logout")}
        </Button>
        <ThemedText
          variant="caption"
          style={{
            color: theme.colors.colorTextSecondary,
            textAlign: "center",
          }}
        >
          {t("settings.version")}
        </ThemedText>
      </ScrollView>
    </SafeAreaView>
  );
}
