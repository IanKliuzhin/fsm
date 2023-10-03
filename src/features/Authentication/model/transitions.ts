import {
    LoadingProductsState,
    initProductListStore,
} from 'features/ProductList/model';
import { ProductListStages } from 'features/ProductList/model/enums';
import { ProtoTransition } from 'lib/FSM';
import { AuthStages, AuthTransitionTypes } from './enums';
import { NotAuthenticatedState, AuthenticatingState } from './types';

export const trNotAuthToAuthenticating = {
    type: AuthTransitionTypes.NOT_AUTHENTICATED__AUTHENTICATING,
    from: AuthStages.NOT_AUTHENTICATED,
    to: AuthStages.AUTHENTICATING,
    collectData: (state) => ({
        ...state.data,
        authError: null,
    }),
} satisfies ProtoTransition<NotAuthenticatedState, AuthenticatingState>;

export const trAuthenticatingToNotAuthenticated = {
    type: AuthTransitionTypes.AUTHENTICATING__NOT_AUTHENTICATED,
    from: AuthStages.AUTHENTICATING,
    to: AuthStages.NOT_AUTHENTICATED,
    collectData: (state, { authError }: { authError: string }) => ({
        ...state.data,
        authError,
    }),
} satisfies ProtoTransition<AuthenticatingState, NotAuthenticatedState>;

export const trAuthenticatingToLoadingProducts = {
    type: AuthTransitionTypes.AUTHENTICATING__LOADING_PRODUCTS,
    from: AuthStages.AUTHENTICATING,
    to: ProductListStages.LOADING_PRODUCTS,
    collectData: (state, { profile }) => ({
        ...state.data,
        ...initProductListStore,
        authError: null,
        profile,
    }),
} satisfies ProtoTransition<AuthenticatingState, LoadingProductsState>;
