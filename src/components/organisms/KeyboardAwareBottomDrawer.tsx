import type { PropsWithChildren } from 'react';
import { useEffect, useRef } from 'react';
import { Animated, Keyboard, Platform, type StyleProp, type ViewStyle } from 'react-native';

interface KeyboardAwareBottomDrawerProps {
  style?: StyleProp<ViewStyle>;
}

/**
 * Keeps a bottom action area in normal screen layout. Android's native
 * adjust-resize behavior already moves layout above its keyboard, while iOS
 * needs an animated inset to achieve the same result.
 */
export function KeyboardAwareBottomDrawer({ children, style }: PropsWithChildren<KeyboardAwareBottomDrawerProps>) {
  const keyboardOffset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';
    const animateTo = (toValue: number, duration?: number) => {
      if (Platform.OS === 'android') {
        keyboardOffset.setValue(0);
        return;
      }
      Animated.timing(keyboardOffset, { toValue, duration: duration ?? 220, useNativeDriver: true }).start();
    };
    const showSubscription = Keyboard.addListener(showEvent, (event) => animateTo(-event.endCoordinates.height, event.duration));
    const hideSubscription = Keyboard.addListener(hideEvent, (event) => animateTo(0, event.duration));
    return () => { showSubscription.remove(); hideSubscription.remove(); };
  }, [keyboardOffset]);

  return <Animated.View style={[{ zIndex: 1, transform: [{ translateY: keyboardOffset }] }, style]}>{children}</Animated.View>;
}
