import { router, useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, StatusBar, Switch, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import { Button } from "../src/components/atoms/Button";
import { ThemedText } from "../src/components/atoms/ThemedText";
import { Chip } from "../src/components/atoms/Chip";
import { FormField } from "../src/components/molecules/FormField";
import { ScreenHeader } from "../src/components/molecules/ScreenHeader";
import { useAppStore } from "../src/store/useAppStore";
import { useTheme } from "../src/theme";
import type { AddressType, DeliveryAddress } from "../src/types/models";

type AddressFormValues = Omit<DeliveryAddress, "id" | "isServiceable">;

export default function DeliveryAddressFormScreen() {
  const theme = useTheme();
  const { t } = useTranslation();
  const { addressId } = useLocalSearchParams<{ addressId?: string }>();
  const addresses = useAppStore((state) => state.addresses);
  const addAddress = useAppStore((state) => state.addAddress);
  const updateAddress = useAppStore((state) => state.updateAddress);
  const existing = addresses.find((address) => address.id === addressId);
  const { control, formState: { errors, isSubmitting }, handleSubmit, setValue, watch } = useForm<AddressFormValues>({
    defaultValues: existing ?? { addressType: "home", city: "Satara", fullName: "", isDefault: addresses.length === 0, landmark: "", line1: "", line2: "", phone: "", pincode: "" },
  });
  const addressType = watch("addressType");
  const isDefault = watch("isDefault");

  const submit = (values: AddressFormValues) => {
    const normalized = { ...values, phone: values.phone.replace(/\D/g, "") };
    if (existing) updateAddress({ ...existing, ...normalized });
    else addAddress({ ...normalized, isServiceable: normalized.pincode === "415001" });
    router.back();
  };

  return <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.colorBackground }}><StatusBar barStyle="dark-content" /><View style={{ flex: 1, paddingHorizontal: theme.layout.screenHorizontalPadding }}><ScreenHeader backLabel={t("commonActions.back")} title={t(existing ? "addresses.formTitleEdit" : "addresses.formTitleAdd")} /><ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ gap: theme.spacing.md, paddingVertical: theme.spacing.md, paddingBottom: theme.spacing.xxl }}>
    <Controller control={control} name="fullName" rules={{ required: t("addresses.required") }} render={({ field: { onChange, value } }) => <FormField label={t("addresses.fullName")} value={value} onChangeText={onChange} error={errors.fullName?.message} autoComplete="name" returnKeyType="next" />} />
    <Controller control={control} name="phone" rules={{ required: t("addresses.required"), pattern: { value: /^[6-9]\d{9}$/, message: t("addresses.invalidPhone") } }} render={({ field: { onChange, value } }) => <FormField label={t("addresses.mobile")} value={value} onChangeText={onChange} error={errors.phone?.message} keyboardType="phone-pad" maxLength={10} autoComplete="tel" />} />
    <Controller control={control} name="line1" rules={{ required: t("addresses.required") }} render={({ field: { onChange, value } }) => <FormField label={t("addresses.line1")} value={value} onChangeText={onChange} error={errors.line1?.message} />} />
    <Controller control={control} name="line2" rules={{ required: t("addresses.required") }} render={({ field: { onChange, value } }) => <FormField label={t("addresses.line2")} value={value} onChangeText={onChange} error={errors.line2?.message} />} />
    <Controller control={control} name="landmark" render={({ field: { onChange, value } }) => <FormField label={t("addresses.landmark")} value={value} onChangeText={onChange} />} />
    <Controller control={control} name="pincode" rules={{ required: t("addresses.required"), pattern: { value: /^\d{6}$/, message: t("addresses.invalidPincode") } }} render={({ field: { onChange, value } }) => <FormField label={t("addresses.pincode")} value={value} onChangeText={onChange} error={errors.pincode?.message} keyboardType="number-pad" maxLength={6} />} />
    <Controller control={control} name="city" rules={{ required: t("addresses.required") }} render={({ field: { onChange, value } }) => <FormField label={t("addresses.city")} value={value} onChangeText={onChange} error={errors.city?.message} />} />
    <View style={{ gap: theme.spacing.sm }}><ThemedText variant="bodySmall">{t("addresses.type")}</ThemedText><View style={{ flexDirection: "row", gap: theme.spacing.sm }}>{(["home", "work", "other"] as AddressType[]).map((type) => <Chip key={type} selected={addressType === type} onPress={() => setValue("addressType", type)}>{t(`addresses.${type}`)}</Chip>)}</View></View>
    <View style={{ minHeight: theme.layout.touchTargetMin, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: theme.spacing.md }}><ThemedText variant="bodySmall" style={{ flex: 1 }}>{t("addresses.setDefault")}</ThemedText><Switch accessibilityLabel={t("addresses.setDefault")} value={isDefault} onValueChange={(value) => setValue("isDefault", value)} trackColor={{ false: theme.colors.colorSurfaceDisabled, true: theme.colors.colorPrimaryTint }} thumbColor={isDefault ? theme.colors.colorPrimary : theme.colors.colorTextDisabled} /></View>
    <Button loading={isSubmitting} onPress={handleSubmit(submit)}>{t(isSubmitting ? "addresses.saving" : "addresses.save")}</Button>
  </ScrollView></View></SafeAreaView>;
}
