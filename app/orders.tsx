import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppIcon } from "../src/components/atoms/AppIcon";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { OrderSummaryCard } from "../src/components/molecules/OrderSummaryCard";
import { StateMessage } from "../src/components/organisms/StateMessage";
import { BackIcon, SearchIcon } from "../src/icons/appIcons";
import { useOrders } from "../src/hooks/useOrders";
import { useTheme } from "../src/theme";

type OrderFilter = "all" | "active" | "delivered";

export default function OrdersScreen() {
  const theme = useTheme();
  const { data: orders = [], isError, isLoading } = useOrders();
  const [filter, setFilter] = useState<OrderFilter>("all");
  const filteredOrders = useMemo(
    () =>
      filter === "all"
        ? orders
        : orders.filter((order) =>
            filter === "active"
              ? order.status === "out-for-delivery"
              : order.status === "delivered",
          ),
    [filter, orders],
  );
  if (isLoading || isError)
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}
      >
        <StateMessage
          type={isError ? "error" : "loading"}
          title={isError ? "Could not load orders" : "Loading orders"}
        />
      </SafeAreaView>
    );
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}
    >
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={filteredOrders}
        keyExtractor={(order) => order.id}
        renderItem={({ item }) => (
          <OrderSummaryCard
            order={item}
            onPress={() =>
              router.push({
                pathname: "/order-tracking",
                params: { orderId: item.id },
              })
            }
          />
        )}
        contentContainerStyle={{
          padding: theme.layout.screenHorizontalPadding,
          paddingBottom: theme.spacing.xxl,
          gap: theme.spacing.md,
        }}
        ListHeaderComponent={
          <View style={{ gap: theme.spacing.md }}>
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
              <ThemedText variant="h2" style={{ flex: 1 }}>
                My Orders
              </ThemedText>
              <AppIcon
                icon={SearchIcon}
                accessibilityLabel="Search orders"
                tone="secondary"
              />
            </View>
            <View
              style={{
                padding: theme.spacing.sm,
                borderRadius: theme.radii.md,
                backgroundColor: theme.colors.colorPrimaryTint,
              }}
            >
              <ThemedText
                variant="caption"
                style={{ color: theme.colors.colorPrimary }}
              >
                ● Sunrise delivery arriving tomorrow (5:00 – 7:00 AM)
              </ThemedText>
            </View>
            <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
              {(["all", "active", "delivered"] as OrderFilter[]).map((item) => (
                <Pressable
                  key={item}
                  onPress={() => setFilter(item)}
                  style={{
                    paddingHorizontal: theme.spacing.md,
                    paddingVertical: theme.spacing.sm,
                    borderRadius: theme.radii.pill,
                    backgroundColor:
                      filter === item
                        ? theme.colors.colorPrimary
                        : theme.colors.colorSurfaceMuted,
                  }}
                >
                  <ThemedText
                    variant="caption"
                    weight="semibold"
                    style={{
                      color:
                        filter === item
                          ? theme.colors.colorTextInverse
                          : theme.colors.colorTextPrimary,
                    }}
                  >
                    {item === "all"
                      ? "All"
                      : item === "active"
                        ? "Active"
                        : "Delivered"}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
            <ThemedText
              variant="caption"
              weight="bold"
              style={{ color: theme.colors.colorTextSecondary }}
            >
              CURRENT ORDER
            </ThemedText>
          </View>
        }
      />
    </SafeAreaView>
  );
}
