import type { PropsWithChildren } from "react";
import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
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
  const { height } = useWindowDimensions();
  const translateY = useRef(new Animated.Value(height)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (visible) {
      translateY.setValue(height);
      overlayOpacity.setValue(0);
      Animated.timing(overlayOpacity, {
        toValue: theme.opacity.overlay,
        duration: theme.motion.duration.normal,
        useNativeDriver: true,
      }).start();
      Animated.timing(translateY, {
        toValue: 0,
        duration: theme.motion.duration.normal,
        easing: Easing.bezier(...theme.motion.easing.decelerate),
        useNativeDriver: true,
      }).start();
    }
  }, [
    height,
    theme.motion.duration.normal,
    theme.motion.easing.decelerate,
    overlayOpacity,
    translateY,
    visible,
  ]);
  return (
    <Modal
      animationType="none"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <KeyboardAwareBottomDrawer>
          <Animated.View
            pointerEvents="none"
            style={{
              position: "absolute",
              top: theme.spacing.none,
              right: theme.spacing.none,
              bottom: theme.spacing.none,
              left: theme.spacing.none,
              backgroundColor: theme.colors.colorOverlay,
              opacity: overlayOpacity,
            }}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Close drawer"
            onPress={onClose}
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
              accessibilityLabel="Close"
              onPress={onClose}
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
