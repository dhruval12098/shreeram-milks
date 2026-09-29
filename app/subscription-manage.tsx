import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppIcon } from "../src/components/atoms/AppIcon";
import { Button } from "../src/components/atoms/Button";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { SubscriptionBottomSheet } from "../src/components/organisms/SubscriptionBottomSheet";
import { BackIcon, CalendarIcon } from "../src/icons/appIcons";
import { useTheme } from "../src/theme";

const cancellationReasons = [
  "Too expensive",
  "Quality issue",
  "Not needed anymore",
  "Moving away",
  "Other",
];

export default function ManageSubscriptionScreen() {
  const theme = useTheme();
  const [cancelOpen, setCancelOpen] = useState(false);
  const [editing, setEditing] = useState<"quantity" | "days" | "slot" | null>(
    null,
  );
  const [quantity, setQuantity] = useState("1 Litre");
  const [days, setDays] = useState("Mon–Sat");
  const [slot, setSlot] = useState("5–7 AM");
  const [reason, setReason] = useState("Quality issue");
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}
    >
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: theme.layout.screenHorizontalPadding,
            paddingVertical: theme.spacing.md,
            borderBottomWidth: theme.borderWidths.hairline,
            borderColor: theme.colors.colorBorder,
          }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back to subscriptions"
            onPress={() => router.back()}
          >
            <AppIcon icon={BackIcon} accessibilityLabel="" size="md" />
          </Pressable>
          <ThemedText variant="body" weight="semibold">
            Manage Subscription
          </ThemedText>
          <ThemedText variant="h2">?</ThemedText>
        </View>
        <ScrollView
          contentContainerStyle={{
            gap: theme.spacing.md,
            padding: theme.layout.screenHorizontalPadding,
            paddingBottom: theme.spacing.xxl,
          }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={[
              {
                flexDirection: "row",
                gap: theme.spacing.md,
                padding: theme.spacing.md,
                borderRadius: theme.radii.lg,
                backgroundColor: theme.colors.colorSurface,
              },
              theme.elevation.card,
            ]}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80",
              }}
              contentFit="cover"
              style={{
                width: theme.sizes.productCardImageSize,
                height: theme.sizes.productCardImageSize,
                borderRadius: theme.radii.md,
              }}
            />
            <View style={{ flex: 1, gap: theme.spacing.xs }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View
                  style={{
                    borderRadius: theme.radii.pill,
                    paddingHorizontal: theme.spacing.sm,
                    paddingVertical: theme.spacing.xs,
                    backgroundColor: theme.colors.colorPrimaryTint,
                  }}
                >
                  <ThemedText
                    variant="caption"
                    weight="semibold"
                    style={{ color: theme.colors.colorPrimary }}
                  >
                    ● Active
                  </ThemedText>
                </View>
                <ThemedText
                  variant="body"
                  weight="semibold"
                  style={{ color: theme.colors.colorPrimary }}
                >
                  ₹95
                </ThemedText>
              </View>
              <ThemedText variant="body" weight="semibold">
                A2 Desi Gir Cow Milk
              </ThemedText>
              <ThemedText
                variant="caption"
                style={{ color: theme.colors.colorTextSecondary }}
              >
                1L Recyclable Glass Bottle
              </ThemedText>
              <ThemedText
                variant="caption"
                weight="semibold"
                style={{ color: theme.colors.colorPrimary }}
              >
                ▣ Delivering tomorrow before 7 AM
              </ThemedText>
            </View>
          </View>
          <View
            style={{
              gap: theme.spacing.sm,
              padding: theme.spacing.md,
              borderRadius: theme.radii.lg,
              backgroundColor: theme.colors.colorSurface,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ThemedText variant="body" weight="semibold">
                Plan Summary
              </ThemedText>
              <View
                style={{
                  borderRadius: theme.radii.sm,
                  paddingHorizontal: theme.spacing.sm,
                  paddingVertical: theme.spacing.xs,
                  backgroundColor: theme.colors.colorSurfaceMuted,
                }}
              >
                <ThemedText
                  variant="caption"
                  weight="semibold"
                  style={{ color: theme.colors.colorTextSecondary }}
                >
                  PREPAID ACTIVE
                </ThemedText>
              </View>
            </View>
            <View style={{ gap: theme.spacing.sm }}>
              <SummaryRow
                label="Frequency"
                value={days === "Mon–Sat" ? "Mon to Sat (6 days/wk)" : days}
              />
              <SummaryRow
                label="Delivery Days"
                value={days === "Mon–Sat" ? "M  T  W  T  F  S" : days}
              />
              <SummaryRow
                label="Bottle Quantity"
                value={`${quantity} (Glass Bottle)`}
              />
              <SummaryRow
                label="Preferred Slot"
                value={
                  slot === "5–7 AM" ? "5:00 AM – 7:00 AM" : "7:00 AM – 9:00 AM"
                }
                detail="Silent Porch Drop"
              />
              <SummaryRow label="Start Date" value="12 Oct 2024" />
              <SummaryRow
                label="Next Delivery"
                value="Tomorrow, 25 Oct"
                accent
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                padding: theme.spacing.sm,
                borderRadius: theme.radii.md,
                backgroundColor: theme.colors.colorSurfaceMuted,
              }}
            >
              <ThemedText variant="bodySmall">▣ Per Delivery</ThemedText>
              <View style={{ alignItems: "flex-end" }}>
                <ThemedText variant="body" weight="bold">
                  ₹95
                </ThemedText>
                <ThemedText
                  variant="caption"
                  style={{ color: theme.colors.colorTextSecondary }}
                >
                  Zero Delivery Fee
                </ThemedText>
              </View>
            </View>
          </View>
          <View
            style={{
              gap: theme.spacing.none,
              overflow: "hidden",
              borderRadius: theme.radii.lg,
              backgroundColor: theme.colors.colorSurface,
            }}
          >
            <View style={{ padding: theme.spacing.md }}>
              <ThemedText variant="body" weight="semibold">
                Manage Schedule & Preferences
              </ThemedText>
            </View>
            <ManageRow
              title="Change quantity"
              subtitle="Adjust daily volume delivered"
              value={quantity}
              onPress={() => setEditing("quantity")}
            />
            <ManageRow
              title="Change days"
              subtitle="Switch delivery days or frequency"
              value={days}
              onPress={() => setEditing("days")}
            />
            <ManageRow
              title="Change delivery slot"
              subtitle="Early dawn or morning drop"
              value={slot}
              onPress={() => setEditing("slot")}
            />
            <ManageRow
              title="Skip next delivery"
              subtitle="Skip tomorrow, 25 Oct"
              value="Tomorrow"
            />
            <ManageRow
              title="Pause subscription"
              subtitle="Going out of town / vacation"
              onPress={() => router.push("/subscription-vacation")}
            />
          </View>
          <View
            style={{
              gap: theme.spacing.sm,
              padding: theme.spacing.md,
              borderRadius: theme.radii.lg,
              backgroundColor: theme.colors.colorPrimary,
            }}
          >
            <ThemedText
              variant="body"
              weight="semibold"
              style={{ color: theme.colors.colorTextInverse }}
            >
              Chilled Glass Bottle Return
            </ThemedText>
            <ThemedText
              variant="caption"
              style={{ color: theme.colors.colorPrimaryTint }}
            >
              Please rinse and leave yesterday’s glass bottle outside by 5 AM
              for daily sanitization swap.
            </ThemedText>
          </View>
          <Pressable
            accessibilityRole="button"
            onPress={() => setCancelOpen(true)}
            style={{
              minHeight: theme.sizes.buttonHeight,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: theme.radii.lg,
              backgroundColor: theme.colors.colorDangerTint,
            }}
          >
            <ThemedText
              variant="body"
              weight="semibold"
              style={{ color: theme.colors.colorDanger }}
            >
              ⊗ Cancel subscription
            </ThemedText>
          </Pressable>
          <ThemedText
            variant="caption"
            style={{
              color: theme.colors.colorTextSecondary,
              textAlign: "center",
            }}
          >
            Unused prepaid wallet balances remain 100% refundable anytime.
          </ThemedText>
        </ScrollView>
      </View>
      <SubscriptionBottomSheet
        visible={cancelOpen}
        onClose={() => setCancelOpen(false)}
      >
        <View style={{ gap: theme.spacing.md }}>
          <View style={{ gap: theme.spacing.xs }}>
            <ThemedText
              variant="caption"
              weight="semibold"
              style={{ color: theme.colors.colorPrimary }}
            >
              ● GAU FRESH • CARE TEAM
            </ThemedText>
            <ThemedText variant="h2">Cancel subscription?</ThemedText>
            <ThemedText
              variant="bodySmall"
              style={{ color: theme.colors.colorTextSecondary }}
            >
              We’re sad to see you go! Let us know what went wrong so we can
              improve our service.
            </ThemedText>
          </View>
          <View style={{ gap: theme.spacing.sm }}>
            <ThemedText variant="bodySmall" weight="semibold">
              Please select a reason:
            </ThemedText>
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                gap: theme.spacing.sm,
              }}
            >
              {cancellationReasons.map((item) => (
                <Pressable
                  key={item}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: item === reason }}
                  onPress={() => setReason(item)}
                  style={{
                    borderRadius: theme.radii.pill,
                    paddingHorizontal: theme.spacing.md,
                    paddingVertical: theme.spacing.sm,
                    backgroundColor:
                      item === reason
                        ? theme.colors.colorPrimary
                        : theme.colors.colorSurfaceMuted,
                  }}
                >
                  <ThemedText
                    variant="caption"
                    weight="semibold"
                    style={{
                      color:
                        item === reason
                          ? theme.colors.colorTextInverse
                          : theme.colors.colorTextPrimary,
                    }}
                  >
                    {item}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </View>
          <Pressable
            onPress={() => {
              setCancelOpen(false);
              router.push("/subscription-vacation");
            }}
            style={{
              gap: theme.spacing.xs,
              padding: theme.spacing.md,
              borderRadius: theme.radii.lg,
              backgroundColor: theme.colors.colorPrimaryTint,
            }}
          >
            <ThemedText variant="bodySmall" weight="semibold">
              Going out of town?
            </ThemedText>
            <ThemedText
              variant="caption"
              style={{ color: theme.colors.colorTextSecondary }}
            >
              You can pause deliveries instantly for any date range with zero
              cancellation fees.
            </ThemedText>
            <ThemedText
              variant="caption"
              weight="semibold"
              style={{ color: theme.colors.colorPrimary }}
            >
              Pause Instead
            </ThemedText>
          </Pressable>
          <Button onPress={() => setCancelOpen(false)}>
            Keep My Subscription →
          </Button>
          <Button
            variant="secondary"
            onPress={() => {
              setCancelOpen(false);
              router.replace("/subscriptions");
            }}
            style={{ backgroundColor: theme.colors.colorDangerTint }}
          >
            Cancel Anyway
          </Button>
        </View>
      </SubscriptionBottomSheet>
      <SubscriptionBottomSheet
        visible={editing !== null}
        onClose={() => setEditing(null)}
      >
        {editing ? (
          <ScheduleEditor
            title={
              editing === "quantity"
                ? "Change quantity"
                : editing === "days"
                  ? "Change delivery days"
                  : "Change delivery slot"
            }
            values={
              editing === "quantity"
                ? ["1 Litre", "2 Litres"]
                : editing === "days"
                  ? ["Mon–Sat", "Alternate Days", "Daily"]
                  : ["5–7 AM", "7–9 AM"]
            }
            current={
              editing === "quantity"
                ? quantity
                : editing === "days"
                  ? days
                  : slot
            }
            onCancel={() => setEditing(null)}
            onSave={(value) => {
              if (editing === "quantity") setQuantity(value);
              if (editing === "days") setDays(value);
              if (editing === "slot") setSlot(value);
              setEditing(null);
            }}
          />
        ) : null}
      </SubscriptionBottomSheet>
    </SafeAreaView>
  );
}

