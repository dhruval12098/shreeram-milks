import { appConfig } from '../config/appConfig';

export interface ApiError {
  code: string;
  message?: string;
}

/** Future HTTP boundary. Screens consume domain services, never this client directly. */
export const apiClient = { baseUrl: appConfig.apiUrl };
