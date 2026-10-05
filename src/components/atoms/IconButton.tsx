import type { PressableProps } from "react-native";
import { useState } from "react";
import { Animated, Easing, Pressable } from "react-native";

import { AppIcon, type IconSvgElement } from "./AppIcon";
import { useTheme } from "../../theme";

interface IconButtonProps extends PressableProps {
  icon: IconSvgElement;
  label: string;
  tone?: "primary" | "secondary";
}
export function IconButton({
  icon,
  label,
  tone = "primary",
  ...props
}: IconButtonProps) {
  const theme = useTheme();
  const [scale] = useState(() => new Animated.Value(1));
  const animateScale = (toValue: number) =>
    Animated.timing(scale, {
      toValue,
      duration: theme.motion.duration.fast,
      easing: Easing.bezier(...theme.motion.easing.standard),
      useNativeDriver: true,
    }).start();
  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        {...props}
        onPressIn={(event) => {
          animateScale(theme.motion.pressScale.compactControl);
          props.onPressIn?.(event);
        }}
        onPressOut={(event) => {
          animateScale(1);
          props.onPressOut?.(event);
        }}
        accessibilityRole="button"
        accessibilityLabel={label}
        hitSlop={theme.spacing.sm}
        style={({ pressed }) => [
          {
            width: theme.layout.touchTargetMin,
            height: theme.layout.touchTargetMin,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: theme.radii.md,
            backgroundColor: pressed
              ? theme.colors.colorPrimaryTint
              : theme.colors.colorTransparent,
          },
          typeof props.style === "function"
            ? props.style({ pressed })
            : props.style,
        ]}
      >
        <AppIcon icon={icon} accessibilityLabel="" tone={tone} />
      </Pressable>
    </Animated.View>
  );
}
