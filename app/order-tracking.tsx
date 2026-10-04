import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useTranslation } from "react-i18next";
import { ScrollView, StatusBar, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppIcon } from "../src/components/atoms/AppIcon";
import { Button } from "../src/components/atoms/Button";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { StateMessage } from "../src/components/organisms/StateMessage";
import { OrderStatusBadge } from "../src/components/molecules/OrderStatusBadge";
import {
  BackIcon,
  DownloadIcon,
  LocationIcon,
  PhoneIcon,
  TruckIcon,
} from "../src/icons/appIcons";
import { useOrder } from "../src/hooks/useOrders";
import { useTheme } from "../src/theme";

export default function OrderTrackingScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { orderId } = useLocalSearchParams<{ orderId?: string }>();
  const id = Array.isArray(orderId) ? orderId[0] : orderId;
  const { data: order, isError, isLoading, refetch } = useOrder(id);
  const completedSteps = order?.status === "delivered" ? 4 : order?.status === "out-for-delivery" ? 3 : 0;
  if (isLoading || isError || !order)
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}
      >
        <StateMessage
          type={isError || !order ? "error" : "loading"}
          title={t(isError || !order ? "tracking.unavailable" : "tracking.loading")}
          actionLabel={id && isError ? t("common.retry") : undefined}
          onAction={id && isError ? () => refetch() : undefined}
        />
      </SafeAreaView>
    );
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}
    >
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
      <View
        style={{
          minHeight: theme.sizes.buttonHeight,
          flexDirection: "row",
          alignItems: "center",
          gap: theme.spacing.sm,
          paddingHorizontal: theme.layout.screenHorizontalPadding,
          backgroundColor: theme.colors.colorBackground,
          zIndex: theme.zIndex.stickyHeader,
        }}
      >
        <Pressable
          accessibilityLabel={t("commonActions.back")}
          onPress={() => {
            if (router.canGoBack()) {
              router.back();
            } else {
              router.replace("/orders");
            }
          }}
          style={{
            width: theme.layout.touchTargetMin,
            height: theme.layout.touchTargetMin,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AppIcon icon={BackIcon} accessibilityLabel="" />
        </Pressable>
        <ThemedText variant="body" weight="bold" numberOfLines={2} style={{ flex: 1 }}>
          {t("tracking.title", { number: order.id })}
        </ThemedText>
      </View>
      <ScrollView
        contentContainerStyle={{
          padding: theme.layout.screenHorizontalPadding,
          paddingBottom: theme.spacing.xxl,
          gap: theme.spacing.md,
        }}
      >
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
            style={{ flexDirection: "row", alignItems: "flex-start", gap: theme.spacing.md }}
          >
            <View>
              <OrderStatusBadge status={order.status}>
                  {t(order.status === "confirmed" ? "tracking.confirmedStatus" : "tracking.status")}
              </OrderStatusBadge>
              <ThemedText variant="body" weight="bold" numberOfLines={2} style={{ flexShrink: 1 }}>
                {t("tracking.arriving", { window: order.deliveryWindow })}
              </ThemedText>
              <ThemedText
                variant="caption"
                style={{ color: theme.colors.colorTextSecondary }}
              >
                {t("tracking.silentDrop")}
              </ThemedText>
            </View>
          </View>
          <View style={{ gap: theme.spacing.sm }}>
            {(["packed", "chilled", "onWay", "doorstep"] as const).map(
              (status, index) => (
                <View
                  key={status}
                  style={{
                    minHeight: theme.sizes.avatarSm + theme.spacing.xs,
                    flexDirection: "row",
                    alignItems: "center",
                    gap: theme.spacing.sm,
                  }}
                >
                  <View
                    style={{
                      position: "relative",
                      width: theme.sizes.avatarSm,
                      height: theme.sizes.avatarSm,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: theme.radii.pill,
                      backgroundColor:
                        index < completedSteps
                          ? theme.colors.colorSuccess
                          : theme.colors.colorSurfaceMuted,
                    }}
                  >
                    <AppIcon
                      icon={TruckIcon}
                      accessibilityLabel=""
                      size="sm"
                      tone={index < completedSteps ? "onPrimary" : "disabled"}
                    />
                  </View>
                  <ThemedText
                    variant="caption"
                    weight={index < completedSteps ? "semibold" : "regular"}
                    style={{
                      color: theme.colors.colorTextSecondary,
                      flex: 1,
                    }}
                  >
                    {t(`tracking.steps.${status}`)}
                  </ThemedText>
                  {index < 3 ? (
                    <View
                      style={{
                        position: "absolute",
                        left: theme.sizes.avatarSm / 2 - theme.borderWidths.hairline / 2,
                        top: theme.sizes.avatarSm,
                        width: theme.borderWidths.hairline,
                        height: theme.spacing.sm,
                        backgroundColor: theme.colors.colorBorder,
                      }}
                    />
                  ) : null}
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
              backgroundColor: theme.colors.colorInfoTint,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ThemedText
              variant="caption"
              weight="bold"
              style={{ color: theme.colors.colorInfo }}
            >
              RR
            </ThemedText>
          </View>
          <View style={{ flex: 1 }}>
            <ThemedText variant="bodySmall" weight="semibold">
              {t("tracking.partner")}
            </ThemedText>
            <ThemedText
              variant="caption"
              style={{ color: theme.colors.colorTextSecondary }}
            >
              {t("tracking.partnerDetail")}
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
              accessibilityLabel={t("tracking.callUnavailable")}
              size="sm"
            />
          </View>
        </View>
        <InfoCard
          icon={LocationIcon}
          label={t("tracking.address")}
          value={order.address}
          detail={t("tracking.addressDetail")}
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
            <ThemedText variant="bodySmall" weight="bold" style={{ flex: 1 }}>
              {t("tracking.itemsPayment", { count: order.items.length })}
            </ThemedText>
            <ThemedText
              variant="caption"
              style={{ color: theme.colors.colorTextSecondary, flexShrink: 1, textAlign: "right" }}
            >
              {t("tracking.batch")}
            </ThemedText>
          </View>
          {order.items.map((item, index) => (
            <View
              key={item.name}
              style={{
                flexDirection: "row",
                gap: theme.spacing.sm,
                alignItems: "center",
                paddingTop: index > 0 ? theme.spacing.sm : theme.spacing.xs,
                borderTopWidth: index > 0 ? theme.borderWidths.hairline : theme.borderWidths.none,
                borderTopColor: theme.colors.colorBorder,
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
                <ThemedText variant="caption" weight="semibold" numberOfLines={2} style={{ flexShrink: 1 }}>
                  {item.name}
                </ThemedText>
                <ThemedText
                  variant="caption"
                  style={{ color: theme.colors.colorTextSecondary }}
                >
                  {item.unit} · ×{item.quantity}
                </ThemedText>
              </View>
              <ThemedText variant="caption" weight="semibold" style={{ color: theme.colors.colorTextPrimary }}>
                ₹{item.total}
              </ThemedText>
            </View>
          ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: theme.spacing.md,
            borderRadius: theme.radii.lg,
            backgroundColor: theme.colors.colorSurfaceMuted,
            borderWidth: theme.borderWidths.hairline,
            borderColor: theme.colors.colorBorder,
          }}
        >
          <View style={{ flex: 1, gap: theme.spacing.xs }}>
            <ThemedText variant="caption" weight="semibold" style={{ color: theme.colors.colorTextSecondary }}>
              {t("tracking.paymentPreview")}
            </ThemedText>
            <ThemedText variant="bodySmall" style={{ color: theme.colors.colorTextSecondary }}>
              {t("tracking.prepaid", { total: order.total })}
            </ThemedText>
          </View>
          <ThemedText variant="h2" weight="bold" style={{ color: theme.colors.colorTextPrimary }}>
            ₹{order.total}
          </ThemedText>
        </View>
        <Button disabled variant="secondary" icon={DownloadIcon}>{t("tracking.invoiceUnavailable")}</Button>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: theme.spacing.md,
          }}
        >
          <ThemedText
            variant="caption"
            style={{ color: theme.colors.colorTextSecondary }}
          >
            {t("tracking.reportIssue")}
          </ThemedText>
          <ThemedText
            variant="caption"
            style={{ color: theme.colors.colorTextSecondary }}
          >
            {t("tracking.guidelines")}
          </ThemedText>
        </View>
      </ScrollView>
      </View>
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
        <ThemedText variant="bodySmall" weight="semibold" numberOfLines={2}>
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
