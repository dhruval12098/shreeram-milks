import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react-native';

import { useTheme } from '../../theme';

type IconSize = 'sm' | 'md' | 'lg';
type IconTone = 'primary' | 'secondary' | 'onPrimary' | 'disabled';

interface AppIconProps {
  icon: IconSvgElement;
  size?: IconSize;
  tone?: IconTone;
  accessibilityLabel: string;
}

export type { IconSvgElement };

export function AppIcon({ accessibilityLabel, icon, size = 'md', tone = 'primary' }: AppIconProps) {
  const theme = useTheme();
  const iconSize = size === 'sm' ? theme.sizes.iconSm : size === 'lg' ? theme.sizes.iconLg : theme.sizes.iconMd;
  const color = tone === 'secondary' ? theme.icons.iconSecondary : tone === 'onPrimary' ? theme.icons.iconOnPrimary : tone === 'disabled' ? theme.icons.iconDisabled : theme.icons.iconPrimary;

  return <HugeiconsIcon accessibilityLabel={accessibilityLabel} icon={icon} size={iconSize} color={color} strokeWidth={theme.sizes.iconStrokeWidth} />;
}
