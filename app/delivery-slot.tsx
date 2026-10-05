import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Pressable, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppIcon } from "../src/components/atoms/AppIcon";
import { Button } from "../src/components/atoms/Button";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { DeliverySetupHeader } from "../src/components/molecules/DeliverySetupHeader";
import { useScrollResponsiveBottomAction } from "../src/components/organisms/ScrollResponsiveBottomAction";
import { CalendarIcon, LocationIcon } from "../src/icons/appIcons";
import { useTheme } from "../src/theme";

interface ProtocolSwitchProps {
  label: string;
  description: string;
  value: boolean;
  onChange: (value: boolean) => void;
}

function ProtocolSwitch({
  label,
  description,
  value,
  onChange,
}: ProtocolSwitchProps) {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.sm,
        paddingTop: theme.spacing.sm,
        borderTopWidth: theme.borderWidths.hairline,
        borderColor: theme.colors.colorBorder,
      }}
    >
      <View style={{ flex: 1, gap: theme.spacing.xs }}>
        <ThemedText variant="bodySmall" weight="semibold">
          {label}
        </ThemedText>
        <ThemedText
          variant="caption"
          style={{ color: theme.colors.colorTextSecondary }}
        >
          {description}
        </ThemedText>
      </View>
      <Pressable
        accessibilityRole="switch"
        accessibilityState={{ checked: value }}
        accessibilityLabel={label}
        onPress={() => onChange(!value)}
        style={{
          width: 48,
          height: 28,
          justifyContent: "center",
          borderRadius: theme.radii.pill,
          padding: 3,
          backgroundColor: value
            ? theme.colors.colorPrimary
            : theme.colors.colorBorder,
        }}
      >
        <View
          style={{
            width: 22,
            height: 22,
            alignSelf: value ? "flex-end" : "flex-start",
            borderRadius: theme.radii.pill,
            backgroundColor: theme.colors.colorSurface,
          }}
        />
      </Pressable>
    </View>
  );
}

