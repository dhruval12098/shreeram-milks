import { router } from "expo-router";
import { View } from "react-native";

import { IconButton } from "../atoms/IconButton";
import { ThemedText } from "../atoms/ThemedText";
import { BackIcon } from "../../icons/appIcons";
import { useTheme } from "../../theme";

interface ScreenHeaderProps {
  backLabel: string;
  onBack?: () => void;
  title: string;
  trailing?: React.ReactNode;
}

export function ScreenHeader({ backLabel, onBack, title, trailing }: ScreenHeaderProps) {
  const theme = useTheme();
  return (
    <View style={{ minHeight: theme.sizes.buttonHeight, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
      <IconButton icon={BackIcon} label={backLabel} onPress={onBack ?? (() => router.back())} />
      <ThemedText variant="h2" numberOfLines={1} style={{ flex: 1, textAlign: "center" }}>{title}</ThemedText>
      <View style={{ width: theme.layout.touchTargetMin, alignItems: "flex-end" }}>{trailing}</View>
    </View>
  );
}
