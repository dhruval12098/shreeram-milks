import { useState } from "react";
import { Pressable, View } from "react-native";

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
        onPress={() => setExpanded((current) => !current)}
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
      {expanded ? (
        <View
          style={{
            padding: theme.spacing.md,
            borderTopWidth: theme.borderWidths.hairline,
            borderColor: theme.colors.colorBorder,
          }}
        >
          <ThemedText
            variant="caption"
            style={{ color: theme.colors.colorTextSecondary }}
          >
            {content}
          </ThemedText>
        </View>
      ) : null}
    </View>
  );
}
