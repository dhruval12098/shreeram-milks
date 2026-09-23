import { Pressable, View } from 'react-native';
import { AppIcon } from '../atoms/AppIcon';
import { ThemedText } from '../atoms/ThemedText';
import { CalendarIcon } from '../../icons/appIcons';
import { useTheme } from '../../theme';
interface DeliverySlotCardProps { description: string; label: string; onPress?: () => void; selected?: boolean; }
export function DeliverySlotCard({ description, label, onPress, selected = false }: DeliverySlotCardProps) { const theme = useTheme(); return <Pressable accessibilityRole="radio" accessibilityState={{ selected }} onPress={onPress} style={{ minHeight: theme.sizes.slotCardHeight, borderRadius: theme.radii.md, borderWidth: selected ? theme.borderWidths.medium : theme.borderWidths.hairline, borderColor: selected ? theme.colors.colorPrimary : theme.colors.colorBorder, padding: theme.spacing.md, backgroundColor: theme.colors.colorSurface }}><View style={{ flexDirection: 'row', gap: theme.spacing.sm, alignItems: 'center' }}><AppIcon icon={CalendarIcon} accessibilityLabel="Delivery slot" size="sm" tone={selected ? 'primary' : 'secondary'} /><View style={{ flex: 1 }}><ThemedText variant="bodySmall">{label}</ThemedText><ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary }}>{description}</ThemedText></View></View></Pressable>; }
