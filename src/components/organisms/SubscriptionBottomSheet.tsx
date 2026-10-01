import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Animated,
  Modal,
  Pressable,
  useWindowDimensions,
  View,
} from "react-native";

import { useTheme } from "../../theme";
import { AppIcon } from "../atoms/AppIcon";
import { CloseIcon } from "../../icons/appIcons";
import { KeyboardAwareBottomDrawer } from "./KeyboardAwareBottomDrawer";

interface SubscriptionBottomSheetProps {
  onClose: () => void;
  visible: boolean;
}

export function SubscriptionBottomSheet({
  children,
  onClose,
  visible,
}: PropsWithChildren<SubscriptionBottomSheetProps>) {
  const theme = useTheme();
  const { t } = useTranslation();
  const { height } = useWindowDimensions();
  const [translateY] = useState(() => new Animated.Value(height));
  const [mounted, setMounted] = useState(visible);
  const animateTo = (toValue: number, onComplete?: () => void) => Animated.spring(translateY, {
    toValue,
    damping: 24,
    stiffness: 190,
    mass: 0.9,
    overshootClamping: true,
    useNativeDriver: true,
  }).start(({ finished }) => { if (finished) onComplete?.(); });

  useEffect(() => {
    if (visible) {
      setMounted(true);
      translateY.setValue(height);
      animateTo(0);
    } else if (mounted) {
      animateTo(height, () => setMounted(false));
    }
  }, [
    height,
    mounted,
    translateY,
    visible,
  ]);

  const close = () => animateTo(height, onClose);
  return (
    <Modal
      animationType="none"
      transparent
      visible={mounted}
      onRequestClose={close}
    >
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <KeyboardAwareBottomDrawer>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t("bottomSheet.closeDrawer")}
            onPress={close}
            style={{
              flex: 1,
            }}
          />
          <Animated.View
            style={[
              {
                overflow: "hidden",
                padding: theme.spacing.lg,
                paddingBottom: theme.spacing.xl,
                borderTopLeftRadius: theme.radii.lg,
                borderTopRightRadius: theme.radii.lg,
                backgroundColor: theme.colors.colorSurface,
                transform: [{ translateY }],
              },
              theme.elevation.lg,
            ]}
          >
            <View
              style={{
                alignSelf: "center",
                width: theme.spacing.xxl,
                height: theme.spacing.xs,
                borderRadius: theme.radii.pill,
                marginBottom: theme.spacing.md,
                backgroundColor: theme.colors.colorBorder,
              }}
            />
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t("bottomSheet.close")}
              onPress={close}
              style={{
                position: "absolute",
                top: theme.spacing.md,
                right: theme.spacing.md,
                width: theme.layout.touchTargetMin,
                height: theme.layout.touchTargetMin,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AppIcon
                icon={CloseIcon}
                accessibilityLabel=""
                size="sm"
                tone="secondary"
              />
            </Pressable>
            {children}
          </Animated.View>
        </KeyboardAwareBottomDrawer>
      </View>
    </Modal>
  );
}
