import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Pressable, StatusBar, StyleSheet, View } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardStickyView,
} from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppIcon } from "../src/components/atoms/AppIcon";
import { AppInput } from "../src/components/atoms/AppInput";
import { Button } from "../src/components/atoms/Button";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { DeliverySetupHeader } from "../src/components/molecules/DeliverySetupHeader";
import { useScrollResponsiveBottomAction } from "../src/components/organisms/ScrollResponsiveBottomAction";
import { useServiceAreas } from "../src/hooks/useServiceAreas";
import { LocationIcon } from "../src/icons/appIcons";
import { useTheme } from "../src/theme";

function DummyMapBackground() {
  const theme = useTheme();
  return (
    <View
      style={[StyleSheet.absoluteFill, { overflow: "hidden" }]}
      pointerEvents="none"
    >
      <View
        style={{
          position: "absolute",
          top: 20,
          left: -10,
          width: 220,
          height: 2,
          backgroundColor: theme.colors.colorBorder,
          transform: [{ rotate: "18deg" }],
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 70,
          left: -20,
          width: 260,
          height: 2,
          backgroundColor: theme.colors.colorBorder,
          transform: [{ rotate: "-8deg" }],
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 10,
          left: 40,
          width: 2,
          height: 120,
          backgroundColor: theme.colors.colorBorder,
          transform: [{ rotate: "10deg" }],
        }}
      />
      <View
        style={{
          position: "absolute",
          top: 24,
          left: 90,
          width: 28,
          height: 20,
          borderRadius: theme.radii.sm,
          backgroundColor: theme.colors.colorSurfaceMuted,
        }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 30,
          right: 60,
          width: 36,
          height: 24,
          borderRadius: theme.radii.sm,
          backgroundColor: theme.colors.colorSurfaceMuted,
        }}
      />
    </View>
  );
}

