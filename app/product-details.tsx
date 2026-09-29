import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { Pressable, ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppIcon } from "../src/components/atoms/AppIcon";
import { Button } from "../src/components/atoms/Button";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { NutritionAccordion } from "../src/components/molecules/NutritionAccordion";
import {
  PurchasePlanTabs,
  type PurchasePlan,
} from "../src/components/molecules/PurchasePlanTabs";
import { QuantityStepper } from "../src/components/molecules/QuantityStepper";
import { SubscriptionScheduleConfigurator } from "../src/components/molecules/SubscriptionScheduleConfigurator";
import { StateMessage } from "../src/components/organisms/StateMessage";
import { BackIcon, CalendarIcon, CartIcon } from "../src/icons/appIcons";
import { useProducts } from "../src/hooks/useProducts";
import { useAppStore } from "../src/store/useAppStore";
import { useTheme } from "../src/theme";

export default function ProductDetailsScreen() {
  const theme = useTheme();
  const { productId } = useLocalSearchParams<{ productId?: string }>();
  const id = Array.isArray(productId) ? productId[0] : productId;
  const { data: products = [], isError, isLoading } = useProducts();
  const product = useMemo(
    () => products.find((item) => item.id === id),
    [id, products],
  );
  const [plan, setPlan] = useState<PurchasePlan>("single");
  const [quantity, setQuantity] = useState(1);
  const [slot, setSlot] = useState<"early" | "regular">("early");
  const addToCart = useAppStore((state) => state.addToCart);

  if (isLoading)
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}
      >
        <StateMessage type="loading" title="Loading product" />
      </SafeAreaView>
    );
  if (isError || !product)
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}
      >
        <StateMessage
          type="error"
          title="Product is unavailable"
          description="Please return to products and try again."
        />
      </SafeAreaView>
    );

  const addSelectedQuantity = () => {
    for (let index = 0; index < quantity; index += 1) addToCart(product);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}
    >
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{
            gap: theme.spacing.lg,
            paddingBottom: theme.spacing.xxl,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              height: theme.sizes.productCardImageSize * 3,
              overflow: "hidden",
              backgroundColor: theme.colors.colorPrimaryTint,
            }}
          >
            <Image
              source={{ uri: product.imageUrl ?? undefined }}
              contentFit="cover"
              transition={theme.motion.duration.normal}
              style={{ width: "100%", height: "100%" }}
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Back to products"
              onPress={() => router.back()}
              style={{
                position: "absolute",
                top: theme.spacing.md,
                left: theme.layout.screenHorizontalPadding,
                width: theme.layout.touchTargetMin,
                height: theme.layout.touchTargetMin,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: theme.radii.pill,
                backgroundColor: theme.colors.colorSurface,
              }}
            >
              <AppIcon icon={BackIcon} accessibilityLabel="" size="md" />
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: theme.spacing.xs,
            }}
          >
            <View
              style={{
                width: theme.spacing.lg,
                height: theme.spacing.xs,
                borderRadius: theme.radii.pill,
                backgroundColor: theme.colors.colorPrimary,
              }}
            />
            <View
              style={{
                width: theme.spacing.xs,
                height: theme.spacing.xs,
                borderRadius: theme.radii.pill,
                backgroundColor: theme.colors.colorBorder,
              }}
            />
            <View
              style={{
                width: theme.spacing.xs,
                height: theme.spacing.xs,
                borderRadius: theme.radii.pill,
                backgroundColor: theme.colors.colorBorder,
              }}
            />
          </View>
          <View
            style={{
              gap: theme.spacing.lg,
              paddingHorizontal: theme.layout.screenHorizontalPadding,
            }}
          >
            <ProductSummary
              name={product.name}
              description={product.description}
              price={product.price}
              unit={product.unit}
            />
            <PurchasePlanTabs value={plan} onChange={setPlan} />
            {plan === "trial" ? <TrialPack price={product.price} /> : null}
            {plan === "subscription" ? (
              <SubscriptionScheduleConfigurator
                pricePerDelivery={product.price}
              />
            ) : null}
            <DeliveryDate />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: theme.spacing.md,
                padding: theme.spacing.md,
                borderRadius: theme.radii.lg,
                borderWidth: theme.borderWidths.hairline,
                borderColor: theme.colors.colorBorder,
                backgroundColor: theme.colors.colorSurface,
              }}
            >
              <View style={{ flex: 1 }}>
                <ThemedText variant="body" weight="semibold">
                  Quantity
                </ThemedText>
                <ThemedText
                  variant="caption"
                  style={{ color: theme.colors.colorTextSecondary }}
                >
                  Sanitized glass bottles (1L each)
                </ThemedText>
              </View>
              <QuantityStepper
                value={quantity}
                onDecrement={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
                onIncrement={() => setQuantity((current) => current + 1)}
              />
            </View>
            <View style={{ gap: theme.spacing.sm }}>
              <ThemedText variant="bodySmall" weight="semibold">
                Preferred Morning Delivery Slot
              </ThemedText>
              <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
                <SlotCard
                  active={slot === "early"}
                  title="5:00 AM – 7:00 AM"
                  description="Recommended silent drop"
                  onPress={() => setSlot("early")}
                />
                <SlotCard
                  active={slot === "regular"}
                  title="7:00 AM – 9:00 AM"
                  description="Regular doorstep delivery"
                  onPress={() => setSlot("regular")}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                gap: theme.spacing.md,
                padding: theme.spacing.md,
                borderRadius: theme.radii.lg,
                backgroundColor: theme.colors.colorSurfaceMuted,
              }}
            >
              <AppIcon
                icon={CartIcon}
                accessibilityLabel="Fresh delivery"
                size="sm"
              />
              <ThemedText
                variant="bodySmall"
                style={{ flex: 1, color: theme.colors.colorTextSecondary }}
              >
                No commitment required. Delivered fresh to your doorstep in
                temperature-controlled bags.
              </ThemedText>
            </View>
            <NutritionAccordion
              title="Nutritional Information (per 100ml)"
              content="Energy: 64 kcal • Protein: 3.4g • Fat: 4.2% • Calcium: 120mg • Free from synthetic hormones and preservatives."
            />
          </View>
        </ScrollView>
        <View
          style={{
            gap: theme.spacing.sm,
            paddingHorizontal: theme.layout.screenHorizontalPadding,
            paddingTop: theme.spacing.sm,
            paddingBottom: theme.spacing.md,
            backgroundColor: theme.colors.colorBackground,
          }}
        >
          <Button
            variant="secondary"
            style={{ width: "100%" }}
            onPress={() => {
              addSelectedQuantity();
              router.push("/cart");
            }}
          >
            Buy Now
          </Button>
          <Button
            icon={CartIcon}
            onPress={addSelectedQuantity}
            style={{
              width: "100%",
              backgroundColor: theme.colors.colorPrimary,
            }}
          >
            Add to Cart
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

