import { AuthService } from '../api';
import { AuthStoreType } from './types';

const authService = new AuthService();
export const initAuthStore = {
    authService,
} satisfies AuthStoreType;
