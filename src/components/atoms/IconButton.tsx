import type { PressableProps } from 'react-native';
import { Pressable } from 'react-native';

import { AppIcon, type IconSvgElement } from './AppIcon';
import { useTheme } from '../../theme';

interface IconButtonProps extends PressableProps { icon: IconSvgElement; label: string; tone?: 'primary' | 'secondary'; }
export function IconButton({ icon, label, tone = 'primary', ...props }: IconButtonProps) {
  const theme = useTheme();
  return <Pressable {...props} accessibilityRole="button" accessibilityLabel={label} hitSlop={theme.spacing.sm} style={({ pressed }) => [{ width: theme.layout.touchTargetMin, height: theme.layout.touchTargetMin, alignItems: 'center', justifyContent: 'center', borderRadius: theme.radii.pill, backgroundColor: pressed ? theme.colors.colorPrimaryTint : theme.colors.colorTransparent }, typeof props.style === 'function' ? props.style({ pressed }) : props.style]}><AppIcon icon={icon} accessibilityLabel="" tone={tone} /></Pressable>;
}
