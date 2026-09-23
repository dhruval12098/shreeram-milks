import type { PropsWithChildren } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { KeyboardStickyView } from 'react-native-keyboard-controller';

interface KeyboardAwareBottomDrawerProps {
  style?: StyleProp<ViewStyle>;
}

/** Pins the action area above the live keyboard inset on both platforms. */
export function KeyboardAwareBottomDrawer({ children, style }: PropsWithChildren<KeyboardAwareBottomDrawerProps>) {
  return <KeyboardStickyView style={style} offset={{ closed: 0, opened: 0 }}>{children}</KeyboardStickyView>;
}
