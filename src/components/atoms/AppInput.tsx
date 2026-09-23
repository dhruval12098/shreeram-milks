import { forwardRef, useState } from 'react';
import { TextInput, type TextInputProps } from 'react-native';

import { fontFamilyForLocale, useTheme } from '../../theme';
import { useAppStore } from '../../store/useAppStore';

interface AppInputProps extends TextInputProps { hasError?: boolean; }

export const AppInput = forwardRef<TextInput, AppInputProps>(function AppInput({ hasError = false, onBlur, onFocus, style, ...props }, ref) {
  const theme = useTheme();
  const language = useAppStore((state) => state.language);
  const [isFocused, setIsFocused] = useState(false);
  const borderColor = hasError ? theme.colors.colorBorderError : isFocused ? theme.colors.colorBorderFocus : theme.colors.colorBorder;

  return <TextInput ref={ref} {...props} onBlur={(event) => { setIsFocused(false); onBlur?.(event); }} onFocus={(event) => { setIsFocused(true); onFocus?.(event); }} placeholderTextColor={theme.colors.colorTextSecondary} selectionColor={theme.colors.colorPrimary} style={[{ minHeight: theme.sizes.inputHeight, borderWidth: theme.borderWidths.hairline, borderColor, borderRadius: theme.radii.md, paddingHorizontal: theme.spacing.md, color: theme.colors.colorTextPrimary, fontFamily: fontFamilyForLocale(language), fontSize: theme.typography.body.fontSize, lineHeight: theme.typography.body.lineHeight }, style]} />;
});
