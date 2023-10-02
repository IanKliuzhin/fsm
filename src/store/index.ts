import { Dispatch } from 'react';
import type { ProductsService } from 'features';
import { ActionType, FSM, ProtoState, ProtoTransition } from 'lib/FSM';
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
} from '../features/Authentication/model';
import {
    Product,
    ProductListStoreType,
    LoadingProductsState,
    PickingProductsState,
    ProductListState,
    trLoadingProductsToPickingProducts,
    trPickingProductsToLoadingProducts,
} from '../features/ProductList/model';
import { Stages, TransitionTypes } from './enums';

export type { AuthState, ProductListState };

interface ProductInfoState extends ProtoState {
    stage: Stages['PRODUCT_INFO'];
    data: Product;
}

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

export const useFetchProducts =
    (dispatch: DispatchType, productsService: ProductsService) =>
    (productsPage: number) => {
        productsService.fetchProducts(productsPage).then((products) =>
            dispatch({
                type: TransitionTypes.LOADING_PRODUCTS__PICKING_PRODUCTS,
                payload: { products },
            }),
        );
    };

const trPickingProductsToProductInfo = {
    type: TransitionTypes.PICKING_PRODUCTS__PRODUCT_INFO,
    from: Stages.PICKING_PRODUCTS,
    to: Stages.PRODUCT_INFO,
    collectData: (state, payload) => ({
        ...state.data,
        ...payload,
    }),
} satisfies ProtoTransition<PickingProductsState, ProductInfoState>;

const trProductInfoToPickingProducts = {
    type: TransitionTypes.PRODUCT_INFO__PICKING_PRODUCTS,
    from: Stages.PRODUCT_INFO,
    to: Stages.PICKING_PRODUCTS,
    collectData: (state, payload) => ({
        ...state.data,
        ...payload,
    }),
} satisfies ProtoTransition<ProductInfoState, PickingProductsState>;

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
