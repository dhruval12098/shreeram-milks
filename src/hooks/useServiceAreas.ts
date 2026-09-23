import { useQuery } from '@tanstack/react-query';

import { queryKeys } from '../services/queryKeys';
import { getServiceAreas } from '../services/serviceAreaService';

export function useServiceAreas() {
  return useQuery({ queryKey: queryKeys.serviceAreas, queryFn: getServiceAreas, staleTime: 5 * 60 * 1000 });
}
