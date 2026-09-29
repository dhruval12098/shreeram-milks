import { useQuery } from "@tanstack/react-query";

import { getOrderById, getOrders } from "../services/orderService";
import { queryKeys } from "../services/queryKeys";

export function useOrders() {
  return useQuery({
    queryKey: queryKeys.orders,
    queryFn: getOrders,
    staleTime: 30 * 1000,
  });
}

export function useOrder(orderId?: string) {
  return useQuery({
    queryKey: [...queryKeys.orders, orderId],
    queryFn: () => getOrderById(orderId ?? ""),
    enabled: Boolean(orderId),
    staleTime: 30 * 1000,
  });
}