function ProductSummary({
  description,
  name,
  price,
  unit,
}: {
  description: string;
  name: string;
  price: number;
  unit: string;
}) {
  const theme = useTheme();
  return (
    <View style={{ gap: theme.spacing.sm }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: theme.spacing.md,
        }}
      >
        <View style={{ flex: 1 }}>
          <ThemedText variant="h1">{name}</ThemedText>
          <ThemedText
            variant="bodySmall"
            style={{ color: theme.colors.colorTextSecondary }}
          >
            ₹{price}/{unit} • inclusive of all taxes
          </ThemedText>
        </View>
        <View style={{ alignItems: "flex-end", gap: theme.spacing.xs }}>
          <ThemedText variant="h2" style={{ color: theme.colors.colorPrimary }}>
            ₹{price}
          </ThemedText>
          <View
            style={{
              borderRadius: theme.radii.md,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs,
              backgroundColor: theme.colors.colorPrimaryTint,
            }}
          >
            <ThemedText
              variant="caption"
              weight="semibold"
              style={{ color: theme.colors.colorPrimary }}
            >
              In Stock
            </ThemedText>
          </View>
        </View>
      </View>
      <ThemedText
        variant="bodySmall"
        style={{ color: theme.colors.colorTextSecondary }}
      >
        {description} Rich in natural goodness, delivered fresh before 7 AM.
      </ThemedText>
    </View>
  );
}

