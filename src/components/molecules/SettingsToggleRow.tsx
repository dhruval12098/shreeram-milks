import { Switch, View } from "react-native";

import { AppIcon, type IconSvgElement } from "../atoms/AppIcon";
import { Divider } from "../atoms/Divider";
import { ThemedText } from "../atoms/ThemedText";
import { useTheme } from "../../theme";

interface SettingsToggleRowProps {
  enabled: boolean;
  icon: IconSvgElement;
  isLast?: boolean;
  onChange: (enabled: boolean) => void;
  subtitle: string;
  title: string;
}

export function SettingsToggleRow({
  enabled,
  icon,
  isLast = false,
  onChange,
  subtitle,
  title,
}: SettingsToggleRowProps) {
  const theme = useTheme();

  return (
    <>
      <View
        style={{
          minHeight: theme.layout.touchTargetMin + theme.spacing.md,
          padding: theme.spacing.md,
          flexDirection: "row",
          alignItems: "center",
          gap: theme.spacing.sm,
        }}
      >
        <View
          style={{
            width: theme.sizes.avatarMd,
            height: theme.sizes.avatarMd,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: theme.radii.md,
            backgroundColor: theme.colors.colorSurfaceMuted,
          }}
        >
          <AppIcon icon={icon} accessibilityLabel="" tone="primary" size="sm" />
        </View>
        <View style={{ flex: 1, gap: theme.spacing.xs }}>
          <ThemedText variant="bodySmall" weight="semibold">
            {title}
          </ThemedText>
          <ThemedText
            variant="caption"
            style={{ color: theme.colors.colorTextSecondary }}
          >
            {subtitle}
          </ThemedText>
        </View>
        <Switch
          accessibilityLabel={title}
          onValueChange={onChange}
          thumbColor={theme.colors.colorSurface}
          trackColor={{
            false: theme.colors.colorBorder,
            true: theme.colors.colorPrimary,
          }}
          value={enabled}
        />
      </View>
      {!isLast ? <Divider /> : null}
    </>
  );
}
