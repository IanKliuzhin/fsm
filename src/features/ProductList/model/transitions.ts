import { ProtoTransition } from 'lib/FSM';
import { TransitionTypes, Stages } from 'store/enums';
import { LoadingProductsState, PickingProductsState } from './types';

export const trLoadingProductsToPickingProducts = {
    type: TransitionTypes.LOADING_PRODUCTS__PICKING_PRODUCTS,
    from: Stages.LOADING_PRODUCTS,
    to: Stages.PICKING_PRODUCTS,
    collectData: (state, { products }) => ({
        ...state.data,
        products: [...state.data.products, ...products],
    }),
} satisfies ProtoTransition<LoadingProductsState, PickingProductsState>;

export const trPickingProductsToLoadingProducts = {
    type: TransitionTypes.PICKING_PRODUCTS__LOADING_PRODUCTS,
    from: Stages.PICKING_PRODUCTS,
    to: Stages.LOADING_PRODUCTS,
    collectData: (state, { productsPage }) => ({
        ...state.data,
        productsPage,
    }),
} satisfies ProtoTransition<PickingProductsState, LoadingProductsState>;
