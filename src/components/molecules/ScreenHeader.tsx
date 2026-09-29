import { router } from "expo-router";
import { Pressable, View } from "react-native";

import { AppIcon } from "../atoms/AppIcon";
import { ThemedText } from "../atoms/ThemedText";
import { BackIcon } from "../../icons/appIcons";
import { useTheme } from "../../theme";

interface ScreenHeaderProps {
  backLabel: string;
  title: string;
  trailing?: React.ReactNode;
}

export function ScreenHeader({ backLabel, title, trailing }: ScreenHeaderProps) {
  const theme = useTheme();
  return (
    <View style={{ minHeight: theme.sizes.buttonHeight, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <Pressable accessibilityRole="button" accessibilityLabel={backLabel} hitSlop={theme.spacing.sm} onPress={() => router.back()} style={{ width: theme.layout.touchTargetMin, height: theme.layout.touchTargetMin, alignItems: "center", justifyContent: "center" }}>
        <AppIcon icon={BackIcon} accessibilityLabel="" />
      </Pressable>
      <ThemedText variant="h2" numberOfLines={1} style={{ flex: 1, textAlign: "center" }}>{title}</ThemedText>
      <View style={{ width: theme.layout.touchTargetMin, alignItems: "flex-end" }}>{trailing}</View>
    </View>
  );
}
