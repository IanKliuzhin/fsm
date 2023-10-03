import { Dispatch } from 'react';
import {
    NotAuthenticatedState,
    AuthenticatingState,
    AuthState,
    trNotAuthToAuthenticating,
    trAuthenticatingToNotAuthenticated,
    initAuthStore,
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
    trPickingProductsToNotAuthenticated,
} from 'features/ProductList/model';
import { ActionType, FSM } from 'lib/FSM';
import { Stages } from './enums';
import type { ProductType, Profile } from './types';

export type {
    Profile,
    ProductType,
    AuthState,
    ProductListState,
    ProductInfoState,
    CartState,
    PayState,
};

export type State =
    | NotAuthenticatedState
    | AuthenticatingState
    | LoadingProductsState
    | PickingProductsState
    | ProductInfoState
    | CartState
    | PayState;

export type Transition =
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
    stage: Stages.NOT_AUTHENTICATED,
    data: initAuthStore,
} satisfies NotAuthenticatedState;

const fsm = new FSM<State, Transition>(transitions, initState);

export type DispatchType = Dispatch<ActionType<State, State, Transition>>;

export const { ActionContext, GetStateContext, reducer } = fsm;
