import { CalendarIcon, ShieldIcon } from "../src/icons/appIcons";
import { ProfileDetailScreen } from "../src/components/organisms/ProfileDetailScreen";

export default function DeliveryCalendarScreen() {
  return (
    <ProfileDetailScreen
      title="Delivery Calendar & Holds"
      subtitle="Review upcoming deliveries or manage a planned pause."
      rows={[
        {
          icon: CalendarIcon,
          title: "Tomorrow, 25 Oct",
          detail: "A2 Gir Cow Milk · Morning 5:00 – 7:00 AM",
        },
        {
          icon: CalendarIcon,
          title: "Friday, 26 Oct",
          detail: "Organic Set Curd · Morning 5:00 – 7:00 AM",
        },
        {
          icon: ShieldIcon,
          title: "Set a vacation hold",
          detail: "Pause selected subscriptions while you are away",
        },
      ]}
    />
  );
}
