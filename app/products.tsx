import { router } from "expo-router";
import { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Pressable, ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppIcon } from "../src/components/atoms/AppIcon";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { BottomNavigation } from "../src/components/organisms/BottomNavigation";
import { ProductCard } from "../src/components/organisms/ProductCard";
import { StateMessage } from "../src/components/organisms/StateMessage";
import { useProducts } from "../src/hooks/useProducts";
import {
  BackIcon,
  CartIcon,
  CalendarIcon,
  HomeIcon,
  ProductsIcon,
  ProfileIcon,
} from "../src/icons/appIcons";
import { useTheme } from "../src/theme";
import type { Product } from "../src/types/models";
import { useAppStore } from "../src/store/useAppStore";

const categories = ["All", "Milk", "Curd", "Paneer", "Ghee", "Butter"] as const;

export default function ProductsScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { data: products = [], isError, isLoading, refetch } = useProducts();
  const [activeCategory, setActiveCategory] =
    useState<(typeof categories)[number]>("All");
  const cart = useAppStore((state) => state.cart);
  const addToCart = useAppStore((state) => state.addToCart);
  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((product) => product.category === activeCategory);
  const handleAdd = useCallback(
    (productId: string) => {
      const product = products.find((item) => item.id === productId);
      if (product) addToCart(product);
    },
    [addToCart, products],
  );
  const renderProduct = useCallback(
    ({ item }: { item: Product }) => (
      <View style={{ flex: 1, marginBottom: theme.spacing.md }}>
        <ProductCard
          isAdded={cart.some((cartItem) => cartItem.product.id === item.id)}
          product={item}
          onAdd={handleAdd}
          onPress={(productId) =>
            router.push({ pathname: "/product-details", params: { productId } })
          }
        />
      </View>
    ),
    [cart, handleAdd, theme.spacing.md],
  );

  const categoryTabs = (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: theme.spacing.sm }}
    >
      {categories.map((category) => {
        const selected = category === activeCategory;
        return (
          <Pressable
            key={category}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => setActiveCategory(category)}
            style={{
              minHeight: theme.layout.touchTargetMin,
              justifyContent: "center",
              borderRadius: theme.radii.pill,
              paddingHorizontal: theme.spacing.md,
              backgroundColor: selected
                ? theme.colors.colorPrimaryTint
                : theme.colors.colorSurface,
              borderWidth: selected
                ? theme.borderWidths.medium
                : theme.borderWidths.hairline,
              borderColor: selected
                ? theme.colors.colorPrimary
                : theme.colors.colorBorder,
            }}
          >
            <ThemedText
              variant="bodySmall"
              weight={selected ? "semibold" : "regular"}
              style={{
                color: selected
                  ? theme.colors.colorPrimary
                  : theme.colors.colorTextPrimary,
              }}
            >
              {t(`home.categories.${category.toLowerCase()}`)}
            </ThemedText>
          </Pressable>
        );
      })}
    </ScrollView>
  );

  const header = (
    <View
      style={{
        gap: theme.spacing.lg,
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.md,
      }}
    >
      <View style={{ gap: theme.spacing.md }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing.sm,
          }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("products.back")}
            onPress={() => router.back()}
            hitSlop={theme.spacing.sm}
            style={{
              width: theme.sizes.iconMd,
              height: theme.sizes.iconMd,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AppIcon icon={BackIcon} accessibilityLabel="" size="sm" />
          </Pressable>
          <ThemedText variant="body" weight="semibold">
            {t("products.title")}
          </ThemedText>
        </View>
        <View
          style={{
            height: theme.borderWidths.hairline,
            marginHorizontal: -theme.spacing.md,
            backgroundColor: theme.colors.colorBorder,
          }}
        />
      </View>
      {categoryTabs}
    </View>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.colorSurfaceMuted }}
    >
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1, paddingHorizontal: theme.spacing.md }}>
        {isLoading ? (
          <StateMessage type="loading" title={t("products.loading")} />
        ) : isError ? (
          <StateMessage
            type="error"
            title={t("products.error")}
            description={t("products.errorDetail")}
            actionLabel={t("common.retry")}
            onAction={() => refetch()}
          />
        ) : (
          <FlatList
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ gap: theme.spacing.sm }}
            ListHeaderComponent={header}
            ListEmptyComponent={
              <StateMessage
                type="empty"
                title={t("products.empty", { category: t(`home.categories.${activeCategory.toLowerCase()}`) })}
              />
            }
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <BottomNavigation
        activeKey="products"
        onChange={(key) => {
          if (key === "home") router.replace("/home");
          if (key === "cart") router.push("/cart");
          if (key === "subscriptions") router.push("/subscriptions");
          if (key === "profile") router.push("/profile");
        }}
        items={[
          { key: "home", label: t("navigation.home"), icon: HomeIcon },
          { key: "products", label: t("navigation.products"), icon: ProductsIcon },
          { key: "subscriptions", label: t("navigation.subscriptions"), icon: CalendarIcon },
          { key: "cart", label: t("navigation.cart"), icon: CartIcon },
          { key: "profile", label: t("navigation.profile"), icon: ProfileIcon },
        ]}
      />
    </SafeAreaView>
  );
}
