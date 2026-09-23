import areas from '../mock-data/service-areas.json';
import type { ServiceArea } from '../types/models';

export async function getServiceAreas(): Promise<ServiceArea[]> {
  return areas as ServiceArea[];
}
