import type { PropsWithChildren } from 'react';
import { Pressable } from 'react-native';
import { ThemedText } from './ThemedText';
import { useTheme } from '../../theme';
export function Chip({ children, onPress, selected = false }: PropsWithChildren<{ onPress?: () => void; selected?: boolean }>) { const theme = useTheme(); return <Pressable accessibilityRole="button" onPress={onPress} style={{ minHeight: theme.layout.touchTargetMin, alignItems: 'center', justifyContent: 'center', paddingHorizontal: theme.spacing.md, borderRadius: theme.radii.pill, backgroundColor: selected ? theme.colors.colorPrimary : theme.colors.colorSurfaceMuted }}><ThemedText variant="bodySmall" style={{ color: selected ? theme.colors.colorTextInverse : theme.colors.colorTextPrimary }}>{children}</ThemedText></Pressable>; }