export default function LocationScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { bottomActionStyle, onScroll } = useScrollResponsiveBottomAction();
  const { data: serviceAreas = [] } = useServiceAreas();
  const [address, setAddress] = useState("Villa 4B");
  const [landmark, setLandmark] = useState("Greenwood Meadows Phase 1");
  const [addressType, setAddressType] = useState("home");
  const area = serviceAreas[0]?.locality ?? t("location.fallbackArea");

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}
    >
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1, paddingHorizontal: theme.spacing.lg }}>
        <DeliverySetupHeader
          step={1}
          title={t("location.title")}
          skipLabel={t("location.skip")}
        />
        <KeyboardAwareScrollView
          mode="layout"
          keyboardShouldPersistTaps="handled"
          onScroll={onScroll}
          scrollEventThrottle={16}
          style={{ flex: 1 }}
          contentContainerStyle={{
            gap: theme.spacing.lg,
            paddingTop: theme.spacing.md,
            paddingBottom: 132,
          }}
          showsVerticalScrollIndicator={false}
        >
          <ThemedText
            variant="bodySmall"
            style={{ color: theme.colors.colorTextSecondary }}
          >
            {t("location.description")}
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
            <View
              style={{
                height: 128,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: theme.colors.colorSurfaceDisabled,
              }}
            >
              <DummyMapBackground />
              <View
                style={{
                  width: theme.sizes.avatarLg,
                  height: theme.sizes.avatarLg,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: theme.radii.pill,
                  backgroundColor: theme.colors.colorPrimary,
                  borderWidth: theme.borderWidths.medium,
                  borderColor: theme.colors.colorSurface,
                }}
              >
                <AppIcon
                  icon={LocationIcon}
                  accessibilityLabel={t("location.pinned")}
                  size="md"
                  tone="onPrimary"
                />
              </View>
              <View
                style={[
                  {
                    position: "absolute",
                    bottom: theme.spacing.sm,
                    left: theme.spacing.sm,
                    borderRadius: theme.radii.pill,
                    paddingHorizontal: theme.spacing.sm,
                    paddingVertical: theme.spacing.xs,
                    backgroundColor: theme.colors.colorSurface,
                  },
                  theme.elevation.card,
                ]}
              >
                <ThemedText variant="caption" weight="semibold">
                  {t("location.available")}
                </ThemedText>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: theme.spacing.sm,
                padding: theme.spacing.md,
              }}
            >
              <View
                style={{
                  width: theme.sizes.avatarSm,
                  height: theme.sizes.avatarSm,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: theme.radii.pill,
                  backgroundColor: theme.colors.colorPrimaryTint,
                }}
              >
                <AppIcon
                  icon={LocationIcon}
                  accessibilityLabel={t("location.pinnedArea")}
                  size="sm"
                />
              </View>
              <View style={{ flex: 1, gap: theme.spacing.xs }}>
                <ThemedText
                  variant="caption"
                  weight="semibold"
                  style={{ color: theme.colors.colorTextSecondary }}
                >
                  {t("location.pinnedArea")}
                </ThemedText>
                <ThemedText variant="bodySmall" numberOfLines={1}>
                  {area}
                </ThemedText>
                <ThemedText
                  variant="caption"
                  style={{ color: theme.colors.colorTextSecondary }}
                >
                  {t("location.areaDetail")}
                </ThemedText>
              </View>
            </View>
          </View>
          <View style={{ gap: theme.spacing.xs }}>
            <ThemedText variant="bodySmall" weight="semibold">
              {t("location.addressLine1")}{" "}
              <ThemedText
                variant="bodySmall"
                weight="bold"
                style={{ color: theme.colors.colorDanger }}
              >
                *
              </ThemedText>
            </ThemedText>
            <AppInput
              accessibilityLabel={t("location.addressLine1")}
              onChangeText={setAddress}
              value={address}
            />
          </View>
          <View style={{ gap: theme.spacing.xs }}>
            <ThemedText variant="bodySmall" weight="semibold">
              {t("location.addressLine2")}{" "}
              <ThemedText
                variant="bodySmall"
                weight="bold"
                style={{ color: theme.colors.colorDanger }}
              >
                *
              </ThemedText>
            </ThemedText>
            <AppInput
              accessibilityLabel={t("location.addressLine2")}
              onChangeText={setLandmark}
              value={landmark}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: theme.spacing.sm,
            }}
          >
            <ThemedText
              variant="caption"
              style={{ color: theme.colors.colorTextSecondary }}
            >
              {t("location.saveAs")}
            </ThemedText>
            {(["home", "work", "other"] as const).map((item) => (
              <Pressable
                key={item}
                accessibilityRole="radio"
                accessibilityState={{ selected: addressType === item }}
                onPress={() => setAddressType(item)}
                style={{
                  borderRadius: theme.radii.pill,
                  paddingHorizontal: theme.spacing.sm,
                  paddingVertical: theme.spacing.xs,
                  backgroundColor:
                    addressType === item
                      ? theme.colors.colorPrimary
                      : theme.colors.colorSurfaceMuted,
                }}
              >
                <ThemedText
                  variant="caption"
                  weight="semibold"
                  style={{
                    color:
                      addressType === item
                        ? theme.colors.colorTextInverse
                        : theme.colors.colorTextPrimary,
                  }}
                >
                  {t(`addresses.${item}`)}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </KeyboardAwareScrollView>
        <KeyboardStickyView
          offset={{ closed: 0, opened: theme.spacing.sm }}
          style={{
            position: "absolute",
            right: theme.spacing.lg,
            bottom: theme.spacing.sm,
            left: theme.spacing.lg,
          }}
        >
          <Animated.View
            style={[
              {
                paddingTop: theme.spacing.xs,
                backgroundColor: theme.colors.colorBackground,
              },
              bottomActionStyle,
            ]}
          >
            <View style={{ paddingBottom: theme.spacing.xs }}>
              <Button onPress={() => router.push("/delivery-slot")}>
                {t("location.continue")}
              </Button>
            </View>
          </Animated.View>
        </KeyboardStickyView>
      </View>
    </SafeAreaView>
  );
}
