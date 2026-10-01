import type { PropsWithChildren } from "react";
import { useRef } from "react";
import { Animated, Easing, Pressable } from "react-native";

import { useTheme } from "../../theme";
import { ThemedText } from "./ThemedText";

interface ChipProps { onPress?: () => void; selected?: boolean; }

export function Chip({ children, onPress, selected = false }: PropsWithChildren<ChipProps>) {
  const theme = useTheme();
  const scale = useRef(new Animated.Value(1)).current;
  const animateScale = (toValue: number) => Animated.timing(scale, { toValue, duration: theme.motion.duration.fast, easing: Easing.bezier(...theme.motion.easing.standard), useNativeDriver: true }).start();
  return <Animated.View style={{ transform: [{ scale }] }}><Pressable accessibilityRole="button" accessibilityState={{ selected, disabled: !onPress }} disabled={!onPress} onPress={onPress} onPressIn={() => animateScale(theme.motion.pressScale.control)} onPressOut={() => animateScale(1)} style={({ pressed }) => ({ minHeight: theme.layout.touchTargetMin, alignItems: "center", justifyContent: "center", paddingHorizontal: theme.spacing.md, borderRadius: theme.radii.pill, borderWidth: theme.borderWidths.hairline, borderColor: selected ? theme.colors.colorPrimary : theme.colors.colorBorder, backgroundColor: selected ? theme.colors.colorPrimaryTint : theme.colors.colorSurfaceMuted, opacity: pressed ? theme.opacity.subdued : theme.opacity.full })}><ThemedText variant="bodySmall" weight="semibold" style={{ color: selected ? theme.colors.colorPrimary : theme.colors.colorTextPrimary }}>{children}</ThemedText></Pressable></Animated.View>;
}
