import { Image } from "expo-image";
import { router } from "expo-router";
import { memo, useCallback, useMemo, useState } from "react";
import { FlatList, Pressable, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppIcon } from "../src/components/atoms/AppIcon";
import { Button } from "../src/components/atoms/Button";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { BottomNavigation } from "../src/components/organisms/BottomNavigation";
import { ProductCard } from "../src/components/organisms/ProductCard";
import { useProducts } from "../src/hooks/useProducts";
import {
  CalendarIcon,
  CartIcon,
  HomeIcon,
  NotificationIcon,
  ProductsIcon,
  ProfileIcon,
} from "../src/icons/appIcons";
import { useAppStore } from "../src/store/useAppStore";
import { useTheme } from "../src/theme";
import type { Product } from "../src/types/models";

type Tab = "active" | "paused" | "ended";

interface Subscription {
  id: string;
  imageUrl: string;
  name: string;
  nextDelivery: string;
  price: number;
  tag: string;
}

const activeSubscriptions: Subscription[] = [
  {
    id: "a2-cow-milk",
    name: "A2 Desi Gir Cow Milk",
    tag: "Daily Subscription",
    nextDelivery: "Tomorrow, 25 Oct",
    price: 85,
    imageUrl:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "buffalo-milk",
    name: "Farm Fresh Buffalo Milk",
    tag: "Daily Subscription",
    nextDelivery: "Tomorrow, 25 Oct",
    price: 95,
    imageUrl:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=500&q=80&sat=-20",
  },
  {
    id: "premium-curd",
    name: "Organic Set Dahi (Clay Pot)",
    tag: "Trial Pack",
    nextDelivery: "Thu, 26 Oct",
    price: 65,
    imageUrl:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=80",
  },
];

const tabLabels: { key: Tab; label: string }[] = [
  { key: "active", label: "Active (3)" },
  { key: "paused", label: "Paused (0)" },
  { key: "ended", label: "Ended" },
];

const SubscriptionCard = memo(function SubscriptionCard({
  subscription,
}: {
  subscription: Subscription;
}) {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          minHeight:
            theme.sizes.productCardImageSize +
            theme.sizes.buttonHeight +
            theme.spacing.lg +
            theme.spacing.md,
          gap: theme.spacing.xs,
          padding: theme.spacing.sm,
          justifyContent: "space-between",
          borderRadius: theme.radii.lg,
          backgroundColor: theme.colors.colorSurface,
        },
        theme.elevation.card,
      ]}
    >
      <View style={{ flexDirection: "row", gap: theme.spacing.md }}>
        <View
          style={{
            width: theme.sizes.productCardImageSize,
            height: theme.sizes.productCardImageSize,
            overflow: "hidden",
            borderRadius: theme.radii.md,
            backgroundColor: theme.colors.colorPrimaryTint,
          }}
        >
          <Image
            source={{ uri: subscription.imageUrl }}
            contentFit="cover"
            transition={theme.motion.duration.normal}
            style={{ width: "100%", height: "100%" }}
          />
        </View>
        <View style={{ flex: 1, gap: theme.spacing.xs }}>
          <View
            style={{
              alignSelf: "flex-start",
              borderRadius: theme.radii.pill,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs,
              backgroundColor:
                subscription.tag === "Trial Pack"
                  ? theme.colors.colorSurfaceMuted
                  : theme.colors.colorPrimaryTint,
            }}
          >
            <ThemedText
              variant="caption"
              weight="semibold"
              style={{
                color:
                  subscription.tag === "Trial Pack"
                    ? theme.colors.colorTextSecondary
                    : theme.colors.colorPrimary,
              }}
            >
              ● {subscription.tag}
            </ThemedText>
          </View>
          <ThemedText variant="body" weight="semibold" numberOfLines={2}>
            {subscription.name}
          </ThemedText>
          <ThemedText
            variant="caption"
            style={{ color: theme.colors.colorTextSecondary }}
          >
            ▣ Next delivery: {subscription.nextDelivery}
          </ThemedText>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          gap: theme.spacing.md,
        }}
      >
        <View style={{ width: theme.sizes.productCardImageSize }}>
          <ThemedText
            variant="caption"
            style={{ color: theme.colors.colorTextSecondary }}
          >
            Plan Price
          </ThemedText>
          <ThemedText variant="body" weight="semibold">
            ₹{subscription.price}
            <ThemedText
              variant="caption"
              style={{ color: theme.colors.colorTextSecondary }}
            >
              {" "}
              / day
            </ThemedText>
          </ThemedText>
        </View>
        <View style={{ flex: 1, flexDirection: "row", gap: theme.spacing.sm }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Skip ${subscription.name}`}
            style={{
              flex: 1,
              minHeight: theme.layout.touchTargetMin,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: theme.radii.lg,
              paddingHorizontal: theme.spacing.sm,
              backgroundColor: theme.colors.colorSurfaceMuted,
            }}
          >
            <ThemedText variant="caption" weight="semibold">
              Skip Next
            </ThemedText>
          </Pressable>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Manage ${subscription.name}`}
            onPress={() => router.push("/subscription-manage")}
            style={{
              flex: 1,
              minHeight: theme.layout.touchTargetMin,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: theme.radii.lg,
              paddingHorizontal: theme.spacing.sm,
              backgroundColor: theme.colors.colorPrimary,
            }}
          >
            <ThemedText
              variant="caption"
              weight="semibold"
              style={{ color: theme.colors.colorTextInverse }}
            >
              Manage
            </ThemedText>
          </Pressable>
        </View>
      </View>
    </View>
  );
});

