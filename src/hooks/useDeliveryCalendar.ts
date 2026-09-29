import { useQuery } from "@tanstack/react-query";
import { getDeliveryCalendar } from "../services/deliveryService";

export function useDeliveryCalendar() {
  return useQuery({ queryKey: ["delivery-calendar"], queryFn: getDeliveryCalendar, staleTime: 30 * 1000 });
}
