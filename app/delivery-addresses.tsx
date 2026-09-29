import { router } from "expo-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, ScrollView, StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AppIcon } from "../src/components/atoms/AppIcon";
import { Badge } from "../src/components/atoms/Badge";
import { Button } from "../src/components/atoms/Button";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { ScreenHeader } from "../src/components/molecules/ScreenHeader";
import { StateMessage } from "../src/components/organisms/StateMessage";
import { SubscriptionBottomSheet } from "../src/components/organisms/SubscriptionBottomSheet";
import { CloseIcon, EditIcon, LocationIcon } from "../src/icons/appIcons";
import { useAppStore } from "../src/store/useAppStore";
import { useTheme } from "../src/theme";
import type { DeliveryAddress } from "../src/types/models";

export default function DeliveryAddressesScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const addresses = useAppStore((state) => state.addresses);
  const deleteAddress = useAppStore((state) => state.deleteAddress);
  const [pendingDelete, setPendingDelete] = useState<DeliveryAddress | null>(null);

  return <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}><StatusBar barStyle="dark-content" /><View style={{ flex: 1, paddingHorizontal: theme.layout.screenHorizontalPadding }}><ScreenHeader backLabel={t("commonActions.back")} title={t("addresses.title")} /><ScrollView contentContainerStyle={{ gap: theme.spacing.md, paddingVertical: theme.spacing.md, paddingBottom: theme.spacing.xxl }}><ThemedText variant="bodySmall" style={{ color: theme.colors.colorTextSecondary }}>{t("addresses.subtitle")}</ThemedText>{addresses.length === 0 ? <StateMessage type="empty" icon={LocationIcon} title={t("addresses.emptyTitle")} description={t("addresses.emptyDescription")} /> : addresses.map((address) => <AddressCard key={address.id} address={address} onEdit={() => router.push({ pathname: "/delivery-address-form", params: { addressId: address.id } })} onDelete={() => setPendingDelete(address)} />)}<Button onPress={() => router.push("/delivery-address-form")}>{t("addresses.add")}</Button></ScrollView></View><SubscriptionBottomSheet visible={pendingDelete !== null} onClose={() => setPendingDelete(null)}><View style={{ gap: theme.spacing.md }}><ThemedText variant="h2">{t("addresses.deleteTitle")}</ThemedText><ThemedText style={{ color: theme.colors.colorTextSecondary }}>{t("addresses.deleteDescription")}</ThemedText><View style={{ flexDirection: "row", gap: theme.spacing.sm }}><Button style={{ flex: 1 }} variant="secondary" onPress={() => setPendingDelete(null)}>{t("addresses.cancel")}</Button><Button style={{ flex: 1 }} variant="danger" onPress={() => { if (pendingDelete) deleteAddress(pendingDelete.id); setPendingDelete(null); }}>{t("addresses.confirmDelete")}</Button></View></View></SubscriptionBottomSheet></SafeAreaView>;
}

function AddressCard({ address, onDelete, onEdit }: { address: DeliveryAddress; onDelete: () => void; onEdit: () => void }) {
  const theme = useTheme();
  const { t } = useTranslation();
  return <View style={{ gap: theme.spacing.sm, padding: theme.spacing.md, borderRadius: theme.radii.lg, borderWidth: theme.borderWidths.hairline, borderColor: address.isServiceable ? theme.colors.colorBorder : theme.colors.colorDanger, backgroundColor: theme.colors.colorSurface }}><View style={{ flexDirection: "row", alignItems: "center", gap: theme.spacing.sm }}><View style={{ width: theme.sizes.avatarMd, height: theme.sizes.avatarMd, alignItems: "center", justifyContent: "center", borderRadius: theme.radii.md, backgroundColor: theme.colors.colorPrimaryTint }}><AppIcon icon={LocationIcon} accessibilityLabel="" size="sm" /></View><View style={{ flex: 1 }}><ThemedText variant="body" weight="semibold">{t(`addresses.${address.addressType}`)}</ThemedText><ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary }}>{address.fullName} · {address.phone}</ThemedText></View>{address.isDefault ? <Badge>{t("addresses.default")}</Badge> : null}</View><ThemedText variant="bodySmall">{address.line1}, {address.line2}</ThemedText>{address.landmark ? <ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary }}>{address.landmark}</ThemedText> : null}<ThemedText variant="caption" style={{ color: theme.colors.colorTextSecondary }}>{address.city} · {address.pincode}</ThemedText><ThemedText variant="caption" weight="semibold" style={{ color: address.isServiceable ? theme.colors.colorPrimary : theme.colors.colorDanger }}>{t(address.isServiceable ? "addresses.serviceable" : "addresses.notServiceable")}</ThemedText><View style={{ flexDirection: "row", justifyContent: "flex-end", gap: theme.spacing.sm }}><Pressable accessibilityRole="button" accessibilityLabel={t("addresses.edit")} hitSlop={theme.spacing.sm} onPress={onEdit} style={{ width: theme.layout.touchTargetMin, height: theme.layout.touchTargetMin, alignItems: "center", justifyContent: "center" }}><AppIcon icon={EditIcon} accessibilityLabel="" size="sm" tone="secondary" /></Pressable><Pressable accessibilityRole="button" accessibilityLabel={t("addresses.delete")} hitSlop={theme.spacing.sm} onPress={onDelete} style={{ width: theme.layout.touchTargetMin, height: theme.layout.touchTargetMin, alignItems: "center", justifyContent: "center" }}><AppIcon icon={CloseIcon} accessibilityLabel="" size="sm" tone="secondary" /></Pressable></View></View>;
}
