import { View } from "react-native";
import { Button } from "../atoms/Button";
import { ThemedText } from "../atoms/ThemedText";
import { useTheme } from "../../theme";
interface CheckoutFooterProps {
  amount: number;
  label: string;
  onPress: () => void;
}
export function CheckoutFooter({
  amount,
  label,
  onPress,
}: CheckoutFooterProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        {
          paddingHorizontal: theme.layout.screenHorizontalPadding,
          paddingTop: theme.spacing.sm,
          paddingBottom: theme.spacing.md,
          flexDirection: "row",
          alignItems: "center",
          gap: theme.spacing.md,
          backgroundColor: theme.colors.colorSurface,
        },
        theme.elevation.card,
      ]}
    >
      <View style={{ flex: 1 }}>
        <ThemedText variant="h2">₹{amount}</ThemedText>
        <ThemedText
          variant="caption"
          style={{ color: theme.colors.colorTextSecondary }}
        >
          Includes taxes and delivery
        </ThemedText>
      </View>
      <Button style={{ flex: 1 }} onPress={onPress}>
        {label}
      </Button>
    </View>
  );
}