function ScheduleEditor({
  current,
  onCancel,
  onSave,
  title,
  values,
}: {
  current: string;
  onCancel: () => void;
  onSave: (value: string) => void;
  title: string;
  values: string[];
}) {
  const theme = useTheme();
  const [selected, setSelected] = useState(current);
  return (
    <View style={{ gap: theme.spacing.md }}>
      <ThemedText variant="h2">{title}</ThemedText>
      <View style={{ gap: theme.spacing.sm }}>
        {values.map((value) => (
          <Pressable
            key={value}
            onPress={() => setSelected(value)}
            style={{
              padding: theme.spacing.md,
              borderRadius: theme.radii.md,
              borderWidth:
                selected === value
                  ? theme.borderWidths.medium
                  : theme.borderWidths.hairline,
              borderColor:
                selected === value
                  ? theme.colors.colorPrimary
                  : theme.colors.colorBorder,
              backgroundColor: theme.colors.colorSurface,
            }}
          >
            <ThemedText variant="bodySmall" weight="semibold">
              {value}
            </ThemedText>
          </Pressable>
        ))}
      </View>
      <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
        <Button variant="secondary" style={{ flex: 1 }} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={{ flex: 1 }} onPress={() => onSave(selected)}>
          Save changes
        </Button>
      </View>
    </View>
  );
}

