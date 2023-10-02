import {
    AuthStages,
    AuthTransitionTypes,
} from 'features/Authentication/model/enums';
import { CartStages, CartTransitionTypes } from 'features/Cart/model/enums';
import {
    ProductInfoStages,
    ProductInfoTransitionTypes,
} from 'features/ProductInfo/model/enums';
import {
    ProductListStages,
    ProductListTransitionTypes,
} from 'features/ProductList/model/enums';

enum RemainingStages {
    PAYMENT = 'PAYMENT',
}

export const Stages = {
    ...AuthStages,
    ...ProductListStages,
    ...ProductInfoStages,
    ...CartStages,
    ...RemainingStages,
};
export type Stages = typeof Stages;

enum RemainingTransitionTypes {
    PICKING_PRODUCTS__NOT_AUTHENTICATED = 'PICKING_PRODUCTS__NOT_AUTHENTICATED',
    CART__PAYMENT = 'CART__PAYMENT',
    PAYMENT__PICKING_PRODUCTS = 'PAYMENT__PICKING_PRODUCTS',
}

export const TransitionTypes = {
    ...AuthTransitionTypes,
    ...ProductListTransitionTypes,
    ...ProductInfoTransitionTypes,
    ...CartTransitionTypes,
    ...RemainingTransitionTypes,
};
export type TransitionTypes = typeof TransitionTypes;
