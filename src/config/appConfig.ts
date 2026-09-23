export const appConfig = { apiUrl: process.env.EXPO_PUBLIC_API_URL ?? '', dataSource: (process.env.EXPO_PUBLIC_DATA_SOURCE ?? 'mock') as 'mock' | 'api' } as const;