function EmptySubscriptions({ products }: { products: Product[] }) {
  const theme = useTheme();
  const cart = useAppStore((state) => state.cart);
  const addToCart = useAppStore((state) => state.addToCart);
  const dailyProducts = useMemo(() => products.slice(0, 2), [products]);
  return (
    <View style={{ gap: theme.spacing.lg, paddingVertical: theme.spacing.md }}>
      <View
        style={{
          alignItems: "center",
          gap: theme.spacing.md,
          paddingTop: theme.spacing.lg,
        }}
      >
        <View
          style={[
            {
              width: theme.sizes.avatarLg * 2,
              height: theme.sizes.avatarLg * 2,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: theme.radii.pill,
              backgroundColor: theme.colors.colorSurface,
            },
            theme.elevation.card,
          ]}
        >
          <AppIcon
            icon={ProductsIcon}
            accessibilityLabel="Milk bottle"
            size="lg"
          />
        </View>
        <ThemedText variant="h2">No subscriptions yet</ThemedText>
        <ThemedText
          variant="bodySmall"
          style={{
            color: theme.colors.colorTextSecondary,
            textAlign: "center",
          }}
        >
          Start a daily or alternate-day subscription to get farm-fresh A2 milk
          delivered to your doorstep every sunrise.
        </ThemedText>
        <Button onPress={() => router.push("/products")}>
          Browse Products →
        </Button>
      </View>
      <View
        style={{
          gap: theme.spacing.sm,
          padding: theme.spacing.md,
          borderRadius: theme.radii.lg,
          backgroundColor: theme.colors.colorSurface,
        }}
      >
        <ThemedText variant="bodySmall" weight="semibold">
          Subscription Perks
        </ThemedText>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            gap: theme.spacing.sm,
          }}
        >
          <ThemedText
            variant="caption"
            style={{
              borderRadius: theme.radii.pill,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs,
              backgroundColor: theme.colors.colorSurfaceMuted,
            }}
          >
            ▣ Zero delivery fees
          </ThemedText>
          <ThemedText
            variant="caption"
            style={{
              borderRadius: theme.radii.pill,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs,
              backgroundColor: theme.colors.colorSurfaceMuted,
            }}
          >
            Ⅱ Pause anytime
          </ThemedText>
          <ThemedText
            variant="caption"
            style={{
              borderRadius: theme.radii.pill,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs,
              backgroundColor: theme.colors.colorSurfaceMuted,
            }}
          >
            ♻ Free glass bottle swaps
          </ThemedText>
        </View>
      </View>
      <View style={{ gap: theme.spacing.sm }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <ThemedText variant="body" weight="semibold">
            Popular Delivery
          </ThemedText>
          <Pressable onPress={() => router.push("/products")}>
            <ThemedText
              variant="caption"
              weight="semibold"
              style={{ color: theme.colors.colorPrimary }}
            >
              View All
            </ThemedText>
          </Pressable>
        </View>
        <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
          {dailyProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isAdded={cart.some((item) => item.product.id === product.id)}
              onAdd={() => addToCart(product)}
              onPress={() => undefined}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

export default function SubscriptionsScreen() {
  const theme = useTheme();
  const { data: products = [] } = useProducts();
  const [tab, setTab] = useState<Tab>("active");
  const [showEmpty, setShowEmpty] = useState(false);
  const data = tab === "active" && !showEmpty ? activeSubscriptions : [];
  const renderItem = useCallback(
    ({ item }: { item: Subscription }) => (
      <SubscriptionCard subscription={item} />
    ),
    [],
  );
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.colorSurfaceMuted }}
    >
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: theme.layout.screenHorizontalPadding,
            paddingVertical: theme.spacing.md,
            backgroundColor: theme.colors.colorBackground,
          }}
        >
          <ThemedText variant="h1">Subscriptions</ThemedText>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Notifications"
            style={{
              width: theme.layout.touchTargetMin,
              height: theme.layout.touchTargetMin,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: theme.radii.pill,
            }}
          >
            <AppIcon icon={NotificationIcon} accessibilityLabel="" size="md" />
          </Pressable>
        </View>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{
            gap: theme.spacing.md,
            padding: theme.spacing.md,
            paddingBottom: theme.spacing.lg,
          }}
          ListHeaderComponent={
            <View style={{ gap: theme.spacing.md }}>
              <View
                style={{
                  flexDirection: "row",
                  padding: theme.spacing.xs,
                  borderRadius: theme.radii.pill,
                  backgroundColor: theme.colors.colorSurface,
                }}
              >
                {tabLabels.map((item) => (
                  <Pressable
                    key={item.key}
                    accessibilityRole="tab"
                    accessibilityState={{ selected: tab === item.key }}
                    onPress={() => {
                      setTab(item.key);
                      setShowEmpty(item.key !== "active");
                    }}
                    style={{
                      flex: 1,
                      minHeight: theme.layout.touchTargetMin,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: theme.radii.pill,
                      backgroundColor:
                        tab === item.key
                          ? theme.colors.colorPrimary
                          : theme.colors.colorTransparent,
                    }}
                  >
                    <ThemedText
                      variant="caption"
                      weight={tab === item.key ? "semibold" : "regular"}
                      style={{
                        color:
                          tab === item.key
                            ? theme.colors.colorTextInverse
                            : theme.colors.colorTextSecondary,
                      }}
                    >
                      {item.label}
                    </ThemedText>
                  </Pressable>
                ))}
              </View>
              {data.length > 0 ? (
                <>
                  <Pressable
                    accessibilityRole="button"
                    onPress={() => router.push("/subscription-vacation")}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: theme.spacing.md,
                      padding: theme.spacing.md,
                      borderRadius: theme.radii.lg,
                      backgroundColor: theme.colors.colorPrimary,
                    }}
                  >
                    <View
                      style={{
                        width: theme.sizes.avatarMd,
                        height: theme.sizes.avatarMd,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: theme.radii.pill,
                        backgroundColor: theme.colors.colorPrimaryPressed,
                      }}
                    >
                      <AppIcon
                        icon={CalendarIcon}
                        accessibilityLabel="Vacation pause"
                        tone="onPrimary"
                        size="sm"
                      />
                    </View>
                    <View style={{ flex: 1 }}>
                      <ThemedText
                        variant="body"
                        weight="semibold"
                        style={{ color: theme.colors.colorTextInverse }}
                      >
                        Going away soon?
                      </ThemedText>
                      <ThemedText
                        variant="caption"
                        style={{ color: theme.colors.colorPrimaryTint }}
                      >
                        Set Vacation Pause anytime{`\n`}effortlessly
                      </ThemedText>
                    </View>
                    <View
                      style={{
                        borderRadius: theme.radii.pill,
                        paddingHorizontal: theme.spacing.md,
                        paddingVertical: theme.spacing.sm,
                        backgroundColor: theme.colors.colorSurface,
                      }}
                    >
                      <ThemedText variant="caption" weight="semibold">
                        Pause →
                      </ThemedText>
                    </View>
                  </Pressable>
                </>
              ) : null}
            </View>
          }
          ListEmptyComponent={<EmptySubscriptions products={products} />}
        />
        <BottomNavigation
          activeKey="subscriptions"
          onChange={(key) => {
            if (key === "home") router.replace("/home");
            if (key === "products") router.replace("/products");
            if (key === "cart") router.replace("/cart");
            if (key === "profile") router.replace("/profile");
          }}
          items={[
            { key: "home", label: "Home", icon: HomeIcon },
            { key: "products", label: "Products", icon: ProductsIcon },
            {
              key: "subscriptions",
              label: "Subscriptions",
              icon: CalendarIcon,
            },
            { key: "cart", label: "Cart", icon: CartIcon },
            { key: "profile", label: "Profile", icon: ProfileIcon },
          ]}
        />
      </View>
    </SafeAreaView>
  );
}