function TrialPack({ price }: { price: number }) {
  const theme = useTheme();
  const [trial, setTrial] = useState<"three" | "seven">("three");
  return (
    <View style={{ gap: theme.spacing.sm }}>
      <ThemedText
        variant="caption"
        weight="semibold"
        style={{ color: theme.colors.colorTextSecondary }}
      >
        CHOOSE TRIAL PLAN
      </ThemedText>
      <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
        <PlanOption
          active={trial === "three"}
          title="3-Day Trial"
          description="Quick taste · 3 bottles"
          value={"₹" + price * 3}
          onPress={() => setTrial("three")}
        />
        <PlanOption
          active={trial === "seven"}
          badges={["10% OFF", "MOST POPULAR"]}
          description="Daily morning delivery"
          title="7-Day Trial"
          value={"₹" + price * 7}
          onPress={() => setTrial("seven")}
        />
      </View>
    </View>
  );
}

function SubscriptionOptions() {
  const theme = useTheme();
  const [frequency, setFrequency] = useState<"daily" | "alternate">("daily");
  const [duration, setDuration] = useState<"one" | "until" | "two">("one");
  return (
    <View
      style={{
        gap: theme.spacing.sm,
        padding: theme.spacing.sm,
        borderRadius: theme.radii.lg,
        backgroundColor: theme.colors.colorSurfaceMuted,
      }}
    >
      <ThemedText
        variant="caption"
        weight="semibold"
        style={{ color: theme.colors.colorTextSecondary }}
      >
        DELIVERY FREQUENCY
      </ThemedText>
      <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
        <Pressable
          accessibilityRole="radio"
          accessibilityState={{ selected: frequency === "daily" }}
          onPress={() => setFrequency("daily")}
          style={{
            flex: 1,
            minHeight: theme.layout.touchTargetMin,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: theme.radii.md,
            borderWidth:
              frequency === "daily"
                ? theme.borderWidths.medium
                : theme.borderWidths.hairline,
            borderColor:
              frequency === "daily"
                ? theme.colors.colorPrimary
                : theme.colors.colorBorder,
            backgroundColor: theme.colors.colorSurface,
          }}
        >
          <ThemedText variant="caption" weight="semibold">
            Daily
          </ThemedText>
        </Pressable>
        <Pressable
          accessibilityRole="radio"
          accessibilityState={{ selected: frequency === "alternate" }}
          onPress={() => setFrequency("alternate")}
          style={{
            flex: 1,
            minHeight: theme.layout.touchTargetMin,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: theme.radii.md,
            borderWidth:
              frequency === "alternate"
                ? theme.borderWidths.medium
                : theme.borderWidths.hairline,
            borderColor:
              frequency === "alternate"
                ? theme.colors.colorPrimary
                : theme.colors.colorBorder,
            backgroundColor: theme.colors.colorSurface,
          }}
        >
          <ThemedText variant="caption" weight="semibold">
            Alternate days
          </ThemedText>
        </Pressable>
      </View>
      <View style={{ gap: theme.spacing.xs }}>
        <ThemedText
          variant="caption"
          weight="semibold"
          style={{ color: theme.colors.colorTextSecondary }}
        >
          ACTIVE DELIVERY DAYS
        </ThemedText>
        <View style={{ flexDirection: "row", gap: theme.spacing.xs }}>
          {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
            <View
              key={day + index}
              style={{
                flex: 1,
                minHeight: theme.layout.touchTargetMin,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: theme.radii.md,
                backgroundColor: theme.colors.colorPrimary,
              }}
            >
              <ThemedText
                variant="badgeLabel"
                weight="semibold"
                style={{ color: theme.colors.colorTextInverse }}
              >
                {day}
              </ThemedText>
            </View>
          ))}
        </View>
      </View>
      <View style={{ gap: theme.spacing.xs }}>
        <ThemedText
          variant="caption"
          weight="semibold"
          style={{ color: theme.colors.colorTextSecondary }}
        >
          SUBSCRIPTION DURATION
        </ThemedText>
        <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
          <DurationOption
            active={duration === "one"}
            label="1 Month"
            onPress={() => setDuration("one")}
          />
          <DurationOption
            active={duration === "until"}
            label="Until Pause"
            onPress={() => setDuration("until")}
          />
          <DurationOption
            active={duration === "two"}
            label="2 Weeks"
            onPress={() => setDuration("two")}
          />
        </View>
      </View>
    </View>
  );
}

