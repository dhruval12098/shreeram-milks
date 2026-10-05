import { useState } from "react";
import { Animated, Easing, Pressable, View } from "react-native";
import { useTranslation } from "react-i18next";
import { AppIcon } from "../atoms/AppIcon";
import { ThemedText } from "../atoms/ThemedText";
import { CalendarIcon } from "../../icons/appIcons";
import { useTheme } from "../../theme";
interface DeliverySlotCardProps {
  description: string;
  label: string;
  onPress?: () => void;
  selected?: boolean;
}
export function DeliverySlotCard({
  description,
  label,
  onPress,
  selected = false,
}: DeliverySlotCardProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [scale] = useState(() => new Animated.Value(1));
  const animateScale = (toValue: number) =>
    Animated.timing(scale, {
      toValue,
      duration: theme.motion.duration.fast,
      easing: Easing.bezier(...theme.motion.easing.standard),
      useNativeDriver: true,
    }).start();
  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        accessibilityRole="radio"
        accessibilityState={{ selected }}
        onPress={onPress}
        onPressIn={() => animateScale(theme.motion.pressScale.card)}
        onPressOut={() => animateScale(1)}
        style={({ pressed }) => ({
          minHeight: theme.sizes.slotCardHeight,
          borderRadius: theme.radii.md,
          borderWidth: selected
            ? theme.borderWidths.medium
            : theme.borderWidths.hairline,
          borderColor: selected
            ? theme.colors.colorPrimary
            : theme.colors.colorBorder,
          padding: theme.spacing.md,
          backgroundColor: selected
            ? theme.colors.colorPrimaryTint
            : theme.colors.colorSurface,
          opacity: pressed ? theme.opacity.subdued : theme.opacity.full,
        })}
      >
        <View
          style={{
            flexDirection: "row",
            gap: theme.spacing.sm,
            alignItems: "center",
          }}
        >
          <AppIcon
            icon={CalendarIcon}
            accessibilityLabel={t("deliverySlot.title")}
            size="sm"
            tone={selected ? "primary" : "secondary"}
          />
          <View style={{ flex: 1 }}>
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
          <View
            accessible={false}
            style={{
              width: theme.spacing.md,
              height: theme.spacing.md,
              borderRadius: theme.radii.pill,
              borderWidth: theme.borderWidths.medium,
              borderColor: selected
                ? theme.colors.colorPrimary
                : theme.colors.colorBorder,
              backgroundColor: selected
                ? theme.colors.colorPrimary
                : theme.colors.colorSurface,
            }}
          />
        </View>
      </Pressable>
    </Animated.View>
  );
}
