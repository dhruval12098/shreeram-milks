import { router } from "expo-router";
import { ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CheckoutProgress } from "../src/components/molecules/CheckoutProgress";
import { DeliverySlotCard } from "../src/components/molecules/DeliverySlotCard";
import { CheckoutFooter } from "../src/components/organisms/CheckoutFooter";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { useAppStore } from "../src/store/useAppStore";
import { useTheme } from "../src/theme";
export default function CheckoutAddressScreen() {
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
      <ScrollView
        contentContainerStyle={{
          gap: theme.spacing.lg,
          padding: theme.layout.screenHorizontalPadding,
          paddingBottom: theme.spacing.xxl,
        }}
      >
        <CheckoutProgress step={1} title="Address & Slot" />
        <View
          style={{
            padding: theme.spacing.md,
            gap: theme.spacing.sm,
            borderRadius: theme.radii.lg,
            backgroundColor: theme.colors.colorSurface,
          }}
        >
          <ThemedText variant="body" weight="bold">
            Farm Batch #289
          </ThemedText>
          <ThemedText
            variant="caption"
            style={{ color: theme.colors.colorTextSecondary }}
          >
            Packed 3:30 AM from Satara Gausala · Guaranteed chilled
          </ThemedText>
        </View>
        <View style={{ gap: theme.spacing.sm }}>
          <ThemedText variant="bodySmall" weight="semibold">
            Saved Delivery Addresses
          </ThemedText>
          <View
            style={{
              padding: theme.spacing.md,
              gap: theme.spacing.xs,
              borderRadius: theme.radii.lg,
              borderWidth: theme.borderWidths.medium,
              borderColor: theme.colors.colorPrimary,
              backgroundColor: theme.colors.colorSurface,
            }}
          >
            <ThemedText variant="bodySmall" weight="bold">
              Home · Default
            </ThemedText>
            <ThemedText
              variant="caption"
              style={{ color: theme.colors.colorTextSecondary }}
            >
              Flat 402, Greenfield Apts, Near Old Toll Naka, Satara – 415001
            </ThemedText>
          </View>
        </View>
        <View style={{ gap: theme.spacing.sm }}>
          <ThemedText variant="bodySmall" weight="semibold">
            Select Morning Delivery Slot
          </ThemedText>
          <DeliverySlotCard
            selected
            label="5:30 AM – 7:00 AM"
            description="Silent porch drop · Recommended"
          />
          <DeliverySlotCard
            label="7:00 AM – 8:30 AM"
            description="Standard morning handover"
          />
        </View>
      </ScrollView>
      <CheckoutFooter
        amount={total}
        label="Continue to Review"
        onPress={() => router.push("/checkout-review")}
      />
    </SafeAreaView>
  );
}
