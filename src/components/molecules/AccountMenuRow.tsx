import { Pressable, View } from "react-native";

import { AppIcon, type IconSvgElement } from "../atoms/AppIcon";
import { Divider } from "../atoms/Divider";
import { ThemedText } from "../atoms/ThemedText";
import { ForwardIcon } from "../../icons/appIcons";
import { useTheme } from "../../theme";

interface AccountMenuRowProps {
  icon: IconSvgElement;
  isLast?: boolean;
  onPress?: () => void;
  subtitle: string;
  title: string;
  tone?: "default" | "danger";
  trailing?: string;
}

export function AccountMenuRow({
  icon,
  isLast = false,
  onPress,
  subtitle,
  title,
  tone = "default",
  trailing,
}: AccountMenuRowProps) {
  const theme = useTheme();
  const isDanger = tone === "danger";

  return (
    <>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPress}
        style={({ pressed }) => ({
          minHeight: theme.layout.touchTargetMin + theme.spacing.md,
          paddingHorizontal: theme.spacing.md,
          paddingVertical: theme.spacing.sm,
          flexDirection: "row",
          alignItems: "center",
          gap: theme.spacing.sm,
          opacity: pressed ? theme.opacity.subdued : theme.opacity.full,
        })}
      >
        <View
          style={{
            width: theme.sizes.avatarMd,
            height: theme.sizes.avatarMd,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: theme.radii.md,
            backgroundColor: isDanger
              ? theme.colors.colorDangerTint
              : theme.colors.colorSurfaceMuted,
          }}
        >
          <AppIcon
            icon={icon}
            accessibilityLabel=""
            tone={isDanger ? "disabled" : "primary"}
            size="sm"
          />
        </View>
        <View style={{ flex: 1, gap: theme.spacing.xs }}>
          <ThemedText
            variant="bodySmall"
            weight="semibold"
            style={{ color: isDanger ? theme.colors.colorDanger : undefined }}
          >
            {title}
          </ThemedText>
          <ThemedText
            variant="bodySmall"
            numberOfLines={1}
            style={{ color: theme.colors.colorTextSecondary }}
          >
            {subtitle}
          </ThemedText>
        </View>
        {trailing ? (
          <ThemedText
            variant="bodySmall"
            weight="semibold"
            style={{
              color: isDanger
                ? theme.colors.colorDanger
                : theme.colors.colorPrimary,
            }}
          >
            {trailing}
          </ThemedText>
        ) : (
          <AppIcon
            icon={ForwardIcon}
            accessibilityLabel=""
            size="sm"
            tone={isDanger ? "disabled" : "secondary"}
          />
        )}
      </Pressable>
      {!isLast ? <Divider /> : null}
    </>
  );
}
