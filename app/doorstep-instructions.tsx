import { ShieldIcon, CalendarIcon } from "../src/icons/appIcons";
import { ProfileDetailScreen } from "../src/components/organisms/ProfileDetailScreen";
export default function DoorstepInstructionsScreen() {
  return (
    <ProfileDetailScreen
      title="Doorstep Instructions"
      subtitle="Your rider will follow these instructions for every morning delivery."
      rows={[
        {
          icon: ShieldIcon,
          title: "Silent Drop",
          detail: "Do not ring the bell before 7:00 AM",
        },
        {
          icon: CalendarIcon,
          title: "Drop Location",
          detail: "Leave in the cooler bag near the front door",
        },
      ]}
    />
  );
}
