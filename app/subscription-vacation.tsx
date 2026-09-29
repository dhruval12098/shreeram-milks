import { Image } from "expo-image";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppIcon } from "../src/components/atoms/AppIcon";
import { Button } from "../src/components/atoms/Button";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { BackIcon, CalendarIcon } from "../src/icons/appIcons";
import { useTheme } from "../src/theme";

type Step = "products" | "dates" | "success";
type DateField = "pause" | "resume";

const subscriptions = [
  {
    id: "a2",
    name: "A2 Desi Gir Cow Milk",
    detail: "1L glass bottle • Daily morning",
    imageUrl:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=200&q=80",
  },
  {
    id: "buffalo",
    name: "Farm Fresh Buffalo Milk",
    detail: "1L glass bottle • Daily morning",
    imageUrl:
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=200&q=80&sat=-20",
  },
  {
    id: "dahi",
    name: "Organic Set Dahi",
    detail: "500g clay pot • Alternate days",
    imageUrl:
      "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=200&q=80",
  },
];

const calendarWeeks = [
  ["21 Oct", "22 Oct", "23 Oct", "24 Oct", "25 Oct", "26 Oct", "27 Oct"],
  ["28 Oct", "29 Oct", "30 Oct", "31 Oct", "01 Nov", "02 Nov", "03 Nov"],
  ["04 Nov", "05 Nov", "06 Nov", "07 Nov", "08 Nov", "09 Nov", "10 Nov"],
];

const calendarDates = calendarWeeks.flat().filter((date) => date.length > 0);

