import { useEffect, useState } from "react";
import { Animated, Easing, Pressable, View } from "react-native";

import { AppIcon } from "../atoms/AppIcon";
import { ThemedText } from "../atoms/ThemedText";
import { ChevronDownIcon, ChevronUpIcon } from "../../icons/appIcons";
import { useTheme } from "../../theme";

interface NutritionAccordionProps {
  content: string;
  title: string;
}

export function NutritionAccordion({
  content,
  title,
}: NutritionAccordionProps) {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [contentMounted, setContentMounted] = useState(false);
  const [contentProgress] = useState(() => new Animated.Value(0));
  useEffect(() => {
    Animated.timing(contentProgress, {
      toValue: expanded ? 1 : 0,
      duration: theme.motion.duration.fast,
      easing: expanded
        ? Easing.bezier(...theme.motion.easing.decelerate)
        : Easing.bezier(...theme.motion.easing.accelerate),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && !expanded) setContentMounted(false);
    });
  }, [
    contentProgress,
    expanded,
    theme.motion.duration.fast,
    theme.motion.easing.accelerate,
    theme.motion.easing.decelerate,
  ]);
  return (
    <View
      style={{
        overflow: "hidden",
        borderRadius: theme.radii.lg,
        borderWidth: theme.borderWidths.hairline,
        borderColor: theme.colors.colorBorder,
        backgroundColor: theme.colors.colorSurface,
      }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        accessibilityLabel={title}
        onPress={() => {
          const nextExpanded = !expanded;
          if (nextExpanded) setContentMounted(true);
          setExpanded(nextExpanded);
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: theme.layout.touchTargetMin,
          paddingHorizontal: theme.spacing.md,
        }}
      >
        <ThemedText variant="bodySmall" weight="semibold">
          {title}
        </ThemedText>
        <AppIcon
          icon={expanded ? ChevronUpIcon : ChevronDownIcon}
          accessibilityLabel=""
          size="sm"
          tone="secondary"
        />
      </Pressable>
      {contentMounted ? (
        <Animated.View
          accessibilityElementsHidden={!expanded}
          importantForAccessibility={expanded ? "auto" : "no-hide-descendants"}
          style={{
            padding: theme.spacing.md,
            borderTopWidth: theme.borderWidths.hairline,
            borderColor: theme.colors.colorBorder,
            opacity: contentProgress,
            transform: [
              {
                translateY: contentProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [theme.motion.entranceOffset, 0],
                }),
              },
            ],
          }}
        >
          <ThemedText
            variant="caption"
            style={{ color: theme.colors.colorTextSecondary }}
          >
            {content}
          </ThemedText>
        </Animated.View>
      ) : null}
    </View>
  );
}
