import { useCallback, useRef, useState } from 'react';
import { Animated, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';

import { useTheme } from '../../theme';

/**
 * Reveals a sticky form action while the customer moves deeper into a long
 * form, then tucks it away while they scroll back to review earlier fields.
 */
export function useScrollResponsiveBottomAction() {
  const theme = useTheme();
  const [translateY] = useState(() => new Animated.Value(0));
  const lastOffset = useRef(0);
  const isVisible = useRef(true);

  const setVisible = useCallback((visible: boolean) => {
    if (isVisible.current === visible) return;
    isVisible.current = visible;
    Animated.timing(translateY, {
      toValue: visible ? 0 : theme.sizes.buttonHeight + theme.spacing.xl * 2,
      duration: theme.motion.duration.normal,
      useNativeDriver: true,
    }).start();
  }, [theme.motion.duration.normal, theme.sizes.buttonHeight, theme.spacing.xl, translateY]);

  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offset = Math.max(0, event.nativeEvent.contentOffset.y);
    const delta = offset - lastOffset.current;
    if (delta > 8) setVisible(true);
    if (delta < -8) setVisible(false);
    lastOffset.current = offset;
  }, [setVisible]);

  return { bottomActionStyle: { transform: [{ translateY }] }, onScroll };
}
