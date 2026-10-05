import { useEffect, useState } from "react";
import { ActivityIndicator, Animated, Easing, View } from "react-native";

import { AppIcon, type IconSvgElement } from "../atoms/AppIcon";
import { Button } from "../atoms/Button";
import { ThemedText } from "../atoms/ThemedText";
import { useTheme } from "../../theme";

interface StateMessageProps {
  actionLabel?: string;
  description?: string;
  icon?: IconSvgElement;
  onAction?: () => void;
  title: string;
  type: "empty" | "error" | "loading";
}

export function StateMessage({
  actionLabel,
  description,
  icon,
  onAction,
  title,
  type,
}: StateMessageProps) {
  const theme = useTheme();
  const [progress] = useState(() => new Animated.Value(0));

  useEffect(() => {
    progress.setValue(0);
    Animated.timing(progress, {
      toValue: 1,
      duration: theme.motion.duration.fast,
      easing: Easing.bezier(...theme.motion.easing.decelerate),
      useNativeDriver: true,
    }).start();
  }, [
    progress,
    theme.motion.duration.fast,
    theme.motion.easing.decelerate,
    title,
    type,
  ]);

  return (
    <Animated.View
      style={{
        alignItems: "center",
        paddingVertical: theme.spacing.xxl,
        gap: theme.spacing.md,
        opacity: progress,
        transform: [
          {
            translateY: progress.interpolate({
              inputRange: [0, 1],
              outputRange: [theme.motion.entranceOffset, 0],
            }),
          },
        ],
      }}
    >
      {type === "loading" ? (
        <ActivityIndicator color={theme.colors.colorPrimary} />
      ) : (
        <View
          style={{
            width: theme.sizes.avatarLg,
            height: theme.sizes.avatarLg,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: theme.radii.pill,
            backgroundColor:
              type === "error"
                ? theme.colors.colorDangerTint
                : theme.colors.colorPrimaryTint,
          }}
        >
          {icon ? (
            <AppIcon icon={icon} accessibilityLabel="" tone="primary" />
          ) : null}
        </View>
      )}
      <ThemedText variant={type === "loading" ? "body" : "h2"}>
        {title}
      </ThemedText>
      {description ? (
        <ThemedText
          style={{
            color: theme.colors.colorTextSecondary,
            textAlign: "center",
          }}
        >
          {description}
        </ThemedText>
      ) : null}
      {actionLabel && onAction ? (
        <Button onPress={onAction}>{actionLabel}</Button>
      ) : null}
    </Animated.View>
  );
}
