import { router } from "expo-router";
import { Pressable, View } from "react-native";
import { AppIcon } from "../atoms/AppIcon";
import { ThemedText } from "../atoms/ThemedText";
import { BackIcon } from "../../icons/appIcons";
import { useTheme } from "../../theme";

interface CheckoutProgressProps {
  step: 1 | 2 | 3;
  title: string;
}
const labels = ["Address", "Review", "Payment"];
export function CheckoutProgress({ step, title }: CheckoutProgressProps) {
  const theme = useTheme();
  return (
    <View style={{ gap: theme.spacing.md }}>
      <View
        style={{
          minHeight: theme.sizes.buttonHeight,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable
          accessibilityLabel="Back"
          onPress={() => router.back()}
          style={{
            position: "absolute",
            left: theme.spacing.none,
            width: theme.layout.touchTargetMin,
            height: theme.layout.touchTargetMin,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppIcon icon={BackIcon} accessibilityLabel="" />
        </Pressable>
        <ThemedText variant="body" weight="bold">
          {title}
        </ThemedText>
      </View>
      <View
        style={{
          gap: theme.spacing.xs,
          padding: theme.spacing.md,
          borderRadius: theme.radii.md,
          backgroundColor: theme.colors.colorSurfaceMuted,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing.sm,
          }}
        >
          {labels.map((label, index) => (
            <View
              key={label}
              style={{ flex: 1, gap: theme.spacing.xs, alignItems: "center" }}
            >
              <View
                style={{
                  width: theme.sizes.avatarSm,
                  height: theme.sizes.avatarSm,
                  borderRadius: theme.radii.pill,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor:
                    index + 1 <= step
                      ? theme.colors.colorPrimary
                      : theme.colors.colorBorder,
                }}
              >
                <ThemedText
                  variant="caption"
                  weight="bold"
                  style={{
                    color:
                      index + 1 <= step
                        ? theme.colors.colorTextInverse
                        : theme.colors.colorTextSecondary,
                  }}
                >
                  {index + 1}
                </ThemedText>
              </View>
              <ThemedText
                variant="caption"
                weight="semibold"
                style={{
                  color:
                    index + 1 === step
                      ? theme.colors.colorPrimary
                      : theme.colors.colorTextSecondary,
                }}
              >
                {label}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
