import { DispatchType } from 'store';
import type { AuthService } from '../api';
import { AuthTransitionTypes } from './enums';

export const useAuthenticate =
    (dispatch: DispatchType, authService: AuthService) =>
    (username: string, password: string) => {
        authService
            .authenticate({ username, password })
            .then((profile) => {
                dispatch({
                    type: AuthTransitionTypes.AUTHENTICATING__LOADING_PRODUCTS,
                    payload: { profile },
                });
            })
            .catch(() => {
                dispatch({
                    type: AuthTransitionTypes.AUTHENTICATING__NOT_AUTHENTICATED,
                    payload: {
                        authError: 'Invalid username/password. Try again.',
                    },
                });
            });
    };
