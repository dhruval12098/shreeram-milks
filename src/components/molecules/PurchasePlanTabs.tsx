import { Pressable, View } from "react-native";

import { ThemedText } from "../atoms/ThemedText";
import { useTheme } from "../../theme";

export type PurchasePlan = "single" | "trial" | "subscription";

interface PurchasePlanTabsProps {
  onChange: (plan: PurchasePlan) => void;
  value: PurchasePlan;
}

const plans: { key: PurchasePlan; label: string }[] = [
  { key: "single", label: "Single Day" },
  { key: "trial", label: "Trial Pack" },
  { key: "subscription", label: "Daily Subscription" },
];

export function PurchasePlanTabs({ onChange, value }: PurchasePlanTabsProps) {
  const theme = useTheme();
  return (
    <View
      accessibilityRole="tablist"
      style={{
        flexDirection: "row",
        padding: theme.spacing.xs,
        borderRadius: theme.radii.md,
        borderWidth: theme.borderWidths.hairline,
        borderColor: theme.colors.colorTextSecondary,
        backgroundColor: theme.colors.colorSurfaceMuted,
      }}
    >
      {plans.map((plan) => (
        <Pressable
          key={plan.key}
          accessibilityRole="tab"
          accessibilityState={{ selected: value === plan.key }}
          onPress={() => onChange(plan.key)}
          style={{
            flex: 1,
            minHeight: theme.layout.touchTargetMin,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: theme.radii.sm,
            paddingHorizontal: theme.spacing.xs,
            backgroundColor:
              value === plan.key
                ? theme.colors.colorPrimary
                : theme.colors.colorTransparent,
          }}
        >
          <ThemedText
            variant="caption"
            weight="semibold"
            style={{
              color:
                value === plan.key
                  ? theme.colors.colorTextInverse
                  : theme.colors.colorTextPrimary,
              textAlign: "center",
            }}
          >
            {plan.label}
          </ThemedText>
        </Pressable>
      ))}
    </View>
  );
}
