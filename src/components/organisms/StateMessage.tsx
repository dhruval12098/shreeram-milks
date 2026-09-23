import type { IconSvgElement } from '../atoms/AppIcon';
import { ActivityIndicator, View } from 'react-native';
import { Button } from '../atoms/Button';
import { AppIcon } from '../atoms/AppIcon';
import { ThemedText } from '../atoms/ThemedText';
import { useTheme } from '../../theme';
interface StateMessageProps { actionLabel?: string; description?: string; icon?: IconSvgElement; onAction?: () => void; title: string; type: 'empty' | 'error' | 'loading'; }
export function StateMessage({ actionLabel, description, icon, onAction, title, type }: StateMessageProps) { const theme = useTheme(); if (type === 'loading') return <View style={{ alignItems: 'center', paddingVertical: theme.spacing.xxl, gap: theme.spacing.md }}><ActivityIndicator color={theme.colors.colorPrimary} /><ThemedText>{title}</ThemedText></View>; return <View style={{ alignItems: 'center', paddingVertical: theme.spacing.xxl, gap: theme.spacing.md }}><View style={{ width: theme.sizes.avatarLg, height: theme.sizes.avatarLg, alignItems: 'center', justifyContent: 'center', borderRadius: theme.radii.pill, backgroundColor: type === 'error' ? theme.colors.colorDangerTint : theme.colors.colorPrimaryTint }}>{icon ? <AppIcon icon={icon} accessibilityLabel="" tone={type === 'error' ? 'primary' : 'primary'} /> : null}</View><ThemedText variant="h2">{title}</ThemedText>{description ? <ThemedText style={{ color: theme.colors.colorTextSecondary, textAlign: 'center' }}>{description}</ThemedText> : null}{actionLabel && onAction ? <Button onPress={onAction}>{actionLabel}</Button> : null}</View>; }
