export type AppLanguage = "en" | "gu";

export interface Product {
  category: "Milk" | "Curd" | "Paneer" | "Ghee" | "Butter";
  id: string;
  name: string;
  nameGujarati: string;
  description: string;
  price: number;
  unit: string;
  imageUrl: string | null;
  isAvailable: boolean;
}

export interface ServiceArea {
  pincode: string;
  locality: string;
  isServiceable: boolean;
}

export interface DemoUser {
  id: string;
  phone: string;
  name: string;
}

export type OrderStatus = "out-for-delivery" | "delivered";

export interface OrderItem {
  imageUrl: string | null;
  name: string;
  quantity: number;
  total: number;
  unit: string;
}

export interface Order {
  address: string;
  deliveryWindow: string;
  id: string;
  items: OrderItem[];
  placedAt: string;
  status: OrderStatus;
  total: number;
}
