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
import {
    ProductInfoState,
    trProductInfoToPickingProducts,
} from 'features/ProductInfo/model';
import {
    ProductListStoreType,
    LoadingProductsState,
    PickingProductsState,
    ProductListState,
    trLoadingProductsToPickingProducts,
    trPickingProductsToLoadingProducts,
    trPickingProductsToProductInfo,
} from 'features/ProductList/model';
import { ActionType, FSM, ProtoState, ProtoTransition } from 'lib/FSM';
import { Stages, TransitionTypes } from './enums';
import type { ProductType } from './types';

export type { AuthState, ProductListState, ProductInfoState, ProductType };

interface CartState extends ProtoState {
    stage: Stages['CART'];
    data: ProductListStoreType;
}

interface PaymentState extends ProtoState {
    stage: Stages['PAYMENT'];
    data: any;
}

export type State =
    | CheckingAuthState
    | NotAuthenticatedState
    | AuthenticatingState
    | LoadingProductsState
    | PickingProductsState
    | ProductInfoState
    | CartState
    | PaymentState;

const trPickingProductsToCart = {
    type: TransitionTypes.PICKING_PRODUCTS__CART,
    from: Stages.PICKING_PRODUCTS,
    to: Stages.CART,
    collectData: (state, payload) => ({
        ...state.data,
        ...payload,
    }),
} satisfies ProtoTransition<PickingProductsState, CartState>;

const trProductInfoToCart = {
    type: TransitionTypes.PRODUCT_INFO__CART,
    from: Stages.PRODUCT_INFO,
    to: Stages.CART,
    collectData: (state, payload) => ({
        ...state.data,
        ...payload,
    }),
} satisfies ProtoTransition<ProductInfoState, CartState>;

const trPickingProductsToNotAuthenticated = {
    type: TransitionTypes.PICKING_PRODUCTS__NOT_AUTHENTICATED,
    from: Stages.PICKING_PRODUCTS,
    to: Stages.NOT_AUTHENTICATED,
    collectData: (state, payload) => ({
        ...state.data,
        ...payload,
    }),
} satisfies ProtoTransition<PickingProductsState, NotAuthenticatedState>;

const trCartToPayment = {
    type: TransitionTypes.CART__PAYMENT,
    from: Stages.CART,
    to: Stages.PAYMENT,
    collectData: (state, payload) => ({
        ...state.data,
        ...payload,
    }),
} satisfies ProtoTransition<CartState, PaymentState>;

const trPaymentToPickingProducts = {
    type: TransitionTypes.PAYMENT__PICKING_PRODUCTS,
    from: Stages.PAYMENT,
    to: Stages.PICKING_PRODUCTS,
    collectData: (state, payload) => ({
        ...state.data,
        ...payload,
    }),
} satisfies ProtoTransition<PaymentState, PickingProductsState>;

export type Transition =
    | typeof trCheckingAuthToNotAuthenticated
    | typeof trCheckingAuthToLoadingProducts
    | typeof trNotAuthToAuthenticating
    | typeof trAuthenticatingToNotAuthenticated
    | typeof trAuthenticatingToLoadingProducts
    | typeof trLoadingProductsToPickingProducts
    | typeof trPickingProductsToLoadingProducts
    | typeof trPickingProductsToProductInfo
    | typeof trProductInfoToPickingProducts
    | typeof trPickingProductsToCart
    | typeof trProductInfoToCart
    | typeof trPickingProductsToNotAuthenticated
    | typeof trCartToPayment
    | typeof trPaymentToPickingProducts;

const transitions = [
    trCheckingAuthToNotAuthenticated,
    trCheckingAuthToLoadingProducts,
    trNotAuthToAuthenticating,
    trAuthenticatingToNotAuthenticated,
    trAuthenticatingToLoadingProducts,
    trLoadingProductsToPickingProducts,
    trPickingProductsToLoadingProducts,
    trPickingProductsToProductInfo,
    trProductInfoToPickingProducts,
    trPickingProductsToCart,
    trProductInfoToCart,
    trPickingProductsToNotAuthenticated,
    trCartToPayment,
    trPaymentToPickingProducts,
];

export const initState = {
    stage: Stages.CHECKING_AUTH,
    data: initAuthStore,
} satisfies CheckingAuthState;

const fsm = new FSM<State, Transition>(transitions, initState);

export type DispatchType = Dispatch<ActionType<State, State, Transition>>;

export const { ActionContext, GetStateContext, reducer } = fsm;
