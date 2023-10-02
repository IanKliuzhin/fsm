import { ProductInfoStages } from 'features/ProductInfo/model/enums';
import { ProductInfoState } from 'features/ProductInfo/model/types';
import { ProtoTransition } from 'lib/FSM';
import { ProductListStages, ProductListTransitionTypes } from './enums';
import { LoadingProductsState, PickingProductsState } from './types';

export const trLoadingProductsToPickingProducts = {
    type: ProductListTransitionTypes.LOADING_PRODUCTS__PICKING_PRODUCTS,
    from: ProductListStages.LOADING_PRODUCTS,
    to: ProductListStages.PICKING_PRODUCTS,
    collectData: (state, { products }) => ({
        ...state.data,
        products: [...state.data.products, ...products],
    }),
} satisfies ProtoTransition<LoadingProductsState, PickingProductsState>;

export const trPickingProductsToLoadingProducts = {
    type: ProductListTransitionTypes.PICKING_PRODUCTS__LOADING_PRODUCTS,
    from: ProductListStages.PICKING_PRODUCTS,
    to: ProductListStages.LOADING_PRODUCTS,
    collectData: (state, { productsPage }) => ({
        ...state.data,
        productsPage,
    }),
} satisfies ProtoTransition<PickingProductsState, LoadingProductsState>;

export const trPickingProductsToProductInfo = {
    type: ProductListTransitionTypes.PICKING_PRODUCTS__PRODUCT_INFO,
    from: ProductListStages.PICKING_PRODUCTS,
    to: ProductInfoStages.PRODUCT_INFO,
    collectData: (state, product) => ({
        ...state.data,
        productForInfo: product,
    }),
} satisfies ProtoTransition<PickingProductsState, ProductInfoState>;
