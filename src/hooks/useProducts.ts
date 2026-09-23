import { useQuery } from '@tanstack/react-query';

import { getProducts } from '../services/productService';
import { queryKeys } from '../services/queryKeys';

export function useProducts() {
  return useQuery({ queryKey: queryKeys.products, queryFn: getProducts, staleTime: 5 * 60 * 1000 });
}
