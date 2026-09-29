import { LocationIcon } from "../src/icons/appIcons";
import { ProfileDetailScreen } from "../src/components/organisms/ProfileDetailScreen";
export default function DeliveryAddressesScreen() {
  return (
    <ProfileDetailScreen
      title="Delivery Addresses"
      subtitle="Choose where your fresh delivery should arrive."
      rows={[
        {
          icon: LocationIcon,
          title: "Home · Default",
          detail: "Flat 402, Greenfield Apts, Satara",
        },
        {
          icon: LocationIcon,
          title: "Work",
          detail: "Satara Gausala Hub, Satara",
        },
      ]}
    />
  );
}
