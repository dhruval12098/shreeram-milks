import { router } from "expo-router";
import { useMemo, useState } from "react";
import { FlatList, Pressable, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppIcon } from "../src/components/atoms/AppIcon";
import { AppInput } from "../src/components/atoms/AppInput";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { ProductCard } from "../src/components/organisms/ProductCard";
import { StateMessage } from "../src/components/organisms/StateMessage";
import { BackIcon, CartIcon, SearchIcon } from "../src/icons/appIcons";
import { useProducts } from "../src/hooks/useProducts";
import { useAppStore } from "../src/store/useAppStore";
import { useTheme } from "../src/theme";
import type { Product } from "../src/types/models";

const categoryNames = ["All", "Raw Milk", "Bilona Ghee", "Pot Curd"] as const;

export default function SearchScreen() {
  const theme = useTheme();
  const { data: products = [], isError, isLoading } = useProducts();
  const addToCart = useAppStore((state) => state.addToCart);
  const cart = useAppStore((state) => state.cart);
  const [query, setQuery] = useState("");
  const [category, setCategory] =
    useState<(typeof categoryNames)[number]>("All");
  const results = useMemo(
    () =>
      products.filter(
        (product) =>
          (category === "All" ||
            product.category ===
              category.replace("Raw ", "").replace("Pot ", "")) &&
          product.name.toLowerCase().includes(query.toLowerCase()),
      ),
    [category, products, query],
  );
  const renderItem = ({ item }: { item: Product }) => (
    <View style={{ marginBottom: theme.spacing.sm }}>
      <ProductCard
        product={item}
        isAdded={cart.some((row) => row.product.id === item.id)}
        onAdd={(id) => {
          const product = products.find((row) => row.id === id);
          if (product) addToCart(product);
        }}
        onPress={(productId) =>
          router.push({ pathname: "/product-details", params: { productId } })
        }
      />
    </View>
  );
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}
    >
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ gap: theme.spacing.sm }}
        contentContainerStyle={{
          padding: theme.layout.screenHorizontalPadding,
          paddingBottom: theme.spacing.xxl,
        }}
        ListHeaderComponent={
          <View
            style={{ gap: theme.spacing.md, paddingBottom: theme.spacing.md }}
          >
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
              >
                <AppIcon icon={BackIcon} accessibilityLabel="" />
              </Pressable>
              <ThemedText variant="h2" style={{ flex: 1 }}>
                Explore
              </ThemedText>
              <Pressable
                accessibilityLabel="Cart"
                onPress={() => router.push("/cart")}
              >
                <AppIcon icon={CartIcon} accessibilityLabel="" />
              </Pressable>
            </View>
            <View style={{ position: "relative" }}>
              <AppInput
                value={query}
                onChangeText={setQuery}
                placeholder="Search milk, bilona ghee, paneer…"
                style={{ paddingLeft: theme.sizes.iconLg + theme.spacing.md }}
              />
              <View
                pointerEvents="none"
                style={{
                  position: "absolute",
                  left: theme.spacing.md,
                  top: theme.spacing.md,
                }}
              >
                <AppIcon
                  icon={SearchIcon}
                  accessibilityLabel=""
                  size="sm"
                  tone="secondary"
                />
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
              {categoryNames.map((name) => (
                <Pressable
                  key={name}
                  onPress={() => setCategory(name)}
                  style={{
                    paddingHorizontal: theme.spacing.sm,
                    paddingVertical: theme.spacing.xs,
                    borderRadius: theme.radii.pill,
                    backgroundColor:
                      category === name
                        ? theme.colors.colorPrimary
                        : theme.colors.colorSurfaceMuted,
                  }}
                >
                  <ThemedText
                    variant="caption"
                    weight="semibold"
                    style={{
                      color:
                        category === name
                          ? theme.colors.colorTextInverse
                          : theme.colors.colorTextPrimary,
                    }}
                  >
                    {name}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <ThemedText variant="bodySmall" weight="semibold">
                Fresh Offerings
              </ThemedText>
              <ThemedText
                variant="caption"
                style={{ color: theme.colors.colorTextSecondary }}
              >
                Delivered cold by 6:00 AM tomorrow
              </ThemedText>
            </View>
          </View>
        }
        ListEmptyComponent={
          isLoading ? (
            <StateMessage type="loading" title="Loading fresh products" />
          ) : (
            <StateMessage
              type={isError ? "error" : "empty"}
              title={isError ? "Could not load search" : "No products found"}
            />
          )
        }
      />
    </SafeAreaView>
  );
}
