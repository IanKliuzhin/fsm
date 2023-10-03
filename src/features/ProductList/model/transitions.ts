import { NotAuthenticatedState } from 'features/Authentication/model';
import { AuthStages } from 'features/Authentication/model/enums';
import { CartStages } from 'features/Cart/model/enums';
import { ProductInfoStages } from 'features/ProductInfo/model/enums';
import { ProtoTransition } from 'lib/FSM';
import { ProductType, ProductInfoState, CartState } from 'store';
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

export const trPickingProductsToPickingProducts = {
    type: ProductListTransitionTypes.PICKING_PRODUCTS__PICKING_PRODUCTS,
    from: ProductListStages.PICKING_PRODUCTS,
    to: ProductListStages.PICKING_PRODUCTS,
    collectData: (
        state: PickingProductsState,
        { id, isAdding }: { id: ProductType['id']; isAdding: boolean },
    ) => ({
        ...state.data,
        productsInCartAmount: isAdding
            ? state.data.productsInCartAmount + 1
            : state.data.productsInCartAmount - 1,
        products: state.data.products.map((product) =>
            product.id === id
                ? {
                      ...product,
                      inCartAmount: isAdding
                          ? product.inCartAmount + 1
                          : product.inCartAmount - 1,
                  }
                : product,
        ),
    }),
} satisfies ProtoTransition<PickingProductsState, PickingProductsState>;

export const trPickingProductsToCart = {
    type: ProductListTransitionTypes.PICKING_PRODUCTS__CART,
    from: ProductListStages.PICKING_PRODUCTS,
    to: CartStages.CART,
    collectData: (state) => ({
        ...state.data,
    }),
} satisfies ProtoTransition<PickingProductsState, CartState>;

export const trPickingProductsToNotAuthenticated = {
    type: ProductListTransitionTypes.PICKING_PRODUCTS__NOT_AUTHENTICATED,
    from: ProductListStages.PICKING_PRODUCTS,
    to: AuthStages.NOT_AUTHENTICATED,
    collectData: (state) => ({
        ...state.data,
    }),
} satisfies ProtoTransition<PickingProductsState, NotAuthenticatedState>;
