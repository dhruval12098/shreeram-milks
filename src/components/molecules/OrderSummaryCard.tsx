import { Image } from "expo-image";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, Easing, Pressable, View } from "react-native";

import { AppIcon } from "../atoms/AppIcon";
import { ThemedText } from "../atoms/ThemedText";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { ForwardIcon, TruckIcon } from "../../icons/appIcons";
import type { Order } from "../../types/models";
import { useTheme } from "../../theme";

interface OrderSummaryCardProps {
  onPress: () => void;
  order: Order;
}

export function OrderSummaryCard({ onPress, order }: OrderSummaryCardProps) {
  const theme = useTheme();
  const { t } = useTranslation();
  const item = order.items[0];
  const active = order.status !== "delivered";
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
        accessibilityRole="button"
        accessibilityLabel={t("orders.orderLabel", { number: order.id })}
        onPress={onPress}
        onPressIn={() => animateScale(theme.motion.pressScale.card)}
        onPressOut={() => animateScale(1)}
        style={({ pressed }) => ({
          padding: theme.spacing.sm,
          gap: theme.spacing.sm,
          borderRadius: theme.radii.lg,
          borderWidth: theme.borderWidths.hairline,
          borderColor: theme.colors.colorBorder,
          backgroundColor: theme.colors.colorSurface,
          opacity: pressed ? theme.opacity.subdued : theme.opacity.full,
        })}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: theme.spacing.xs }}>
            <ThemedText variant="caption" weight="bold">
              #{order.id}
            </ThemedText>
            <ThemedText
              variant="caption"
              style={{ color: theme.colors.colorTextSecondary }}
            >
              • {order.placedAt}
            </ThemedText>
          </View>
          <OrderStatusBadge status={order.status}>
            {t(`orders.status.${order.status}`)}
          </OrderStatusBadge>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing.sm,
          }}
        >
          <Image
            source={{ uri: item.imageUrl ?? undefined }}
            contentFit="cover"
            style={{
              width: theme.sizes.avatarLg,
              height: theme.sizes.avatarLg,
              borderRadius: theme.radii.md,
            }}
          />
          <View style={{ flex: 1 }}>
            <ThemedText variant="bodySmall" weight="semibold" numberOfLines={1}>
              {item.name}
            </ThemedText>
            <ThemedText
              variant="caption"
              style={{ color: theme.colors.colorTextSecondary }}
              numberOfLines={1}
            >
              {item.unit} ·{" "}
              {t("orders.itemCount", { count: order.items.length })}
            </ThemedText>
          </View>
          <ThemedText variant="bodySmall" weight="bold">
            ₹{order.total}
          </ThemedText>
        </View>
        <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
          <View
            style={{
              flex: 1,
              minHeight: theme.layout.touchTargetMin,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: theme.spacing.xs,
              borderRadius: theme.radii.md,
              backgroundColor: theme.colors.colorPrimary,
            }}
          >
            <AppIcon
              icon={TruckIcon}
              accessibilityLabel=""
              size="sm"
              tone="onPrimary"
            />
            <ThemedText
              variant="caption"
              weight="semibold"
              style={{ color: theme.colors.colorTextInverse }}
            >
              {active ? "Track" : "Repeat"}
            </ThemedText>
          </View>
          <View
            style={{
              width: theme.layout.touchTargetMin,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: theme.radii.md,
              backgroundColor: theme.colors.colorSurfaceMuted,
            }}
          >
            <AppIcon
              icon={ForwardIcon}
              accessibilityLabel=""
              size="sm"
              tone="secondary"
            />
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
