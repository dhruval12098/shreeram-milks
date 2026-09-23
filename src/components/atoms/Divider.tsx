import { View } from 'react-native';
import { useTheme } from '../../theme';
export function Divider() { const theme = useTheme(); return <View style={{ height: theme.borderWidths.hairline, backgroundColor: theme.colors.colorBorder }} />; }
