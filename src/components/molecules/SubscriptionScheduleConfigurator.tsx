import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";

import { ThemedText } from "../atoms/ThemedText";
import { useTheme } from "../../theme";

type Frequency = "daily" | "alternate" | "custom";
interface SubscriptionScheduleConfiguratorProps {
  pricePerDelivery: number;
}

const labels = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const daysByFrequency: Record<Exclude<Frequency, "custom">, number[]> = {
  daily: [0, 1, 2, 3, 4, 5, 6],
  alternate: [0, 2, 4, 6],
};

export function SubscriptionScheduleConfigurator({
  pricePerDelivery,
}: SubscriptionScheduleConfiguratorProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [frequency, setFrequency] = useState<Frequency>("daily");
  const [customDays, setCustomDays] = useState<number[]>([0, 2, 4]);
  const activeDays =
    frequency === "custom" ? customDays : daysByFrequency[frequency];
  const deliveryCount = activeDays.length;
  const updateFrequency = (next: Frequency) => setFrequency(next);
  const toggleDay = (index: number) => {
    setFrequency("custom");
    setCustomDays((current) =>
      current.includes(index)
        ? current.filter((day) => day !== index)
        : [...current, index].sort(),
    );
  };
  const weeklyTotal = useMemo(
    () => deliveryCount * pricePerDelivery,
    [deliveryCount, pricePerDelivery],
  );

  return (
    <View style={{ gap: theme.spacing.md }}>
      <View style={{ gap: theme.spacing.sm }}>
        <ThemedText variant="bodySmall" weight="semibold">
          {t("productDetails.scheduleFrequency")}
        </ThemedText>
        <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
          {(
            [
              { key: "daily", labelKey: "productDetails.daily" },
              { key: "alternate", labelKey: "productDetails.alternateDays" },
              { key: "custom", labelKey: "productDetails.customDays" },
            ] as { key: Frequency; labelKey: string }[]
          ).map((option) => {
            const selected = frequency === option.key;
            return (
              <Pressable
                key={option.key}
                accessibilityRole="radio"
                accessibilityState={{ selected }}
                onPress={() => updateFrequency(option.key)}
                style={{
                  flex: 1,
                  minHeight: theme.layout.touchTargetMin,
                  alignItems: "center",
                  justifyContent: "center",
                  paddingHorizontal: theme.spacing.xs,
                  borderRadius: theme.radii.md,
                  borderWidth: theme.borderWidths.none,
                  backgroundColor: selected
                    ? theme.colors.colorPrimaryTint
                    : theme.colors.colorSurface,
                }}
              >
                <ThemedText
                  variant="caption"
                  weight="semibold"
                  style={{
                    color: selected
                      ? theme.colors.colorPrimary
                      : theme.colors.colorTextPrimary,
                    textAlign: "center",
                  }}
                >
                  {option.key === "daily" ? `✓ ${t(option.labelKey)}` : t(option.labelKey)}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>
      </View>
      <View style={{ gap: theme.spacing.sm }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <ThemedText variant="bodySmall" weight="semibold">
            {t("productDetails.scheduleDays")}
          </ThemedText>
          <View
            style={{
              borderRadius: theme.radii.pill,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs,
              backgroundColor: theme.colors.colorSurfaceMuted,
            }}
          >
            <ThemedText
              variant="caption"
              weight="semibold"
              style={{ color: theme.colors.colorTextSecondary }}
            >
              {t("productDetails.daysPerWeek", { count: deliveryCount })}
            </ThemedText>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: theme.spacing.xs }}>
          {labels.map((label, index) => {
            const selected = activeDays.includes(index);
            return (
              <Pressable
                key={`${label}-${index}`}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: selected }}
                onPress={() => toggleDay(index)}
                style={{
                  flex: 1,
                  width: theme.layout.touchTargetMin,
                  height: theme.layout.touchTargetMin,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: theme.radii.pill,
                  borderWidth: selected
                    ? theme.borderWidths.medium
                    : theme.borderWidths.hairline,
                  borderColor: selected
                    ? theme.colors.colorPrimary
                    : theme.colors.colorBorder,
                  backgroundColor: selected
                    ? theme.colors.colorPrimaryTint
                    : theme.colors.colorSurface,
                }}
              >
                <ThemedText
                  variant="caption"
                  weight="semibold"
                  style={{
                    color: selected
                      ? theme.colors.colorPrimary
                      : theme.colors.colorTextPrimary,
                  }}
                >
                  {t(`calendar.${label}`)}
                </ThemedText>
              </Pressable>
            );
          })}
        </View>
      </View>
      <View style={{ height: theme.spacing.sm }} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: theme.spacing.md,
          borderRadius: theme.radii.md,
          backgroundColor: theme.colors.colorSurface,
          ...theme.elevation.card,
        }}
      >
        <View>
          <ThemedText
            variant="overline"
            weight="semibold"
            style={{ color: theme.colors.colorTextSecondary }}
          >
            {t("productDetails.selectedSchedule")}
          </ThemedText>
          <ThemedText
            variant="caption"
            style={{ color: theme.colors.colorTextSecondary }}
          >
            {t("productDetails.deliveryDaysEachWeek", { count: deliveryCount })}
          </ThemedText>
        </View>
        <ThemedText variant="h2">
          ₹{weeklyTotal}
          <ThemedText variant="caption"> {t("productDetails.perWeek")}</ThemedText>
        </ThemedText>
      </View>
    </View>
  );
}
