import type { PropsWithChildren } from 'react';
import { ActivityIndicator, Pressable, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';

import { AppIcon, type IconSvgElement } from './AppIcon';
import { ThemedText } from './ThemedText';
import { useTheme } from '../../theme';

type ButtonVariant = 'primary' | 'secondary' | 'danger';
interface ButtonProps extends Omit<PressableProps, 'style'> {
  icon?: IconSvgElement;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  variant?: ButtonVariant;
}

export function Button({ children, disabled = false, icon, loading = false, style, variant = 'primary', ...props }: PropsWithChildren<ButtonProps>) {
  const theme = useTheme();
  const isDisabled = disabled || loading;
  const backgroundColor = variant === 'secondary' ? theme.colors.colorSurface : variant === 'danger' ? theme.colors.colorDanger : theme.colors.colorPrimary;
  const textColor = variant === 'secondary' ? theme.colors.colorPrimary : theme.colors.colorTextInverse;

  return <Pressable {...props} accessibilityRole="button" disabled={isDisabled} style={({ pressed }) => [{ minHeight: theme.sizes.buttonHeight + theme.spacing.xs, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: theme.spacing.sm, paddingHorizontal: theme.spacing.lg, borderRadius: theme.radii.lg, backgroundColor, borderColor: theme.colors.colorBorder, borderWidth: variant === 'secondary' ? theme.borderWidths.hairline : theme.borderWidths.none, opacity: isDisabled ? theme.opacity.disabled : pressed ? theme.opacity.subdued : theme.opacity.full }, style]}>{loading ? <ActivityIndicator color={textColor} /> : icon ? <AppIcon icon={icon} accessibilityLabel="" tone={variant === 'secondary' ? 'primary' : 'onPrimary'} size="sm" /> : null}<ThemedText numberOfLines={1} variant="body" weight="semibold" style={{ color: textColor, flexShrink: 0 }}>{children}</ThemedText></Pressable>;
}
