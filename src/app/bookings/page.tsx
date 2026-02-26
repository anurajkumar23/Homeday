import ComingSoon from "@/components/shared/ComingSoon";
import { CalendarCheck } from "lucide-react";

export default function BookingsPage() {
    return (
        <ComingSoon
            title="My Bookings"
            description="Your booking history and upcoming scheduled services will appear here soon. Stay tuned!"
            iconName="CalendarCheck"
        />
    );
}
