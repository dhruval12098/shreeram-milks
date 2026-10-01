import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import { AppIcon } from "../atoms/AppIcon";
import { ThemedText } from "../atoms/ThemedText";
import { BackIcon } from "../../icons/appIcons";
import { useTheme } from "../../theme";

interface CheckoutProgressProps {
  step: 1 | 2 | 3;
  title: string;
}
export function CheckoutProgress({ step, title }: CheckoutProgressProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const labels = [
    t("checkout.progress.address"),
    t("checkout.progress.review"),
    t("checkout.progress.payment"),
  ];
  return (
    <View style={{ gap: theme.spacing.sm }}>
      <View
        style={{
          minHeight: theme.sizes.buttonHeight,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable
          accessibilityLabel={t("commonActions.back")}
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
      <View style={{ gap: theme.spacing.sm }}>
        <View style={{ flexDirection: "row", gap: theme.spacing.xs }}>
          {labels.map((label, index) => (
            <View
              key={label}
              style={{
                flex: 1,
                height: theme.borderWidths.medium,
                borderRadius: theme.radii.pill,
                backgroundColor:
                  index + 1 <= step
                    ? theme.colors.colorPrimary
                    : theme.colors.colorBorder,
              }}
            />
          ))}
        </View>
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
                <ThemedText variant="caption" weight="bold" style={{ color: index + 1 <= step ? theme.colors.colorTextInverse : theme.colors.colorTextSecondary }}>
                  {index + 1 < step ? "✓" : index + 1}
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
