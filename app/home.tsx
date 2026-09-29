import { Image } from "expo-image";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Pressable, ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppIcon } from "../src/components/atoms/AppIcon";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { BottomNavigation } from "../src/components/organisms/BottomNavigation";
import { ProductCard } from "../src/components/organisms/ProductCard";
import { StateMessage } from "../src/components/organisms/StateMessage";
import { useProducts } from "../src/hooks/useProducts";
import {
  CalendarIcon,
  CartIcon,
  HomeIcon,
  LocationIcon,
  NotificationIcon,
  ProductsIcon,
  ProfileIcon,
} from "../src/icons/appIcons";
import { useTheme } from "../src/theme";
import type { Product } from "../src/types/models";
import { useAppStore } from "../src/store/useAppStore";

const categories = ["All", "Milk", "Curd", "Paneer", "Ghee", "Butter"] as const;
const bannerImage =
  "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=1200&q=85";

export default function HomeScreen() {
  const theme = useTheme();
  const { data: products = [], isError, isLoading } = useProducts();
  const [activeTab, setActiveTab] = useState("home");
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("All");
  const cart = useAppStore((state) => state.cart);
  const addToCart = useAppStore((state) => state.addToCart);
  const handleProductPress = useCallback(
    (productId: string) =>
      router.push({ pathname: "/product-details", params: { productId } }),
    [],
  );
  const handleAdd = useCallback(
    (productId: string) => {
      const product = products.find((item) => item.id === productId);
      if (product) addToCart(product);
    },
    [addToCart, products],
  );
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);
  const renderProduct = useCallback(
    ({ item }: { item: Product }) => (
      <View style={{ flex: 1, marginBottom: theme.spacing.md }}>
        <ProductCard
          isAdded={cart.some((cartItem) => cartItem.product.id === item.id)}
          product={item}
          onAdd={handleAdd}
          onPress={handleProductPress}
        />
      </View>
    ),
    [cart, handleAdd, handleProductPress, theme.spacing.md],
  );
  const renderCategory = useCallback(
    ({ item }: { item: (typeof categories)[number] }) => {
      const selected = item === activeCategory;
      return (
        <Pressable
          accessibilityRole="tab"
          accessibilityState={{ selected }}
          onPress={() => setActiveCategory(item)}
          style={{
            minHeight: theme.layout.touchTargetMin,
            justifyContent: "center",
            borderRadius: theme.radii.pill,
            paddingHorizontal: theme.spacing.md,
            backgroundColor: selected
              ? theme.colors.colorPrimary
              : theme.colors.colorSurface,
            borderWidth: selected ? 0 : theme.borderWidths.hairline,
            borderColor: theme.colors.colorBorder,
          }}
        >
          <ThemedText
            variant="bodySmall"
            weight={selected ? "semibold" : "regular"}
            style={{
              color: selected
                ? theme.colors.colorTextInverse
                : theme.colors.colorTextPrimary,
            }}
          >
            {item}
          </ThemedText>
        </Pressable>
      );
    },
    [activeCategory, theme],
  );

  const listHeader = (
    <View
      style={{
        gap: theme.spacing.lg,
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.md,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ gap: theme.spacing.xs }}>
          <ThemedText variant="h2">Good Morning, Priya</ThemedText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: theme.spacing.xs,
            }}
          >
            <AppIcon
              icon={LocationIcon}
              accessibilityLabel="Delivery location"
              size="sm"
              tone="secondary"
            />
            <ThemedText
              variant="caption"
              style={{ color: theme.colors.colorTextSecondary }}
            >
              Greenwood Meadows, Villa 4B
            </ThemedText>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Notifications"
          style={{
            width: theme.sizes.avatarMd,
            height: theme.sizes.avatarMd,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: theme.radii.pill,
            backgroundColor: theme.colors.colorSurface,
          }}
        >
          <AppIcon icon={NotificationIcon} accessibilityLabel="" size="sm" />
        </Pressable>
      </View>
      <View
        style={{
          height: 146,
          overflow: "hidden",
          borderRadius: theme.radii.lg,
          backgroundColor: theme.colors.colorPrimary,
        }}
      >
        <Image
          source={{ uri: bannerImage }}
          contentFit="cover"
          transition={180}
          style={{ width: "100%", height: "100%" }}
        />
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: theme.colors.colorOverlay,
            opacity: 0.48,
          }}
        />
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            inset: 0,
            justifyContent: "flex-end",
            padding: theme.spacing.md,
            gap: theme.spacing.xs,
          }}
        >
          <View
            style={{
              alignSelf: "flex-start",
              borderRadius: theme.radii.pill,
              paddingHorizontal: theme.spacing.sm,
              paddingVertical: theme.spacing.xs,
              backgroundColor: theme.colors.colorSurface,
            }}
          >
            <ThemedText
              variant="caption"
              weight="semibold"
              style={{ color: theme.colors.colorPrimary }}
            >
              SEASONAL OFFER
            </ThemedText>
          </View>
          <ThemedText
            variant="h2"
            style={{ color: theme.colors.colorTextInverse }}
          >
            Farm-fresh A2 milk — delivered before 7 AM
          </ThemedText>
          <ThemedText
            variant="caption"
            style={{ color: theme.colors.colorTextInverse }}
          >
            Pure goodness straight from our organic farm.
          </ThemedText>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ gap: theme.spacing.sm }}
      >
        {categories.map((item) => (
          <View key={item}>{renderCategory({ item })}</View>
        ))}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: theme.spacing.sm,
          borderRadius: theme.radii.lg,
          padding: theme.spacing.md,
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
            backgroundColor: theme.colors.colorPrimaryTint,
          }}
        >
          <AppIcon
            icon={CalendarIcon}
            accessibilityLabel="Next delivery"
            size="sm"
            tone="primary"
          />
        </View>
        <View style={{ flex: 1, gap: theme.spacing.xs }}>
          <ThemedText
            variant="caption"
            weight="semibold"
            style={{ color: theme.colors.colorPrimary }}
          >
            Tomorrow, 24 Oct • 6:30 AM
          </ThemedText>
          <ThemedText variant="bodySmall">
            A2 Desi Cow Milk (1 Litre)
          </ThemedText>
        </View>
        <ThemedText
          variant="caption"
          weight="semibold"
          style={{ color: theme.colors.colorTextSecondary }}
        >
          Skip / Pause
        </ThemedText>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ThemedText variant="h2">Today’s Picks</ThemedText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="See all products"
          onPress={() => router.push("/products")}
        >
          <ThemedText
            variant="bodySmall"
            weight="semibold"
            style={{ color: theme.colors.colorTextSecondary }}
          >
            See all ›
          </ThemedText>
        </Pressable>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.colorSurfaceMuted }}
    >
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1, paddingHorizontal: theme.spacing.md }}>
        {isLoading ? (
          <StateMessage type="loading" title="Loading fresh products" />
        ) : isError ? (
          <StateMessage
            type="error"
            title="Could not load products"
            description="Please try again shortly."
          />
        ) : (
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ gap: theme.spacing.sm }}
            ListHeaderComponent={listHeader}
            ListEmptyComponent={
              <StateMessage
                type="empty"
                title={`No ${activeCategory.toLowerCase()} products are available`}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <BottomNavigation
        activeKey={activeTab}
        onChange={(key) => {
          setActiveTab(key);
          if (key === "products") router.push("/products");
          if (key === "cart") router.push("/cart");
          if (key === "subscriptions") router.push("/subscriptions");
          if (key === "profile") router.push("/profile");
        }}
        items={[
          { key: "home", label: "Home", icon: HomeIcon },
          { key: "products", label: "Products", icon: ProductsIcon },
          { key: "subscriptions", label: "Subscriptions", icon: CalendarIcon },
          { key: "cart", label: "Cart", icon: CartIcon },
          { key: "profile", label: "Profile", icon: ProfileIcon },
        ]}
      />
    </SafeAreaView>
  );
}