export default function SubscriptionVacationScreen() {
  const theme = useTheme();
  const [step, setStep] = useState<Step>("products");
  const [selectedIds, setSelectedIds] = useState<string[]>(["a2", "buffalo"]);
  const [activeDateField, setActiveDateField] = useState<DateField>("pause");
  const [pauseDate, setPauseDate] = useState("27 Oct");
  const [resumeDate, setResumeDate] = useState("06 Nov");

  const toggleSubscription = (id: string) =>
    setSelectedIds((items) =>
      items.includes(id) ? items.filter((item) => item !== id) : [...items, id],
    );
  const selectDate = (date: string) => {
    if (activeDateField === "pause") {
      setPauseDate(date);
      setActiveDateField("resume");
    } else setResumeDate(date);
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}
    >
      <StatusBar barStyle="dark-content" />
      <View style={{ flex: 1 }}>
        <Header
          onBack={() =>
            step === "products"
              ? router.back()
              : setStep(step === "dates" ? "products" : "dates")
          }
          step={step}
        />
        <View
          style={{
            flex: 1,
            gap: theme.spacing.lg,
            padding: theme.layout.screenHorizontalPadding,
          }}
        >
          <Progress step={step} />
          {step === "products" ? (
            <SelectProducts
              selectedIds={selectedIds}
              onToggle={toggleSubscription}
            />
          ) : null}
          {step === "dates" ? (
            <SelectDates
              activeField={activeDateField}
              onFieldChange={setActiveDateField}
              onDateSelect={selectDate}
              pauseDate={pauseDate}
              resumeDate={resumeDate}
            />
          ) : null}
          {step === "success" ? (
            <SuccessState pauseDate={pauseDate} resumeDate={resumeDate} />
          ) : null}
        </View>
        <View
          style={{
            paddingHorizontal: theme.layout.screenHorizontalPadding,
            paddingVertical: theme.spacing.md,
            backgroundColor: theme.colors.colorBackground,
          }}
        >
          {step === "products" ? (
            <Button
              disabled={selectedIds.length === 0}
              onPress={() => setStep("dates")}
            >
              Continue to dates →
            </Button>
          ) : null}
          {step === "dates" ? (
            <Button onPress={() => setStep("success")}>
              Confirm vacation (10 days)
            </Button>
          ) : null}
          {step === "success" ? (
            <Button onPress={() => router.replace("/subscriptions")}>
              Back to subscriptions
            </Button>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

function Header({ onBack, step }: { onBack: () => void; step: Step }) {
  const theme = useTheme();
  return (
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
        accessibilityLabel="Back"
        onPress={onBack}
      >
        <AppIcon icon={BackIcon} accessibilityLabel="" size="md" />
      </Pressable>
      <ThemedText variant="body" weight="semibold">
        {step === "success" ? "Vacation confirmed" : "Set Vacation"}
      </ThemedText>
      <ThemedText variant="body">?</ThemedText>
    </View>
  );
}

function Progress({ step }: { step: Step }) {
  const theme = useTheme();
  const current = step === "products" ? 1 : step === "dates" ? 2 : 3;
  return (
    <View style={{ gap: theme.spacing.sm }}>
      <ThemedText
        variant="caption"
        weight="semibold"
        style={{ color: theme.colors.colorTextSecondary }}
      >
        STEP {current} OF 3
      </ThemedText>
      <View style={{ flexDirection: "row", gap: theme.spacing.xs }}>
        {[1, 2, 3].map((item) => (
          <View
            key={item}
            style={{
              flex: 1,
              height: theme.spacing.xs,
              borderRadius: theme.radii.pill,
              backgroundColor:
                item <= current
                  ? theme.colors.colorPrimary
                  : theme.colors.colorBorder,
            }}
          />
        ))}
      </View>
    </View>
  );
}

function SelectProducts({
  onToggle,
  selectedIds,
}: {
  onToggle: (id: string) => void;
  selectedIds: string[];
}) {
  const theme = useTheme();
  return (
    <>
      <View style={{ gap: theme.spacing.xs }}>
        <ThemedText variant="body" weight="semibold">
          Pause deliveries
        </ThemedText>
        <ThemedText
          variant="bodySmall"
          style={{ color: theme.colors.colorTextSecondary }}
        >
          Choose the subscriptions to pause while you are travelling.
        </ThemedText>
      </View>
      <View style={{ gap: theme.spacing.sm }}>
        {subscriptions.map((subscription) => (
          <View
            key={subscription.id}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: theme.spacing.md,
              padding: theme.spacing.sm,
              borderRadius: theme.radii.lg,
              backgroundColor: theme.colors.colorSurface,
            }}
          >
            <Image
              source={{ uri: subscription.imageUrl }}
              contentFit="cover"
              style={{
                width: theme.sizes.avatarLg,
                height: theme.sizes.avatarLg,
                borderRadius: theme.radii.md,
              }}
            />
            <View style={{ flex: 1 }}>
              <ThemedText variant="bodySmall" weight="semibold">
                {subscription.name}
              </ThemedText>
              <ThemedText
                variant="caption"
                style={{ color: theme.colors.colorTextSecondary }}
              >
                {subscription.detail}
              </ThemedText>
            </View>
            <Pressable
              accessibilityRole="switch"
              accessibilityLabel={`Pause ${subscription.name}`}
              accessibilityState={{
                checked: selectedIds.includes(subscription.id),
              }}
              onPress={() => onToggle(subscription.id)}
              style={{
                width: theme.sizes.buttonHeight,
                height: theme.spacing.lg + theme.spacing.xs,
                justifyContent: "center",
                borderRadius: theme.radii.pill,
                padding: theme.spacing.xs,
                backgroundColor: selectedIds.includes(subscription.id)
                  ? theme.colors.colorPrimary
                  : theme.colors.colorBorder,
              }}
            >
              <View
                style={{
                  width: theme.spacing.md,
                  height: theme.spacing.md,
                  alignSelf: selectedIds.includes(subscription.id)
                    ? "flex-end"
                    : "flex-start",
                  borderRadius: theme.radii.pill,
                  backgroundColor: theme.colors.colorSurface,
                }}
              />
            </Pressable>
          </View>
        ))}
      </View>
      <InfoCard />
    </>
  );
}

function SelectDates({
  activeField,
  onDateSelect,
  onFieldChange,
  pauseDate,
  resumeDate,
}: {
  activeField: DateField;
  onDateSelect: (date: string) => void;
  onFieldChange: (field: DateField) => void;
  pauseDate: string;
  resumeDate: string;
}) {
  const theme = useTheme();
  return (
    <>
      <View style={{ gap: theme.spacing.xs }}>
        <ThemedText variant="body" weight="semibold">
          Select pause dates
        </ThemedText>
        <ThemedText
          variant="bodySmall"
          style={{ color: theme.colors.colorTextSecondary }}
        >
          Choose when deliveries pause and automatically resume.
        </ThemedText>
      </View>
      <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
        <DateCard
          active={activeField === "pause"}
          label="PAUSE FROM"
          value={pauseDate}
          onPress={() => onFieldChange("pause")}
        />
        <DateCard
          active={activeField === "resume"}
          label="RESUME ON"
          value={resumeDate}
          onPress={() => onFieldChange("resume")}
        />
      </View>
      <View
        style={{
          gap: theme.spacing.md,
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: theme.spacing.sm,
            }}
          >
            <ThemedText variant="bodySmall" weight="semibold">
              October – November
            </ThemedText>
            <View
              style={{
                borderRadius: theme.radii.pill,
                paddingHorizontal: theme.spacing.sm,
                paddingVertical: theme.spacing.xs,
                backgroundColor: theme.colors.colorSurfaceMuted,
              }}
            >
              <ThemedText
                variant="caption"
                style={{ color: theme.colors.colorTextSecondary }}
              >
                2024
              </ThemedText>
            </View>
          </View>
          <View style={{ flexDirection: "row", gap: theme.spacing.sm }}>
            <View
              style={{
                width: theme.sizes.avatarSm,
                height: theme.sizes.avatarSm,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: theme.radii.pill,
                backgroundColor: theme.colors.colorSurfaceMuted,
              }}
            >
              <ThemedText variant="bodySmall">‹</ThemedText>
            </View>
            <View
              style={{
                width: theme.sizes.avatarSm,
                height: theme.sizes.avatarSm,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: theme.radii.pill,
                backgroundColor: theme.colors.colorSurfaceMuted,
              }}
            >
              <ThemedText variant="bodySmall">›</ThemedText>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
            <View
              key={`${day}-${index}`}
              style={{
                flex: 1,
                alignItems: "center",
                paddingBottom: theme.spacing.xs,
              }}
            >
              <ThemedText
                variant="caption"
                weight="semibold"
                style={{ color: theme.colors.colorTextSecondary }}
              >
                {day}
              </ThemedText>
            </View>
          ))}
        </View>
        <View>
          {calendarWeeks.map((week, weekIndex) => (
            <View key={weekIndex} style={{ flexDirection: "row" }}>
              {week.map((date, dayIndex) => {
                const pauseIndex = calendarDates.indexOf(pauseDate);
                const resumeIndex = calendarDates.indexOf(resumeDate);
                const dateIndex = calendarDates.indexOf(date);
                const range =
                  Boolean(date) &&
                  dateIndex >= Math.min(pauseIndex, resumeIndex) &&
                  dateIndex < Math.max(pauseIndex, resumeIndex);
                const endpoint =
                  date === pauseDate ||
                  dateIndex === Math.max(pauseIndex, resumeIndex) - 1;
                const isResume = date === resumeDate;
                const isBeforePause =
                  dateIndex < Math.min(pauseIndex, resumeIndex);
                return (
                  <Pressable
                    key={`${weekIndex}-${dayIndex}`}
                    disabled={!date}
                    accessibilityRole="button"
                    accessibilityState={{ selected: endpoint }}
                    onPress={() => onDateSelect(date)}
                    style={{
                      flex: 1,
                      height: theme.sizes.avatarSm,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: range
                        ? theme.colors.colorPrimaryTint
                        : theme.colors.colorTransparent,
                    }}
                  >
                    {date ? (
                      <View
                        style={{
                          width: theme.sizes.avatarSm,
                          height: theme.sizes.avatarSm,
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: theme.radii.pill,
                          backgroundColor: endpoint
                            ? theme.colors.colorPrimary
                            : isResume
                              ? theme.colors.colorSurfaceMuted
                              : theme.colors.colorTransparent,
                        }}
                      >
                        <ThemedText
                          variant="caption"
                          weight={endpoint ? "semibold" : "regular"}
                          style={{
                            color: endpoint
                              ? theme.colors.colorTextInverse
                              : isBeforePause
                                ? theme.colors.colorTextDisabled
                                : theme.colors.colorTextPrimary,
                          }}
                        >
                          {date.split(" ")[0]}
                        </ThemedText>
                      </View>
                    ) : null}
                  </Pressable>
                );
              })}
            </View>
          ))}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: theme.spacing.md,
          }}
        >
          <ThemedText
            variant="caption"
            style={{ color: theme.colors.colorTextSecondary }}
          >
            ● Vacation range
          </ThemedText>
          <ThemedText
            variant="caption"
            style={{ color: theme.colors.colorTextSecondary }}
          >
            ● Deliveries resume ({resumeDate})
          </ThemedText>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: theme.spacing.md,
          borderRadius: theme.radii.md,
          backgroundColor: theme.colors.colorPrimaryTint,
        }}
      >
        <ThemedText variant="bodySmall" weight="semibold">
          Total pause duration
        </ThemedText>
        <ThemedText variant="bodySmall" weight="semibold">
          10 Days
        </ThemedText>
      </View>
      <InfoCard />
    </>
  );
}

