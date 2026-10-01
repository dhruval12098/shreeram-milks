import type { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { ThemedText } from './ThemedText';
import { useTheme } from '../../theme';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';
export function Badge({ children, variant = 'default' }: PropsWithChildren<{ variant?: BadgeVariant }>) {
  const theme = useTheme();
  const backgroundColor = variant === 'success' ? theme.colors.colorSuccessTint : variant === 'danger' ? theme.colors.colorDangerTint : theme.colors.colorSurfaceMuted;
  const color = variant === 'success' ? theme.colors.colorSuccess : variant === 'danger' ? theme.colors.colorDanger : theme.colors.colorTextSecondary;
  return <View style={{ alignSelf: 'flex-start', borderRadius: theme.radii.pill, paddingHorizontal: theme.spacing.sm, paddingVertical: theme.spacing.xs, backgroundColor }}><ThemedText variant="caption" style={{ color }}>{children}</ThemedText></View>;
}
