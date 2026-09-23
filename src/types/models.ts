export type AppLanguage = 'en' | 'gu';

export interface Product {
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
