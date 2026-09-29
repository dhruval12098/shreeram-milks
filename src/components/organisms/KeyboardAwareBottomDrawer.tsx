import type { PropsWithChildren } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { KeyboardStickyView } from 'react-native-keyboard-controller';

interface KeyboardAwareBottomDrawerProps {
  style?: StyleProp<ViewStyle>;
  /** Extra downward movement when the keyboard is open, in pixels. */
  openedOffset?: number;
}

/** Pins the action area above the live keyboard inset on both platforms. */
export function KeyboardAwareBottomDrawer({ children, style, openedOffset = 0 }: PropsWithChildren<KeyboardAwareBottomDrawerProps>) {
  return <KeyboardStickyView style={style} offset={{ closed: 0, opened: openedOffset }}>{children}</KeyboardStickyView>;
}
