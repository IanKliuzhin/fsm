import { initProductListStore } from 'features/ProductList/model';
import { DispatchType } from 'store';
import type { AuthService } from '../api';
import { AuthTransitionTypes } from './types';

export const useCheckAuth =
    (dispatch: DispatchType, authService: AuthService) => () => {
        authService
            .checkAuth()
            .then((result: boolean) => {
                if (result) {
                    dispatch({
                        type: AuthTransitionTypes.CHECKING_AUTH__LOADING_PRODUCTS,
                        payload: { ...initProductListStore },
                    });
                } else {
                    dispatch({
                        type: AuthTransitionTypes.CHECKING_AUTH__NOT_AUTHENTICATED,
                        payload: {},
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

export const useAuthenticate =
    (dispatch: DispatchType, authService: AuthService) =>
    (username: string, password: string) => {
        authService
            .authenticate({ username, password })
            .then(() => {
                dispatch({
                    type: AuthTransitionTypes.AUTHENTICATING__LOADING_PRODUCTS,
                    payload: { ...initProductListStore },
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
