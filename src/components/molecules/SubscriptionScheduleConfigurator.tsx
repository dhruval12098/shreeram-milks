import { useMemo, useState } from "react";
import { Pressable, View } from "react-native";

import { ThemedText } from "../atoms/ThemedText";
import { useTheme } from "../../theme";

type Frequency = "daily" | "alternate" | "custom";
interface SubscriptionScheduleConfiguratorProps {
  pricePerDelivery: number;
}

const labels = ["M", "T", "W", "T", "F", "S", "S"];
const daysByFrequency: Record<Exclude<Frequency, "custom">, number[]> = {
  daily: [0, 1, 2, 3, 4, 5, 6],
  alternate: [0, 2, 4, 6],
};

export function SubscriptionScheduleConfigurator({
  pricePerDelivery,
}: SubscriptionScheduleConfiguratorProps) {
  const theme = useTheme();
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
          Delivery Frequency
        </ThemedText>
        <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
          {(
            [
              { key: "daily", label: "✓ Daily" },
              { key: "alternate", label: "Alternate Days" },
              { key: "custom", label: "Custom Days" },
            ] as { key: Frequency; label: string }[]
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
                  borderWidth: selected
                    ? theme.borderWidths.none
                    : theme.borderWidths.hairline,
                  borderColor: theme.colors.colorBorder,
                  backgroundColor: selected
                    ? theme.colors.colorPrimary
                    : theme.colors.colorSurface,
                }}
              >
                <ThemedText
                  variant="caption"
                  weight="semibold"
                  style={{
                    color: selected
                      ? theme.colors.colorTextInverse
                      : theme.colors.colorTextPrimary,
                    textAlign: "center",
                  }}
                >
                  {option.label}
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
            Delivery Days
          </ThemedText>
          <View
            style={{
              borderRadius: theme.radii.pill,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs,
              backgroundColor: theme.colors.colorPrimaryTint,
            }}
          >
            <ThemedText
              variant="caption"
              weight="semibold"
              style={{ color: theme.colors.colorPrimary }}
            >
              {deliveryCount} days a week
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
                    ? theme.borderWidths.none
                    : theme.borderWidths.hairline,
                  borderColor: theme.colors.colorBorder,
                  backgroundColor: selected
                    ? theme.colors.colorPrimary
                    : theme.colors.colorSurface,
                }}
              >
                <ThemedText
                  variant="caption"
                  weight="semibold"
                  style={{
                    color: selected
                      ? theme.colors.colorTextInverse
                      : theme.colors.colorTextPrimary,
                  }}
                >
                  {label}
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
            variant="caption"
            weight="semibold"
            style={{ color: theme.colors.colorTextSecondary }}
          >
            SELECTED DELIVERY SCHEDULE
          </ThemedText>
          <ThemedText
            variant="bodySmall"
            style={{ color: theme.colors.colorTextSecondary }}
          >
            {deliveryCount} delivery days each week
          </ThemedText>
        </View>
        <ThemedText variant="h2">
          ₹{weeklyTotal}
          <ThemedText variant="caption"> / week</ThemedText>
        </ThemedText>
      </View>
    </View>
  );
}
