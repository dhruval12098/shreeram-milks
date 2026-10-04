import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { ThemedText } from './ThemedText';
import { useTheme } from '../../theme';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';
export function Badge({ children, variant = 'default' }: PropsWithChildren<{ variant?: BadgeVariant }>) {
  const theme = useTheme();
  const colors = {
    default: { backgroundColor: theme.colors.colorSurfaceMuted, color: theme.colors.colorTextSecondary },
    success: { backgroundColor: theme.colors.colorSuccessTint, color: theme.colors.colorSuccess },
    warning: { backgroundColor: theme.colors.colorWarningTint, color: theme.colors.colorWarning },
    danger: { backgroundColor: theme.colors.colorDangerTint, color: theme.colors.colorDanger },
    info: { backgroundColor: theme.colors.colorInfoTint, color: theme.colors.colorInfo },
  }[variant];
  return <View style={{ alignSelf: 'flex-start', borderRadius: theme.radii.pill, paddingHorizontal: theme.spacing.sm, paddingVertical: theme.spacing.xs, backgroundColor: colors.backgroundColor }}><ThemedText variant="caption" style={{ color: colors.color }}>{children}</ThemedText></View>;
}
