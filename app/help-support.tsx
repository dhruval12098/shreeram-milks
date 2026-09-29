import { HelpIcon, PhoneIcon, CalendarIcon } from "../src/icons/appIcons";
import { ProfileDetailScreen } from "../src/components/organisms/ProfileDetailScreen";
export default function HelpSupportScreen() {
  return (
    <ProfileDetailScreen
      title="Help & Support"
      subtitle="We are here to help with your deliveries and subscriptions."
      rows={[
        {
          icon: PhoneIcon,
          title: "Call ShreeRam Support",
          detail: "Available 5:00 AM – 8:00 PM",
        },
        {
          icon: CalendarIcon,
          title: "Subscription help",
          detail: "Pause, skip or change your delivery schedule",
        },
        {
          icon: HelpIcon,
          title: "Frequently asked questions",
          detail: "Find quick answers about orders and wallets",
        },
      ]}
    />
  );
}