function SummaryRow({
  accent = false,
  detail,
  label,
  value,
}: {
  accent?: boolean;
  detail?: string;
  label: string;
  value: string;
}) {
  const theme = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        gap: theme.spacing.md,
        paddingBottom: theme.spacing.sm,
        borderBottomWidth: theme.borderWidths.hairline,
        borderColor: theme.colors.colorBorder,
      }}
    >
      <ThemedText
        variant="caption"
        style={{ color: theme.colors.colorTextSecondary }}
      >
        {label}
      </ThemedText>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <ThemedText
          variant="caption"
          weight="semibold"
          style={{
            color: accent
              ? theme.colors.colorPrimary
              : theme.colors.colorTextPrimary,
            textAlign: "right",
          }}
        >
          {value}
        </ThemedText>
        {detail ? (
          <ThemedText
            variant="caption"
            style={{ color: theme.colors.colorTextSecondary }}
          >
            {detail}
          </ThemedText>
        ) : null}
      </View>
    </View>
  );
}

function ManageRow({
  onPress,
  subtitle,
  title,
  value,
}: {
  onPress?: () => void;
  subtitle: string;
  title: string;
  value?: string;
}) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.md,
        padding: theme.spacing.md,
        borderTopWidth: theme.borderWidths.hairline,
        borderColor: theme.colors.colorBorder,
      }}
    >
      <View
        style={{
          width: theme.sizes.avatarMd,
          height: theme.sizes.avatarMd,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: theme.radii.pill,
          backgroundColor: theme.colors.colorSurfaceMuted,
        }}
      >
        <AppIcon icon={CalendarIcon} accessibilityLabel="" size="sm" />
      </View>
      <View style={{ flex: 1 }}>
        <ThemedText variant="bodySmall" weight="semibold">
          {title}
        </ThemedText>
        <ThemedText
          variant="caption"
          style={{ color: theme.colors.colorTextSecondary }}
        >
          {subtitle}
        </ThemedText>
      </View>
      {value ? (
        <View
          style={{
            borderRadius: theme.radii.pill,
            paddingHorizontal: theme.spacing.sm,
            paddingVertical: theme.spacing.xs,
            backgroundColor: theme.colors.colorSurfaceMuted,
          }}
        >
          <ThemedText variant="caption" weight="semibold">
            {value}
          </ThemedText>
        </View>
      ) : null}
      <ThemedText
        variant="body"
        style={{ color: theme.colors.colorTextSecondary }}
      >
        ›
      </ThemedText>
    </Pressable>
  );
}
