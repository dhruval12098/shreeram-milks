import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppIcon } from "../src/components/atoms/AppIcon";
import { Button } from "../src/components/atoms/Button";
import { IconButton } from "../src/components/atoms/IconButton";
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
  const { t } = useTranslation();
  const { productId } = useLocalSearchParams<{ productId?: string }>();
  const id = Array.isArray(productId) ? productId[0] : productId;
  const { data: products = [], isError, isLoading, refetch } = useProducts();
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
        <StateMessage type="loading" title={t("productDetails.loading")} />
      </SafeAreaView>
    );
  if (isError || !product)
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}
      >
        <StateMessage
          type="error"
          title={t("productDetails.unavailableTitle")}
          description={t("productDetails.unavailableDetail")}
          actionLabel={isError ? t("common.retry") : undefined}
          onAction={isError ? () => refetch() : undefined}
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
            <View
              style={{
                position: "absolute",
                top: theme.spacing.md,
                left: theme.layout.screenHorizontalPadding,
                backgroundColor: theme.colors.colorSurface,
                borderRadius: theme.radii.md,
              }}
            >
              <IconButton icon={BackIcon} label={t("productDetails.back")} onPress={() => router.back()} />
            </View>
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
              isAvailable={product.isAvailable}
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
                  {t("productDetails.quantity")}
                </ThemedText>
                <ThemedText
                  variant="caption"
                  style={{ color: theme.colors.colorTextSecondary }}
                >
                  {t("productDetails.bottleHint")}
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
                {t("productDetails.slotTitle")}
              </ThemedText>
              <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
                <SlotCard
                  active={slot === "early"}
                  title={t("productDetails.earlySlot")}
                  description={t("productDetails.earlySlotDetail")}
                  onPress={() => setSlot("early")}
                />
                <SlotCard
                  active={slot === "regular"}
                  title={t("productDetails.regularSlot")}
                  description={t("productDetails.regularSlotDetail")}
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
                accessibilityLabel={t("productDetails.freshDelivery")}
                size="sm"
              />
              <ThemedText
                variant="bodySmall"
                style={{ flex: 1, color: theme.colors.colorTextSecondary }}
              >
                {t("productDetails.deliveryReassurance")}
              </ThemedText>
            </View>
            <NutritionAccordion
              title={t("productDetails.nutritionTitle")}
              content={t("productDetails.nutritionContent")}
            />
          </View>
        </ScrollView>
        <View
          style={{
            flexDirection: "row",
            gap: theme.spacing.sm,
            paddingHorizontal: theme.layout.screenHorizontalPadding,
            paddingTop: theme.spacing.sm,
            paddingBottom: theme.spacing.md,
            backgroundColor: theme.colors.colorBackground,
          }}
        >
          <Button
            icon={CartIcon}
            variant="secondary"
            style={{ flex: 1 }}
            onPress={() => {
              addSelectedQuantity();
            }}
          >
            {t("productDetails.addToCart")}
          </Button>
          <Button
            style={{ flex: 1 }}
            onPress={addSelectedQuantity}
          >
            {t("productDetails.buyNow")}
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
  isAvailable,
}: {
  description: string;
  name: string;
  price: number;
  unit: string;
  isAvailable: boolean;
}) {
  const theme = useTheme();
  const { t } = useTranslation();
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
            {t("productDetails.inclusiveTaxes", { price, unit })}
          </ThemedText>
        </View>
        <View style={{ alignItems: "flex-end", gap: theme.spacing.xs }}>
          <ThemedText variant="h2">
            ₹{price}
          </ThemedText>
          <View
            style={{
              borderRadius: theme.radii.md,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs,
              backgroundColor: isAvailable
                ? theme.colors.colorSuccessTint
                : theme.colors.colorDangerTint,
            }}
          >
            <ThemedText
              variant="caption"
              weight="semibold"
              style={{
                color: isAvailable
                  ? theme.colors.colorSuccess
                  : theme.colors.colorDanger,
              }}
            >
              {t(isAvailable ? "productDetails.inStock" : "productDetails.outOfStock")}
            </ThemedText>
          </View>
        </View>
      </View>
      <ThemedText
        variant="bodySmall"
        style={{ color: theme.colors.colorTextSecondary }}
      >
        {t("productDetails.productDescription", { description })}
      </ThemedText>
    </View>
  );
}

function TrialPack({ price }: { price: number }) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [trial, setTrial] = useState<"three" | "seven">("three");
  return (
    <View style={{ gap: theme.spacing.sm }}>
      <ThemedText
        variant="caption"
        weight="semibold"
        style={{ color: theme.colors.colorTextSecondary }}
      >
        {t("productDetails.trialLabel")}
      </ThemedText>
      <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
        <PlanOption
          active={trial === "three"}
          title={t("productDetails.threeDayTrial")}
          description={t("productDetails.threeDayDetail")}
          value={"₹" + price * 3}
          onPress={() => setTrial("three")}
        />
        <PlanOption
          active={trial === "seven"}
          badges={[t("productDetails.discount")]}
          description={t("productDetails.sevenDayDetail")}
          title={t("productDetails.sevenDayTrial")}
          value={"₹" + price * 7}
          onPress={() => setTrial("seven")}
        />
      </View>
    </View>
  );
}

function DeliveryDate() {
  const theme = useTheme();
  const { t } = useTranslation();
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
          accessibilityLabel={t("productDetails.deliveryDate")}
          size="sm"
        />
      </View>
      <View style={{ flex: 1 }}>
        <ThemedText
          variant="caption"
          style={{ color: theme.colors.colorTextSecondary }}
        >
          {t("productDetails.deliveryDate")}
        </ThemedText>
        <ThemedText variant="body" weight="semibold">
          {t("productDetails.tomorrow")}
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
          {t("productDetails.beforeSeven")}
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
          ? theme.borderWidths.none
          : theme.borderWidths.hairline,
        borderColor: theme.colors.colorBorder,
        backgroundColor: active
          ? theme.colors.colorPrimaryTint
          : theme.colors.colorSurface,
      }}
    >
      {badges ? (
        <View
          style={{
            position: "absolute",
            top: -theme.spacing.sm,
            left: 0,
            right: 0,
            zIndex: theme.zIndex.card,
            flexDirection: "row",
            justifyContent: "center",
            gap: theme.spacing.xs,
          }}
        >
          {badges.map((badge, index) => (
            <View
              key={badge}
              style={{
                paddingHorizontal: theme.spacing.sm,
                borderRadius: theme.radii.pill,
                backgroundColor:
                  index === 0
                    ? theme.colors.colorPrimary
                    : theme.colors.colorTextSecondary,
              }}
            >
              <ThemedText
                variant="badgeLabel"
                weight="semibold"
                style={{ color: theme.colors.colorTextInverse }}
              >
                {badge}
              </ThemedText>
            </View>
          ))}
        </View>
      ) : null}
      <ThemedText
        variant="bodySmall"
        weight="semibold"
        style={{ color: theme.colors.colorTextPrimary }}
      >
        {title}
      </ThemedText>
      <ThemedText
        variant="caption"
        style={{
          color: theme.colors.colorTextSecondary,
        }}
      >
        {description}
      </ThemedText>
      <View
        style={{
          height: theme.borderWidths.hairline,
          backgroundColor: theme.colors.colorBorder,
        }}
      />
      <ThemedText
        variant="body"
        weight="bold"
        style={{ color: theme.colors.colorTextPrimary }}
      >
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
