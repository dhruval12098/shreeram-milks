import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../src/components/atoms/Button";
import { AppIcon } from "../src/components/atoms/AppIcon";
import { IconButton } from "../src/components/atoms/IconButton";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { ScreenHeader } from "../src/components/molecules/ScreenHeader";
import { StateMessage } from "../src/components/organisms/StateMessage";
import { useDeliveryCalendar } from "../src/hooks/useDeliveryCalendar";
import { BackIcon, CalendarIcon, ForwardIcon } from "../src/icons/appIcons";
import { useAppStore } from "../src/store/useAppStore";
import { useTheme } from "../src/theme";
import type { DeliveryState } from "../src/types/models";

const weekdays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
const dateKey = (year: number, month: number, day: number) => `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

export default function DeliveryCalendarScreen() {
  const theme = useTheme();
  const { t, i18n } = useTranslation();
  const { data: deliveries = [], isError, isLoading, refetch } = useDeliveryCalendar();
  const overrides = useAppStore((state) => state.deliveryOverrides);
  const setDeliveryState = useAppStore((state) => state.setDeliveryState);
  const [monthOffset, setMonthOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState(() => new Date().getDate());
  const today = new Date();
  const displayed = new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
  const year = displayed.getFullYear();
  const monthIndex = displayed.getMonth();
  const monthName = displayed.toLocaleDateString(i18n.language, { month: "long", year: "numeric" });
  const leadingDays = (displayed.getDay() + 6) % 7;
  const dayCount = new Date(year, monthIndex + 1, 0).getDate();
  const dates = Array.from({ length: leadingDays + dayCount }, (_, index) => {
    const day = index - leadingDays + 1;
    const entry = day > 0 ? deliveries.find((delivery) => delivery.date === dateKey(year, monthIndex, day)) : undefined;
    return { day, entry, state: entry ? overrides[entry.id] ?? entry.state : undefined };
  });
  const selectedEntry = deliveries.find((delivery) => delivery.date === dateKey(year, monthIndex, selectedDay));
  const selected = selectedEntry ? { ...selectedEntry, state: overrides[selectedEntry.id] ?? selectedEntry.state } : undefined;
  const colorFor = (state?: DeliveryState) => state === "scheduled" ? theme.colors.colorPrimary : state === "delivered" ? theme.colors.colorInfo : state === "paused" ? theme.colors.colorWarning : state === "skipped" ? theme.colors.colorDanger : theme.colors.colorSurface;
  const changeMonth = (delta: number) => { setMonthOffset((value) => value + delta); setSelectedDay(1); };

  if (isLoading || isError) return <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}><StateMessage type={isError ? "error" : "loading"} title={t(isError ? "errors.UNKNOWN_ERROR" : "calendar.title")} actionLabel={isError ? t("common.retry") : undefined} onAction={isError ? () => refetch() : undefined} /></SafeAreaView>;

  return <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}>
    <StatusBar barStyle="dark-content" />
    <View style={{ flex: 1, paddingHorizontal: theme.layout.screenHorizontalPadding }}>
      <ScreenHeader backLabel={t("commonActions.back")} title={t("calendar.title")} />
      <ScrollView contentContainerStyle={{ gap: theme.spacing.md, paddingVertical: theme.spacing.md, paddingBottom: theme.spacing.xxl }}>
        <ThemedText variant="bodySmall" style={{ color: theme.colors.colorTextSecondary }}>{t("calendar.subtitle")}</ThemedText>
        <View style={{ padding: theme.spacing.md, gap: theme.spacing.md, borderRadius: theme.radii.lg, backgroundColor: theme.colors.colorSurface }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <IconButton icon={BackIcon} label={t("calendar.previous")} onPress={() => changeMonth(-1)} />
            <ThemedText variant="body" weight="semibold">{monthName}</ThemedText>
            <IconButton icon={ForwardIcon} label={t("calendar.next")} onPress={() => changeMonth(1)} />
          </View>
          <View style={{ flexDirection: "row" }}>{weekdays.map((day) => <ThemedText key={day} variant="caption" style={{ flex: 1, textAlign: "center", color: theme.colors.colorTextSecondary }}>{t(`calendar.${day}`)}</ThemedText>)}</View>
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>{dates.map((date, index) => date.day > 0 ? <Pressable key={date.day} accessibilityRole="button" accessibilityLabel={new Date(year, monthIndex, date.day).toLocaleDateString(i18n.language, { day: "numeric", month: "long", year: "numeric" })} accessibilityState={{ selected: date.day === selectedDay }} onPress={() => setSelectedDay(date.day)} style={({ pressed }) => ({ width: "14.285%", height: theme.layout.touchTargetMin, alignItems: "center", justifyContent: "center", opacity: pressed ? theme.opacity.subdued : theme.opacity.full })}><View style={{ width: theme.sizes.avatarSm, height: theme.sizes.avatarSm, borderRadius: theme.radii.pill, alignItems: "center", justifyContent: "center", borderWidth: date.day === selectedDay ? theme.borderWidths.medium : theme.borderWidths.none, borderColor: theme.colors.colorPrimary, backgroundColor: colorFor(date.state) }}><ThemedText variant="caption" weight="semibold" style={{ color: date.state ? theme.colors.colorTextInverse : theme.colors.colorTextPrimary }}>{date.day}</ThemedText></View></Pressable> : <View key={`blank-${index}`} style={{ width: "14.285%", height: theme.layout.touchTargetMin }} />)}</View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: theme.spacing.sm }}>{(["scheduled", "delivered", "paused", "skipped"] as DeliveryState[]).map((state) => <View key={state} style={{ flexDirection: "row", gap: theme.spacing.xs, alignItems: "center" }}><View style={{ width: theme.spacing.sm, height: theme.spacing.sm, borderRadius: theme.radii.pill, backgroundColor: colorFor(state) }} /><ThemedText variant="caption">{t(`calendar.${state}`)}</ThemedText></View>)}</View>
        </View>
        {selected ? <View style={{ gap: theme.spacing.sm, padding: theme.spacing.md, borderRadius: theme.radii.lg, backgroundColor: theme.colors.colorSurfaceMuted }}><ThemedText variant="overline" style={{ color: theme.colors.colorTextSecondary }}>{t("calendar.selected")}</ThemedText><ThemedText variant="body" weight="semibold">{selected.productName} · {selected.quantity}</ThemedText><ThemedText variant="bodySmall" style={{ color: theme.colors.colorTextSecondary }}>{selected.timeSlot} · {selected.addressLabel}</ThemedText><ThemedText variant="caption" weight="semibold" style={{ color: theme.colors.colorPrimary }}>{t(`calendar.${selected.state}`)}</ThemedText>{selected.state === "scheduled" ? <View style={{ flexDirection: "row", gap: theme.spacing.sm }}><Button style={{ flex: 1 }} variant="secondary" onPress={() => setDeliveryState(selected.id, "skipped")}>{t("calendar.skip")}</Button><Button style={{ flex: 1 }} onPress={() => router.push("/subscription-vacation")}>{t("calendar.pause")}</Button></View> : <Button variant="secondary" onPress={() => router.push("/subscription-manage")}>{t("calendar.manage")}</Button>}</View> : <StateMessage type="empty" icon={CalendarIcon} title={t("calendar.noDelivery")} description={t("calendar.noDeliveryDetail")} actionLabel={t("calendar.manage")} onAction={() => router.push("/subscription-manage")} />}
      </ScrollView>
    </View>
  </SafeAreaView>;
}
