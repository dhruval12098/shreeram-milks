import { View } from 'react-native';
import { ThemedText } from './ThemedText';
import { useTheme } from '../../theme';
type AvatarSize = 'sm' | 'md' | 'lg';
export function Avatar({ initials, size = 'md' }: { initials: string; size?: AvatarSize }) { const theme = useTheme(); const dimension = size === 'sm' ? theme.sizes.avatarSm : size === 'lg' ? theme.sizes.avatarLg : theme.sizes.avatarMd; return <View accessibilityLabel={initials} style={{ width: dimension, height: dimension, borderRadius: theme.radii.pill, backgroundColor: theme.colors.colorPrimaryTint, alignItems: 'center', justifyContent: 'center' }}><ThemedText variant="caption" style={{ color: theme.colors.colorPrimary }}>{initials}</ThemedText></View>; }
