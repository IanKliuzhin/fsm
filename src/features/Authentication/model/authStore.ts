import { Stages } from 'store/enums';
import { AuthService } from '../api';
import { CheckingAuthState } from './types';

const authService = new AuthService();
export const initAuthState = {
    stage: Stages.CHECKING_AUTH,
    data: {
        authService,
    },
} satisfies CheckingAuthState;
