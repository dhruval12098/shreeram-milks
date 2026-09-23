import { Pressable, View } from 'react-native';
import { AppIcon } from '../atoms/AppIcon';
import { ThemedText } from '../atoms/ThemedText';
import { AddIcon, MinusIcon } from '../../icons/appIcons';
import { useTheme } from '../../theme';
interface QuantityStepperProps { onDecrement: () => void; onIncrement: () => void; value: number; unit?: string; }
export function QuantityStepper({ onDecrement, onIncrement, unit = 'L', value }: QuantityStepperProps) { const theme = useTheme(); return <View style={{ minHeight: theme.sizes.quantityStepperHeight, flexDirection: 'row', alignItems: 'center', gap: theme.spacing.md, paddingHorizontal: theme.spacing.sm, borderRadius: theme.radii.pill, backgroundColor: theme.colors.colorSurfaceMuted }}><Pressable accessibilityRole="button" accessibilityLabel="Decrease quantity" onPress={onDecrement}><AppIcon icon={MinusIcon} accessibilityLabel="" size="sm" /></Pressable><ThemedText variant="bodySmall">{`${value}${unit}`}</ThemedText><Pressable accessibilityRole="button" accessibilityLabel="Increase quantity" onPress={onIncrement}><AppIcon icon={AddIcon} accessibilityLabel="" size="sm" /></Pressable></View>; }
