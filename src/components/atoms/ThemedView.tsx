import type { PropsWithChildren } from 'react';
import { View, type ViewProps } from 'react-native';

import { useTheme } from '../../theme';

type ThemedViewBackground = 'background' | 'surface' | 'secondary' | 'muted' | 'selected' | 'informational' | 'hero' | 'disabled';

interface ThemedViewProps extends ViewProps {
  background?: ThemedViewBackground;
}

export function ThemedView({ background = 'background', children, style, ...props }: PropsWithChildren<ThemedViewProps>) {
  const theme = useTheme();
  const backgroundColor = background === 'surface' ? theme.colors.colorSurface : background === 'secondary' ? theme.colors.colorSurfaceSecondary : background === 'muted' ? theme.colors.colorSurfaceMuted : background === 'selected' ? theme.colors.colorSurfaceSelected : background === 'informational' ? theme.colors.colorSurfaceInformational : background === 'hero' ? theme.colors.colorSurfaceHero : background === 'disabled' ? theme.colors.colorSurfaceDisabled : theme.colors.colorBackground;

  return <View {...props} style={[{ backgroundColor }, style]}>{children}</View>;
}
