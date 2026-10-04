import { Image } from "expo-image";
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

export default function HomeScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { data: products = [], isError, isLoading, refetch } = useProducts();
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
              ? theme.colors.colorPrimaryTint
              : theme.colors.colorSurface,
            borderWidth: selected ? theme.borderWidths.medium : theme.borderWidths.hairline,
            borderColor: selected ? theme.colors.colorPrimary : theme.colors.colorBorder,
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
            {t(`home.categories.${item.toLowerCase()}`)}
          </ThemedText>
        </Pressable>
      );
    },
    [activeCategory, t, theme],
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
          <ThemedText variant="h2">{t("home.greeting", { name: "Priya" })}</ThemedText>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: theme.spacing.xs,
            }}
          >
            <AppIcon
              icon={LocationIcon}
              accessibilityLabel={t("home.deliveryLocation")}
              size="sm"
              tone="secondary"
            />
            <ThemedText
              variant="caption"
              style={{ color: theme.colors.colorTextSecondary }}
            >
              {t("home.location")}
            </ThemedText>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("home.notifications")}
          onPress={() => router.push("/settings")}
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
          source={require("../assets/onboarding-milk-hero.png")}
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
              {t("home.offer")}
            </ThemedText>
          </View>
          <ThemedText
            variant="body"
            weight="bold"
            style={{ color: theme.colors.colorTextInverse }}
          >
            {t("home.bannerTitle")}
          </ThemedText>
          <ThemedText
            variant="caption"
            style={{ color: theme.colors.colorTextInverse }}
          >
            {t("home.bannerDetail")}
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
          borderRadius: theme.radii.lg,
          backgroundColor: theme.colors.colorSuccessTint,
          ...theme.elevation.card,
        }}
      >
        <View
          style={{
            position: "relative",
            overflow: "hidden",
            flexDirection: "row",
            alignItems: "center",
            gap: theme.spacing.sm,
            borderRadius: theme.radii.lg,
            borderWidth: theme.borderWidths.hairline,
            borderColor: theme.colors.colorSurface,
            padding: theme.spacing.md,
            backgroundColor: theme.colors.colorSuccessTint,
          }}
        >
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              top: -theme.spacing.sm,
              left: theme.spacing.md,
              width: "58%",
              height: "58%",
              borderRadius: theme.radii.pill,
              backgroundColor: theme.colors.colorSurface,
              opacity: theme.opacity.overlay,
            }}
          />
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              top: 0,
              left: theme.spacing.md,
              right: theme.spacing.md,
              height: theme.borderWidths.hairline,
              backgroundColor: theme.colors.colorSurface,
              opacity: theme.opacity.subdued,
            }}
          />
          <View
            style={{
              width: theme.sizes.avatarMd,
              height: theme.sizes.avatarMd,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: theme.radii.pill,
              backgroundColor: theme.colors.colorSurface,
            }}
          >
            <AppIcon
              icon={CalendarIcon}
              accessibilityLabel={t("home.nextDelivery")}
              size="sm"
              tone="success"
            />
          </View>
          <View style={{ flex: 1, gap: theme.spacing.xs }}>
            <ThemedText
              variant="caption"
              weight="semibold"
              style={{ color: theme.colors.colorTextPrimary }}
            >
              {t("home.nextDeliveryTime")}
            </ThemedText>
            <ThemedText variant="bodySmall">
              {t("home.nextDeliveryProduct")}
            </ThemedText>
          </View>
          <ThemedText
            variant="caption"
            weight="semibold"
            style={{ color: theme.colors.colorTextPrimary }}
          >
            {t("home.skipPause")}
          </ThemedText>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ThemedText variant="h2">{t("home.picks")}</ThemedText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={t("home.seeAll")}
          onPress={() => router.push("/products")}
        >
          <ThemedText
            variant="bodySmall"
            weight="semibold"
            style={{ color: theme.colors.colorTextSecondary }}
          >
            {t("home.seeAll")}
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
          <StateMessage type="loading" title={t("home.loading")} />
        ) : isError ? (
          <StateMessage
            type="error"
            title={t("home.errorTitle")}
            description={t("home.errorDetail")}
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
            ListHeaderComponent={listHeader}
            ListEmptyComponent={
              <StateMessage
                type="empty"
                title={t("home.empty", { category: t(`home.categories.${activeCategory.toLowerCase()}`) })}
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