export default function DeliverySlotScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { bottomActionStyle, onScroll } = useScrollResponsiveBottomAction();
  const [slot, setSlot] = useState<"silent" | "handover">("silent");
  const [ringBell, setRingBell] = useState(false);
  const [insulatedPouch, setInsulatedPouch] = useState(true);
  const slotCard = (
    key: "silent" | "handover",
    title: string,
    time: string,
    recommended = false,
  ) => {
    const active = slot === key;
    return (
      <Pressable
        key={key}
        accessibilityRole="radio"
        accessibilityState={{ selected: active }}
        accessibilityLabel={title}
        onPress={() => setSlot(key)}
        style={[
          {
            flex: 1,
            minHeight: theme.sizes.slotCardHeight * 2,
            justifyContent: "space-between",
            borderRadius: theme.radii.lg,
            padding: theme.spacing.md,
            backgroundColor: active
              ? theme.colors.colorPrimary
              : theme.colors.colorSurface,
            borderWidth: active
              ? theme.borderWidths.none
              : theme.borderWidths.hairline,
            borderColor: theme.colors.colorBorder,
          },
          active ? theme.elevation.card : theme.elevation.none,
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: theme.sizes.avatarSm,
              height: theme.sizes.avatarSm,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: theme.radii.pill,
              backgroundColor: active
                ? theme.colors.colorPrimaryTint
                : theme.colors.colorSurfaceMuted,
            }}
          >
            <AppIcon
              icon={CalendarIcon}
              accessibilityLabel=""
              size="sm"
              tone={active ? "onPrimary" : "secondary"}
            />
          </View>
          <View
            style={{
              width: theme.spacing.lg,
              height: theme.spacing.lg,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: theme.radii.pill,
              backgroundColor: active
                ? theme.colors.colorPrimaryTint
                : theme.colors.colorBorder,
            }}
          >
            <ThemedText
              variant="caption"
              weight="semibold"
              style={{
                color: active
                  ? theme.colors.colorPrimary
                  : theme.colors.colorTextSecondary,
              }}
            >
              {active ? "✓" : ""}
            </ThemedText>
          </View>
        </View>
        <View style={{ gap: theme.spacing.xs }}>
          <ThemedText
            variant="bodySmall"
            weight="semibold"
            style={{
              color: active
                ? theme.colors.colorTextInverse
                : theme.colors.colorTextPrimary,
            }}
          >
            {title}
          </ThemedText>
          {recommended ? (
            <ThemedText
              variant="caption"
              weight="semibold"
              style={{
                color: active
                  ? theme.colors.colorPrimaryTint
                  : theme.colors.colorTextSecondary,
              }}
            >
              {t("deliverySlot.recommended")}
            </ThemedText>
          ) : null}
          <ThemedText
            variant="caption"
            style={{
              color: active
                ? theme.colors.colorPrimaryTint
                : theme.colors.colorTextSecondary,
            }}
          >
            {time}
          </ThemedText>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}
    >
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1, paddingHorizontal: theme.spacing.lg }}>
        <DeliverySetupHeader
          step={2}
          title={t("deliverySlot.title")}
          skipLabel={t("location.skip")}
        />
        <Animated.ScrollView
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            gap: theme.spacing.lg,
            paddingTop: theme.spacing.md,
            paddingBottom: 132,
          }}
        >
          <ThemedText
            variant="bodySmall"
            style={{ color: theme.colors.colorTextSecondary }}
          >
            {t("deliverySlot.description")}
          </ThemedText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: theme.spacing.sm,
              borderRadius: theme.radii.lg,
              borderWidth: theme.borderWidths.hairline,
              borderColor: theme.colors.colorBorder,
              padding: theme.spacing.md,
              backgroundColor: theme.colors.colorSurfaceDisabled,
            }}
          >
            <View
              style={{
                width: theme.sizes.avatarMd,
                height: theme.sizes.avatarMd,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: theme.radii.pill,
                backgroundColor: theme.colors.colorSurface,
              }}
            >
              <AppIcon
                icon={LocationIcon}
                accessibilityLabel={t("deliverySlot.deliveringTo")}
                size="sm"
              />
            </View>
            <View style={{ flex: 1, gap: theme.spacing.xs }}>
              <ThemedText
                variant="caption"
                weight="semibold"
                style={{ color: theme.colors.colorTextSecondary }}
              >
                {t("deliverySlot.deliveringTo")}
              </ThemedText>
              <ThemedText
                variant="bodySmall"
                numberOfLines={1}
                weight="semibold"
              >
                {t("deliverySlot.address")}
              </ThemedText>
              <ThemedText
                variant="caption"
                style={{ color: theme.colors.colorTextSecondary }}
              >
                {t("deliverySlot.city")}
              </ThemedText>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("addresses.edit")}
              onPress={() => router.back()}
              style={{
                borderRadius: theme.radii.pill,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: theme.spacing.xs,
                backgroundColor: theme.colors.colorSurface,
              }}
            >
              <ThemedText
                variant="caption"
                weight="semibold"
                style={{ color: theme.colors.colorPrimary }}
              >
                {t("addresses.edit")}
              </ThemedText>
            </Pressable>
          </View>
          <View style={{ gap: theme.spacing.sm }}>
            <ThemedText
              variant="caption"
              weight="semibold"
              style={{ color: theme.colors.colorTextSecondary }}
            >
              {t("deliverySlot.selectWindow")}
            </ThemedText>
            <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
              {slotCard(
                "silent",
                t("deliverySlot.silent"),
                t("deliverySlot.silentTime"),
                true,
              )}
              {slotCard(
                "handover",
                t("deliverySlot.handover"),
                t("deliverySlot.handoverTime"),
              )}
            </View>
          </View>
          <View
            style={{
              gap: theme.spacing.sm,
              borderRadius: theme.radii.lg,
              padding: theme.spacing.md,
              backgroundColor: theme.colors.colorSurfaceDisabled,
            }}
          >
            <ThemedText variant="body" weight="semibold">
              {t("deliverySlot.protocol")}
            </ThemedText>
            <ProtocolSwitch
              label={t("deliverySlot.ring")}
              description={t("deliverySlot.ringDetail")}
              value={ringBell}
              onChange={setRingBell}
            />
            <ProtocolSwitch
              label={t("deliverySlot.pouch")}
              description={t("deliverySlot.pouchDetail")}
              value={insulatedPouch}
              onChange={setInsulatedPouch}
            />
          </View>
        </Animated.ScrollView>
        <Animated.View
          style={[
            {
              position: "absolute",
              right: theme.spacing.lg,
              bottom: theme.spacing.sm,
              left: theme.spacing.lg,
              paddingTop: theme.spacing.xs,
              backgroundColor: theme.colors.colorBackground,
            },
            bottomActionStyle,
          ]}
        >
          <View style={{ paddingBottom: theme.spacing.xs }}>
            <Button onPress={() => router.replace("/home")}>
              {t("deliverySlot.complete")}
            </Button>
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
