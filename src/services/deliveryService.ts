import deliveries from "../mock-data/deliveries.json";
import type { DeliveryCalendarEntry } from "../types/models";

export async function getDeliveryCalendar(): Promise<DeliveryCalendarEntry[]> {
  return deliveries as DeliveryCalendarEntry[];
}
