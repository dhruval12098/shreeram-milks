import type { PropsWithChildren } from 'react';
import { View, type ViewProps } from 'react-native';

import { useTheme } from '../../theme';

type ThemedViewBackground = 'background' | 'surface' | 'muted' | 'disabled';

interface ThemedViewProps extends ViewProps {
  background?: ThemedViewBackground;
}

export function ThemedView({ background = 'background', children, style, ...props }: PropsWithChildren<ThemedViewProps>) {
  const theme = useTheme();
  const backgroundColor = background === 'surface' ? theme.colors.colorSurface : background === 'muted' ? theme.colors.colorSurfaceMuted : background === 'disabled' ? theme.colors.colorSurfaceDisabled : theme.colors.colorBackground;

  return <View {...props} style={[{ backgroundColor }, style]}>{children}</View>;
}
