import orders from "../mock-data/orders.json";
import type { Order } from "../types/models";

export async function getOrders(): Promise<Order[]> {
  return orders as Order[];
}

export async function getOrderById(
  orderId: string,
): Promise<Order | undefined> {
  const allOrders = await getOrders();
  return allOrders.find((order) => order.id === orderId);
}
