import {
    LoadingProductsState,
    ProductListStages,
    initProductListStore,
} from 'features/ProductList/model';
import { ProtoTransition } from 'lib/FSM';
import {
    CheckingAuthState,
    NotAuthenticatedState,
    AuthenticatingState,
    AuthTransitionTypes,
    AuthStages,
} from './types';

export const trCheckingAuthToNotAuthenticated = {
    type: AuthTransitionTypes.CHECKING_AUTH__NOT_AUTHENTICATED,
    from: AuthStages.CHECKING_AUTH,
    to: AuthStages.NOT_AUTHENTICATED,
    collectData: (state) => ({
        ...state.data,
    }),
} satisfies ProtoTransition<CheckingAuthState, NotAuthenticatedState>;

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
    collectData: (state, { authError }) => ({
        ...state.data,
        authError,
    }),
} satisfies ProtoTransition<AuthenticatingState, NotAuthenticatedState>;

export const trCheckingAuthToLoadingProducts = {
    type: AuthTransitionTypes.CHECKING_AUTH__LOADING_PRODUCTS,
    from: AuthStages.CHECKING_AUTH,
    to: ProductListStages.LOADING_PRODUCTS,
    collectData: (state) => ({
        ...state.data,
        ...initProductListStore,
    }),
} satisfies ProtoTransition<CheckingAuthState, LoadingProductsState>;

export const trAuthenticatingToLoadingProducts = {
    type: AuthTransitionTypes.AUTHENTICATING__LOADING_PRODUCTS,
    from: AuthStages.AUTHENTICATING,
    to: ProductListStages.LOADING_PRODUCTS,
    collectData: (state) => ({
        ...state.data,
        authError: null,
        ...initProductListStore,
    }),
} satisfies ProtoTransition<AuthenticatingState, LoadingProductsState>;
