import type { PropsWithChildren } from "react";

import { Badge } from "../atoms/Badge";
import type { OrderStatus } from "../../types/models";

const variantByStatus: Record<OrderStatus, "info" | "success"> = {
  confirmed: "info",
  "out-for-delivery": "info",
  delivered: "success",
};

export function OrderStatusBadge({
  children,
  status,
}: PropsWithChildren<{ status: OrderStatus }>) {
  return <Badge variant={variantByStatus[status]}>{children}</Badge>;
}