function DurationOption({
  active,
  label,
  onPress,
}: {
  active: boolean;
  label: string;
  onPress: () => void;
}) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={{
        flex: 1,
        minHeight: theme.layout.touchTargetMin,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: theme.radii.md,
        borderWidth: active
          ? theme.borderWidths.medium
          : theme.borderWidths.hairline,
        borderColor: active
          ? theme.colors.colorPrimary
          : theme.colors.colorBorder,
        backgroundColor: theme.colors.colorSurface,
      }}
    >
      <ThemedText
        variant="caption"
        weight="semibold"
        style={{ textAlign: "center" }}
      >
        {label}
      </ThemedText>
    </Pressable>
  );
}

function DeliveryDate() {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.md,
        padding: theme.spacing.md,
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
          alignItems: "center",
          justifyContent: "center",
          borderRadius: theme.radii.pill,
          backgroundColor: theme.colors.colorSurfaceMuted,
        }}
      >
        <AppIcon
          icon={CalendarIcon}
          accessibilityLabel="Delivery date"
          size="sm"
        />
      </View>
      <View style={{ flex: 1 }}>
        <ThemedText
          variant="caption"
          style={{ color: theme.colors.colorTextSecondary }}
        >
          DELIVERY DATE
        </ThemedText>
        <ThemedText variant="body" weight="semibold">
          Tomorrow, 25 Oct
        </ThemedText>
      </View>
      <View
        style={{
          borderRadius: theme.radii.pill,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          backgroundColor: theme.colors.colorSurfaceMuted,
        }}
      >
        <ThemedText variant="caption" weight="semibold">
          Before 7:00 AM
        </ThemedText>
      </View>
    </View>
  );
}

function PlanOption({
  active,
  badges,
  description,
  onPress,
  title,
  value,
}: {
  active: boolean;
  badges?: string[];
  description: string;
  onPress: () => void;
  title: string;
  value: string;
}) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={{
        flex: 1,
        gap: theme.spacing.xs,
        marginTop: badges ? theme.spacing.xs : theme.spacing.none,
        padding: theme.spacing.md,
        borderRadius: theme.radii.lg,
        borderWidth: active
          ? theme.borderWidths.medium
          : theme.borderWidths.hairline,
        borderColor: active
          ? theme.colors.colorPrimary
          : theme.colors.colorBorder,
        backgroundColor: theme.colors.colorSurface,
      }}
    >
      {badges ? (
        <View
          style={{
            position: "absolute",
            top: -theme.spacing.sm,
            left: theme.spacing.md,
            zIndex: theme.zIndex.card,
            flexDirection: "row",
            gap: theme.spacing.xs,
          }}
        >
          {badges.map((badge, index) => (
            <View
              key={badge}
              style={{
                paddingHorizontal: theme.spacing.xs,
                borderRadius: theme.radii.pill,
                backgroundColor:
                  index === 0
                    ? theme.colors.colorPrimary
                    : theme.colors.colorTextSecondary,
              }}
            >
              <ThemedText
                variant="caption"
                weight="semibold"
                style={{ color: theme.colors.colorTextInverse }}
              >
                {badge}
              </ThemedText>
            </View>
          ))}
        </View>
      ) : null}
      <ThemedText variant="bodySmall" weight="semibold">
        {title}
      </ThemedText>
      <ThemedText
        variant="caption"
        style={{ color: theme.colors.colorTextSecondary }}
      >
        {description}
      </ThemedText>
      <View
        style={{
          height: theme.borderWidths.hairline,
          backgroundColor: theme.colors.colorBorder,
        }}
      />
      <ThemedText variant="body" weight="bold">
        {value}
      </ThemedText>
    </Pressable>
  );
}

function SlotCard({
  active,
  description,
  onPress,
  title,
}: {
  active: boolean;
  description: string;
  onPress: () => void;
  title: string;
}) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={{
        flex: 1,
        gap: theme.spacing.xs,
        padding: theme.spacing.md,
        borderRadius: theme.radii.lg,
        borderWidth: active
          ? theme.borderWidths.medium
          : theme.borderWidths.hairline,
        borderColor: active
          ? theme.colors.colorPrimary
          : theme.colors.colorBorder,
        backgroundColor: theme.colors.colorSurface,
      }}
    >
      <ThemedText variant="bodySmall" weight="semibold">
        {title}
      </ThemedText>
      <ThemedText
        variant="caption"
        style={{ color: theme.colors.colorTextSecondary }}
      >
        {description}
      </ThemedText>
    </Pressable>
  );
}
