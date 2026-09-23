import type { TextInputProps } from 'react-native';
import { View } from 'react-native';
import { AppInput } from '../atoms/AppInput';
import { ThemedText } from '../atoms/ThemedText';
import { useTheme } from '../../theme';
interface FormFieldProps extends TextInputProps { error?: string; label: string; }
export function FormField({ error, label, ...inputProps }: FormFieldProps) { const theme = useTheme(); return <View style={{ gap: theme.spacing.sm }}><ThemedText variant="bodySmall">{label}</ThemedText><AppInput accessibilityLabel={label} hasError={Boolean(error)} {...inputProps} />{error ? <ThemedText variant="caption" style={{ color: theme.colors.colorDanger }}>{error}</ThemedText> : null}</View>; }
