import { memo, useRef } from "react";
import { Animated, Easing, Pressable, View } from "react-native";
import { Image } from "expo-image";
import { useTranslation } from "react-i18next";

import { useTheme } from "../../theme";
import type { Product } from "../../types/models";
import { ThemedText } from "../atoms/ThemedText";

interface ProductCardProps { isAdded?: boolean; onAdd: (productId: string) => void; onPress: (productId: string) => void; product: Product; }

export const ProductCard = memo(function ProductCard({ isAdded = false, onAdd, onPress, product }: ProductCardProps) {
  const theme = useTheme(); const { t } = useTranslation();
  const cardScale = useRef(new Animated.Value(1)).current;
  const addScale = useRef(new Animated.Value(1)).current;
  const animate = (value: Animated.Value, toValue: number) => Animated.timing(value, { toValue, duration: theme.motion.duration.fast, easing: Easing.bezier(...theme.motion.easing.standard), useNativeDriver: true }).start();
  const action = isAdded ? t("productCard.added") : t("productCard.add");
  return <Animated.View style={{ flex: 1, transform: [{ scale: cardScale }] }}><View style={{ overflow: "hidden", borderRadius: theme.radii.lg, borderWidth: theme.borderWidths.hairline, borderColor: theme.colors.colorBorder, backgroundColor: theme.colors.colorSurface }}><Pressable accessibilityRole="button" accessibilityLabel={product.name} onPress={() => onPress(product.id)} onPressIn={() => animate(cardScale, theme.motion.pressScale.card)} onPressOut={() => animate(cardScale, 1)}><Image source={{ uri: product.imageUrl ?? undefined }} contentFit="cover" transition={theme.motion.duration.fast} style={{ height: 156, backgroundColor: theme.colors.colorPrimaryTint }} /><View style={{ gap: theme.spacing.xs, paddingHorizontal: theme.spacing.sm, paddingTop: theme.spacing.sm }}><ThemedText variant="bodySmall" weight="semibold" numberOfLines={1}>{product.name}</ThemedText><ThemedText variant="caption" numberOfLines={1} style={{ color: theme.colors.colorTextSecondary }}>{product.unit}</ThemedText></View></Pressable><View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: theme.spacing.sm }}><ThemedText variant="bodySmall" weight="semibold">{`₹${product.price}`}</ThemedText><Animated.View style={{ transform: [{ scale: addScale }] }}><Pressable accessibilityRole="button" accessibilityLabel={t("productCard.addProduct", { action, product: product.name })} accessibilityState={{ selected: isAdded }} onPress={() => onAdd(product.id)} onPressIn={() => animate(addScale, theme.motion.pressScale.control)} onPressOut={() => animate(addScale, 1)} style={({ pressed }) => ({ minWidth: theme.layout.touchTargetMin, minHeight: theme.layout.touchTargetMin, alignItems: "center", justifyContent: "center", borderRadius: theme.radii.pill, paddingHorizontal: theme.spacing.sm, backgroundColor: isAdded ? theme.colors.colorPrimaryPressed : theme.colors.colorPrimary, opacity: pressed ? theme.opacity.subdued : theme.opacity.full })}><ThemedText variant="badgeLabel" weight="semibold" style={{ color: theme.colors.colorTextInverse }}>{isAdded ? t("productCard.added") : t("productCard.add")}</ThemedText></Pressable></Animated.View></View></View></Animated.View>;
});
