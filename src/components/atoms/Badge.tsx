import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { ThemedText } from './ThemedText';
import { useTheme } from '../../theme';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';
export function Badge({ children, variant = 'default' }: PropsWithChildren<{ variant?: BadgeVariant }>) {
  const theme = useTheme();
  const backgroundColor = variant === 'success' ? theme.colors.colorPrimaryTint : variant === 'warning' ? theme.colors.colorWarningTint : variant === 'danger' ? theme.colors.colorDangerTint : variant === 'info' ? theme.colors.colorInfoTint : theme.colors.colorSurfaceMuted;
  const color = variant === 'success' ? theme.colors.colorPrimary : variant === 'warning' ? theme.colors.colorWarning : variant === 'danger' ? theme.colors.colorDanger : variant === 'info' ? theme.colors.colorInfo : theme.colors.colorTextSecondary;
  return <View style={{ alignSelf: 'flex-start', borderRadius: theme.radii.pill, paddingHorizontal: theme.spacing.sm, paddingVertical: theme.spacing.xs, backgroundColor }}><ThemedText variant="caption" style={{ color }}>{children}</ThemedText></View>;
}
