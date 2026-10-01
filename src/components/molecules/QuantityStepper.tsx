import { useRef } from "react";
import { Animated, Easing, Pressable, View } from "react-native";
import { useTranslation } from "react-i18next";

import { AddIcon, MinusIcon } from "../../icons/appIcons";
import { useTheme } from "../../theme";
import { AppIcon, type IconSvgElement } from "../atoms/AppIcon";
import { ThemedText } from "../atoms/ThemedText";

interface QuantityStepperProps { onDecrement: () => void; onIncrement: () => void; value: number; unit?: string; }

function StepperButton({ icon, label, onPress }: { icon: IconSvgElement; label: string; onPress: () => void }) {
  const theme = useTheme();
  const scale = useRef(new Animated.Value(1)).current;
  const animateScale = (toValue: number) => Animated.timing(scale, { toValue, duration: theme.motion.duration.fast, easing: Easing.bezier(...theme.motion.easing.standard), useNativeDriver: true }).start();
  return <Animated.View style={{ transform: [{ scale }] }}><Pressable accessibilityRole="button" accessibilityLabel={label} hitSlop={theme.spacing.xs} onPress={onPress} onPressIn={() => animateScale(theme.motion.pressScale.compactControl)} onPressOut={() => animateScale(1)} style={({ pressed }) => ({ width: theme.layout.touchTargetMin, height: theme.layout.touchTargetMin, alignItems: "center", justifyContent: "center", borderRadius: theme.radii.pill, backgroundColor: pressed ? theme.colors.colorPrimaryTint : theme.colors.colorTransparent })}><AppIcon icon={icon} accessibilityLabel="" size="sm" /></Pressable></Animated.View>;
}

export function QuantityStepper({ onDecrement, onIncrement, unit = "L", value }: QuantityStepperProps) {
  const theme = useTheme(); const { t } = useTranslation();
  return <View style={{ minHeight: theme.sizes.quantityStepperHeight, flexDirection: "row", alignItems: "center", gap: theme.spacing.xs, borderRadius: theme.radii.pill, backgroundColor: theme.colors.colorSurfaceMuted }}><StepperButton icon={MinusIcon} label={t("quantity.decrease")} onPress={onDecrement} /><ThemedText variant="bodySmall" weight="bold">{`${value}${unit}`}</ThemedText><StepperButton icon={AddIcon} label={t("quantity.increase")} onPress={onIncrement} /></View>;
}
