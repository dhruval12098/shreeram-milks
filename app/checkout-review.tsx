import { router } from "expo-router";
import { FlatList, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckoutProgress } from "../src/components/molecules/CheckoutProgress";
import { CheckoutFooter } from "../src/components/organisms/CheckoutFooter";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { useAppStore } from "../src/store/useAppStore";
import { useTheme } from "../src/theme";
export default function CheckoutReviewScreen() {
  const theme = useTheme();
  const cart = useAppStore((s) => s.cart);
  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}
    >
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={cart}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={{
          padding: theme.layout.screenHorizontalPadding,
          paddingBottom: theme.spacing.xxl,
          gap: theme.spacing.sm,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: theme.spacing.md,
              borderRadius: theme.radii.md,
              backgroundColor: theme.colors.colorSurface,
            }}
          >
            <View style={{ flex: 1 }}>
              <ThemedText variant="bodySmall" weight="semibold">
                {item.product.name}
              </ThemedText>
              <ThemedText
                variant="caption"
                style={{ color: theme.colors.colorTextSecondary }}
              >
                {item.quantity} × {item.product.unit}
              </ThemedText>
            </View>
            <ThemedText variant="bodySmall" weight="bold">
              ₹{item.product.price * item.quantity}
            </ThemedText>
          </View>
        )}
        ListHeaderComponent={
          <View
            style={{ gap: theme.spacing.lg, paddingBottom: theme.spacing.md }}
          >
            <CheckoutProgress step={2} title="Order Review" />
            <View
              style={{
                padding: theme.spacing.md,
                gap: theme.spacing.xs,
                borderRadius: theme.radii.lg,
                backgroundColor: theme.colors.colorSurface,
              }}
            >
              <ThemedText variant="body" weight="bold">
                Delivering to Home
              </ThemedText>
              <ThemedText
                variant="caption"
                style={{ color: theme.colors.colorTextSecondary }}
              >
                Flat 402, Greenfield Apts · Tomorrow, 5:30 AM – 7:00 AM
              </ThemedText>
            </View>
            <View
              style={{
                padding: theme.spacing.md,
                gap: theme.spacing.sm,
                borderRadius: theme.radii.lg,
                backgroundColor: theme.colors.colorSurface,
              }}
            >
              <ThemedText variant="body" weight="bold">
                Bill Summary
              </ThemedText>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <ThemedText variant="bodySmall">Item Total</ThemedText>
                <ThemedText variant="bodySmall">₹{total}</ThemedText>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <ThemedText variant="bodySmall">Dawn delivery</ThemedText>
                <ThemedText
                  variant="bodySmall"
                  style={{ color: theme.colors.colorPrimary }}
                >
                  FREE
                </ThemedText>
              </View>
            </View>
            <ThemedText variant="bodySmall" weight="semibold">
              Deliveries in This Order
            </ThemedText>
          </View>
        }
      />
      <CheckoutFooter
        amount={total}
        label="Proceed to Payment"
        onPress={() => router.push("/checkout-payment")}
      />
    </SafeAreaView>
  );
}
