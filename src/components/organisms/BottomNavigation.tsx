import type { IconSvgElement } from "../atoms/AppIcon";
import { Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AppIcon } from "../atoms/AppIcon";
import { ThemedText } from "../atoms/ThemedText";
import { useAppStore } from "../../store/useAppStore";
import { useTheme } from "../../theme";
export interface BottomNavigationItem {
  icon: IconSvgElement;
  key: string;
  label: string;
}
interface BottomNavigationProps {
  activeKey: string;
  items: BottomNavigationItem[];
  onChange: (key: string) => void;
}
export function BottomNavigation({
  activeKey,
  items,
  onChange,
}: BottomNavigationProps) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const cartCount = useAppStore((state) =>
    state.cart.reduce((total, item) => total + item.quantity, 0),
  );
  return (
    <View
      accessibilityRole="tablist"
      style={{
        flexDirection: "row",
        overflow: "hidden",
        borderTopLeftRadius: theme.radii.lg,
        borderTopRightRadius: theme.radii.lg,
        paddingTop: theme.spacing.sm,
        paddingBottom: Math.max(insets.bottom, theme.spacing.sm),
        backgroundColor: theme.colors.colorNavigation,
      }}
    >
      {items.map((item) => {
        const active = item.key === activeKey;
        const isCart = item.key === "cart";
        return (
          <Pressable
            key={item.key}
            accessibilityRole="tab"
            accessibilityState={{ selected: active }}
            accessibilityLabel={
              isCart && cartCount > 0
                ? `${item.label}, ${cartCount} items`
                : item.label
            }
            onPress={() => onChange(item.key)}
            style={{
              flex: 1,
              minHeight: theme.sizes.buttonHeight + theme.spacing.sm,
              alignItems: "center",
              justifyContent: "center",
              gap: theme.spacing.xs,
            }}
          >
            <View style={{ position: "relative" }}>
              <AppIcon
                icon={item.icon}
                accessibilityLabel=""
                size="md"
                tone="onPrimary"
              />
              {isCart && cartCount > 0 ? (
                <View
                  accessibilityLabel={`${cartCount} items in cart`}
                  style={{
                    position: "absolute",
                    top: -theme.spacing.sm,
                    right: -theme.spacing.xs,
                    minWidth: theme.sizes.iconSm,
                    height: theme.sizes.iconSm,
                    paddingHorizontal: cartCount > 9 ? theme.spacing.xs : theme.spacing.none,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: theme.radii.pill,
                    backgroundColor: theme.colors.colorSurfaceMuted,
                    borderWidth: theme.borderWidths.hairline,
                    borderColor: theme.colors.colorNavigation,
                  }}
                >
                  <ThemedText
                    variant="badgeLabel"
                    weight="semibold"
                    style={{ color: theme.colors.colorTextPrimary }}
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </ThemedText>
                </View>
              ) : null}
            </View>
            <ThemedText
              variant="badgeLabel"
              weight={active ? "semibold" : "regular"}
              style={{
                color: theme.colors.colorTextInverse,
                opacity: active ? 1 : 0.7,
              }}
            >
              {item.label}
            </ThemedText>
            <View
              style={{
                height: theme.borderWidths.medium,
                width: active ? theme.spacing.md : 0,
                borderRadius: theme.radii.pill,
                backgroundColor: theme.colors.colorTextInverse,
              }}
            />
          </Pressable>
        );
      })}
    </View>
  );
}
