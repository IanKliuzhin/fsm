import { Dispatch } from 'react';
import {
    CheckingAuthState,
    NotAuthenticatedState,
    AuthenticatingState,
    AuthState,
    trCheckingAuthToNotAuthenticated,
    trNotAuthToAuthenticating,
    trAuthenticatingToNotAuthenticated,
    initAuthStore,
    trCheckingAuthToLoadingProducts,
    trAuthenticatingToLoadingProducts,
} from 'features/Authentication/model';
import { CartState, trCartToPayment } from 'features/Cart/model';
import { trCartToCart, trCartToPickingProducts } from 'features/Cart/model';
import {
    trPaymentToCart,
    trPaymentToPaying,
    trPayingToPaid,
    trPaidToPickingProducts,
    PayState,
} from 'features/Payment/model';
import {
    ProductInfoState,
    trProductInfoToPickingProducts,
} from 'features/ProductInfo/model';
import {
    LoadingProductsState,
    PickingProductsState,
    ProductListState,
    trLoadingProductsToPickingProducts,
    trPickingProductsToLoadingProducts,
    trPickingProductsToProductInfo,
    trPickingProductsToPickingProducts,
    trPickingProductsToCart,
} from 'features/ProductList/model';
import { ActionType, FSM, ProtoTransition } from 'lib/FSM';
import { Stages, TransitionTypes } from './enums';
import type { ProductType } from './types';

export type {
    ProductType,
    AuthState,
    ProductListState,
    ProductInfoState,
    CartState,
    PayState,
};

export type State =
    | CheckingAuthState
    | NotAuthenticatedState
    | AuthenticatingState
    | LoadingProductsState
    | PickingProductsState
    | ProductInfoState
    | CartState
    | PayState;

const trPickingProductsToNotAuthenticated = {
    type: TransitionTypes.PICKING_PRODUCTS__NOT_AUTHENTICATED,
    from: Stages.PICKING_PRODUCTS,
    to: Stages.NOT_AUTHENTICATED,
    collectData: (state, payload) => ({
        ...state.data,
        ...payload,
    }),
} satisfies ProtoTransition<PickingProductsState, NotAuthenticatedState>;

export type Transition =
    | typeof trCheckingAuthToNotAuthenticated
    | typeof trCheckingAuthToLoadingProducts
    | typeof trNotAuthToAuthenticating
    | typeof trAuthenticatingToNotAuthenticated
    | typeof trAuthenticatingToLoadingProducts
    | typeof trLoadingProductsToPickingProducts
    | typeof trPickingProductsToLoadingProducts
    | typeof trPickingProductsToProductInfo
    | typeof trPickingProductsToPickingProducts
    | typeof trProductInfoToPickingProducts
    | typeof trPickingProductsToCart
    | typeof trPickingProductsToNotAuthenticated
    | typeof trCartToCart
    | typeof trCartToPickingProducts
    | typeof trCartToPayment
    | typeof trPaymentToCart
    | typeof trPaymentToPaying
    | typeof trPayingToPaid
    | typeof trPaidToPickingProducts;

const transitions = [
    trCheckingAuthToNotAuthenticated,
    trCheckingAuthToLoadingProducts,
    trNotAuthToAuthenticating,
    trAuthenticatingToNotAuthenticated,
    trAuthenticatingToLoadingProducts,
    trLoadingProductsToPickingProducts,
    trPickingProductsToLoadingProducts,
    trPickingProductsToProductInfo,
    trPickingProductsToPickingProducts,
    trProductInfoToPickingProducts,
    trPickingProductsToCart,
    trPickingProductsToNotAuthenticated,
    trCartToCart,
    trCartToPickingProducts,
    trCartToPayment,
    trPaymentToCart,
    trPaymentToPaying,
    trPayingToPaid,
    trPaidToPickingProducts,
];

export const initState = {
    stage: Stages.CHECKING_AUTH,
    data: initAuthStore,
} satisfies CheckingAuthState;

const fsm = new FSM<State, Transition>(transitions, initState);

export type DispatchType = Dispatch<ActionType<State, State, Transition>>;

export const { ActionContext, GetStateContext, reducer } = fsm;
