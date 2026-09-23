import products from '../mock-data/products.json';
import type { Product } from '../types/models';

export async function getProducts(): Promise<Product[]> {
  return products as Product[];
}
