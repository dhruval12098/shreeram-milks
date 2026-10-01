import { useQuery } from "@tanstack/react-query";

import { getOrderById, getOrders } from "../services/orderService";
import { queryKeys } from "../services/queryKeys";
import { useAppStore } from "../store/useAppStore";

export function useOrders() {
  const previewOrder = useAppStore((state) => state.previewOrder);
  const query = useQuery({
    queryKey: queryKeys.orders,
    queryFn: getOrders,
    staleTime: 30 * 1000,
  });
  return { ...query, data: query.data ? previewOrder ? [previewOrder, ...query.data] : query.data : query.data };
}

export function useOrder(orderId?: string) {
  const previewOrder = useAppStore((state) => state.previewOrder);
  return useQuery({
    queryKey: [...queryKeys.orders, orderId],
    queryFn: () => previewOrder?.id === orderId ? previewOrder : getOrderById(orderId ?? ""),
    enabled: Boolean(orderId),
    staleTime: 30 * 1000,
  });
}
