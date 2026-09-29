import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, StatusBar, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppIcon } from "../src/components/atoms/AppIcon";
import { Button } from "../src/components/atoms/Button";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { StateMessage } from "../src/components/organisms/StateMessage";
import {
  BackIcon,
  CalendarIcon,
  DownloadIcon,
  LocationIcon,
  PhoneIcon,
  TruckIcon,
} from "../src/icons/appIcons";
import { useOrder } from "../src/hooks/useOrders";
import { useTheme } from "../src/theme";

export default function OrderTrackingScreen() {
  const theme = useTheme();
  const { orderId } = useLocalSearchParams<{ orderId?: string }>();
  const id = Array.isArray(orderId) ? orderId[0] : orderId;
  const { data: order, isError, isLoading } = useOrder(id);
  if (isLoading || isError || !order)
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}
      >
        <StateMessage
          type={isError || !order ? "error" : "loading"}
          title={isError || !order ? "Order is unavailable" : "Loading order"}
        />
      </SafeAreaView>
    );
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}
    >
      <StatusBar barStyle="dark-content" />
      <ScrollView
        contentContainerStyle={{
          padding: theme.layout.screenHorizontalPadding,
          paddingBottom: theme.spacing.xxl,
          gap: theme.spacing.md,
        }}
      >
        <View
          style={{
            minHeight: theme.sizes.buttonHeight,
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing.sm,
          }}
        >
          <Pressable
            accessibilityLabel="Back"
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
          <ThemedText variant="body" weight="bold" style={{ flex: 1 }}>
            Track Order #{order.id}
          </ThemedText>
        </View>
        <View
          style={{
            padding: theme.spacing.md,
            gap: theme.spacing.md,
            borderRadius: theme.radii.lg,
            borderWidth: theme.borderWidths.hairline,
            borderColor: theme.colors.colorBorder,
            backgroundColor: theme.colors.colorSurface,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View>
              <ThemedText
                variant="caption"
                weight="semibold"
                style={{ color: theme.colors.colorPrimary }}
              >
                OUT FOR DAWN TRANSIT
              </ThemedText>
              <ThemedText variant="h2">
                Arriving {order.deliveryWindow}
              </ThemedText>
              <ThemedText
                variant="caption"
                style={{ color: theme.colors.colorTextSecondary }}
              >
                Silent doorstep drop guaranteed
              </ThemedText>
            </View>
            <View
              style={{
                alignSelf: "flex-start",
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: theme.spacing.xs,
                borderRadius: theme.radii.pill,
                backgroundColor: theme.colors.colorPrimaryTint,
              }}
            >
              <ThemedText
                variant="caption"
                weight="semibold"
                style={{ color: theme.colors.colorPrimary }}
              >
                Prepaid · ₹{order.total}
              </ThemedText>
            </View>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {["Packed", "Chilled & Tested", "On Way", "Doorstep"].map(
              (status, index) => (
                <View
                  key={status}
                  style={{
                    flex: 1,
                    alignItems: "center",
                    gap: theme.spacing.xs,
                  }}
                >
                  <View
                    style={{
                      width: theme.sizes.avatarSm,
                      height: theme.sizes.avatarSm,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: theme.radii.pill,
                      backgroundColor:
                        index < 3
                          ? theme.colors.colorPrimary
                          : theme.colors.colorSurfaceMuted,
                    }}
                  >
                    <AppIcon
                      icon={TruckIcon}
                      accessibilityLabel=""
                      size="sm"
                      tone={index < 3 ? "onPrimary" : "disabled"}
                    />
                  </View>
                  <ThemedText
                    variant="caption"
                    style={{
                      color: theme.colors.colorTextSecondary,
                      textAlign: "center",
                    }}
                  >
                    {status}
                  </ThemedText>
                </View>
              ),
            )}
          </View>
        </View>
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
          <View
            style={{
              width: theme.sizes.avatarMd,
              height: theme.sizes.avatarMd,
              borderRadius: theme.radii.pill,
              backgroundColor: theme.colors.colorPrimaryTint,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ThemedText
              variant="caption"
              weight="bold"
              style={{ color: theme.colors.colorPrimary }}
            >
              RR
            </ThemedText>
          </View>
          <View style={{ flex: 1 }}>
            <ThemedText variant="bodySmall" weight="semibold">
              Ramesh Rathod
            </ThemedText>
            <ThemedText
              variant="caption"
              style={{ color: theme.colors.colorTextSecondary }}
            >
              Rider · White Maruti · Near gate drop
            </ThemedText>
          </View>
          <View
            style={{
              width: theme.layout.touchTargetMin,
              height: theme.layout.touchTargetMin,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: theme.radii.pill,
              backgroundColor: theme.colors.colorSurfaceMuted,
            }}
          >
            <AppIcon
              icon={PhoneIcon}
              accessibilityLabel="Call delivery partner"
              size="sm"
            />
          </View>
        </View>
        <InfoCard
          icon={LocationIcon}
          label="DELIVERY ADDRESS"
          value={order.address}
          detail="Leave in porch basket · Edit Note"
        />
        <View
          style={{
            padding: theme.spacing.md,
            gap: theme.spacing.sm,
            borderRadius: theme.radii.lg,
            borderWidth: theme.borderWidths.hairline,
            borderColor: theme.colors.colorBorder,
            backgroundColor: theme.colors.colorSurface,
          }}
        >
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ThemedText variant="bodySmall" weight="bold">
              Items & Payment ({order.items.length})
            </ThemedText>
            <ThemedText
              variant="caption"
              style={{ color: theme.colors.colorTextSecondary }}
            >
              Batch #GIR-09
            </ThemedText>
          </View>
          {order.items.map((item) => (
            <View
              key={item.name}
              style={{
                flexDirection: "row",
                gap: theme.spacing.sm,
                alignItems: "center",
              }}
            >
              <Image
                source={{ uri: item.imageUrl ?? undefined }}
                contentFit="cover"
                style={{
                  width: theme.sizes.avatarMd,
                  height: theme.sizes.avatarMd,
                  borderRadius: theme.radii.md,
                }}
              />
              <View style={{ flex: 1 }}>
                <ThemedText variant="caption" weight="semibold">
                  {item.name}
                </ThemedText>
                <ThemedText
                  variant="caption"
                  style={{ color: theme.colors.colorTextSecondary }}
                >
                  {item.unit} · ×{item.quantity}
                </ThemedText>
              </View>
              <ThemedText variant="caption" weight="semibold">
                ₹{item.total}
              </ThemedText>
            </View>
          ))}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingTop: theme.spacing.sm,
            }}
          >
            <ThemedText variant="bodySmall">Paid via PhonePe UPI</ThemedText>
            <ThemedText variant="body" weight="bold">
              ₹{order.total}
            </ThemedText>
          </View>
        </View>
        <Button icon={DownloadIcon}>Download Invoice (PDF)</Button>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: theme.spacing.md,
          }}
        >
          <ThemedText
            variant="caption"
            style={{ color: theme.colors.colorTextSecondary }}
          >
            Report an issue
          </ThemedText>
          <ThemedText
            variant="caption"
            style={{ color: theme.colors.colorTextSecondary }}
          >
            Delivery Guidelines
          </ThemedText>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function InfoCard({
  detail,
  icon,
  label,
  value,
}: {
  detail: string;
  icon: typeof LocationIcon;
  label: string;
  value: string;
}) {
  const theme = useTheme();
  return (
    <View
      style={{
        padding: theme.spacing.md,
        flexDirection: "row",
        gap: theme.spacing.sm,
        borderRadius: theme.radii.lg,
        borderWidth: theme.borderWidths.hairline,
        borderColor: theme.colors.colorBorder,
        backgroundColor: theme.colors.colorSurface,
      }}
    >
      <AppIcon icon={icon} accessibilityLabel="" size="sm" />
      <View style={{ flex: 1 }}>
        <ThemedText
          variant="caption"
          weight="semibold"
          style={{ color: theme.colors.colorTextSecondary }}
        >
          {label}
        </ThemedText>
        <ThemedText variant="bodySmall" weight="semibold">
          {value}
        </ThemedText>
        <ThemedText
          variant="caption"
          style={{ color: theme.colors.colorTextSecondary }}
        >
          {detail}
        </ThemedText>
      </View>
    </View>
  );
}
