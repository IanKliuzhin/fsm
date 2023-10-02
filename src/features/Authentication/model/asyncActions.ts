import {
    LoadingProductsState,
    initProductListStore,
} from 'features/ProductList/model';
import { ActionType, ProtoTransition } from 'lib/FSM';
import { DispatchType } from 'store';
import { AuthService } from '../api';
import { AuthTransitionTypes, CheckingAuthState } from './types';

export const useCheckAuth =
    (dispatch: DispatchType, authService: AuthService) => () => {
        authService
            .checkAuth()
            .then((result: boolean) => {
                if (result) {
                    dispatch({
                        type: AuthTransitionTypes.CHECKING_AUTH__LOADING_PRODUCTS,
                        payload: { ...initProductListStore },
                    } satisfies ActionType<
                        CheckingAuthState,
                        LoadingProductsState,
                        ProtoTransition<CheckingAuthState, LoadingProductsState>
                    >);
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
