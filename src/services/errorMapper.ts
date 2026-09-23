import i18n from '../lib/i18n';
import type { ApiError } from './apiClient';
export function getErrorMessage(error: ApiError) { return i18n.t(`errors.${error.code}`, { defaultValue: i18n.t('errors.UNKNOWN_ERROR') }); }
