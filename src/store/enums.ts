import { AuthStages, AuthTransitionTypes } from 'features/Authentication/model';
import {
    ProductListStages,
    ProductListTransitionTypes,
} from 'features/ProductList/model';

enum RemainingStages {
    PRODUCT_INFO = 'PRODUCT_INFO',
    CART = 'CART',
    PAYMENT = 'PAYMENT',
}

export const Stages = {
    ...AuthStages,
    ...ProductListStages,
    ...RemainingStages,
};
export type Stages = typeof Stages;

enum RemainingTransitionTypes {
    PICKING_PRODUCTS__PRODUCT_INFO = 'PICKING_PRODUCTS__PRODUCT_INFO',
    PRODUCT_INFO__PICKING_PRODUCTS = 'PRODUCT_INFO__PICKING_PRODUCTS',
    PICKING_PRODUCTS__CART = 'PICKING_PRODUCTS__CART',
    PRODUCT_INFO__CART = 'PRODUCT_INFO__CART',
    PICKING_PRODUCTS__NOT_AUTHENTICATED = 'PICKING_PRODUCTS__NOT_AUTHENTICATED',
    CART__PAYMENT = 'CART__PAYMENT',
    PAYMENT__PICKING_PRODUCTS = 'PAYMENT__PICKING_PRODUCTS',
}

export const TransitionTypes = {
    ...AuthTransitionTypes,
    ...ProductListTransitionTypes,
    ...RemainingTransitionTypes,
};
export type TransitionTypes = typeof TransitionTypes;