function DateCard({
  active,
  label,
  onPress,
  value,
}: {
  active: boolean;
  label: string;
  onPress: () => void;
  value: string;
}) {
  const theme = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      style={{
        flex: 1,
        gap: theme.spacing.xs,
        padding: theme.spacing.md,
        borderRadius: theme.radii.lg,
        borderWidth: active
          ? theme.borderWidths.medium
          : theme.borderWidths.hairline,
        borderColor: active
          ? theme.colors.colorPrimary
          : theme.colors.colorBorder,
        backgroundColor: theme.colors.colorSurface,
      }}
    >
      <ThemedText
        variant="caption"
        weight="semibold"
        style={{ color: theme.colors.colorTextPrimary }}
      >
        {label}
      </ThemedText>
      <ThemedText variant="bodySmall" weight="semibold">
        {value}
      </ThemedText>
      <ThemedText
        variant="caption"
        style={{ color: theme.colors.colorTextSecondary }}
      >
        {active ? "Selecting" : "Tap to edit"}
      </ThemedText>
    </Pressable>
  );
}

function InfoCard() {
  const theme = useTheme();
  return (
    <View
      style={{
        gap: theme.spacing.xs,
        padding: theme.spacing.md,
        borderRadius: theme.radii.lg,
        backgroundColor: theme.colors.colorSurfaceMuted,
      }}
    >
      <ThemedText variant="bodySmall" weight="semibold">
        Zero Billing Guarantee
      </ThemedText>
      <ThemedText
        variant="caption"
        style={{ color: theme.colors.colorTextSecondary }}
      >
        No charges for paused days. Unused wallet balances remain untouched and
        billing automatically adjusts.
      </ThemedText>
    </View>
  );
}

function SuccessState({
  pauseDate,
  resumeDate,
}: {
  pauseDate: string;
  resumeDate: string;
}) {
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: theme.spacing.md,
      }}
    >
      <View
        style={{
          width: theme.sizes.avatarLg * 2,
          height: theme.sizes.avatarLg * 2,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: theme.radii.pill,
          backgroundColor: theme.colors.colorPrimary,
        }}
      >
        <ThemedText
          variant="h1"
          style={{ color: theme.colors.colorTextInverse }}
        >
          ✓
        </ThemedText>
      </View>
      <ThemedText variant="h2">Vacation pause is set</ThemedText>
      <ThemedText
        variant="bodySmall"
        style={{ color: theme.colors.colorTextSecondary, textAlign: "center" }}
      >
        Your selected deliveries pause from {pauseDate} and resume automatically
        on {resumeDate}.
      </ThemedText>
    </View>
  );
}
