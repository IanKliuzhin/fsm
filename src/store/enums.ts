import {
    AuthStages,
    AuthTransitionTypes,
} from 'features/Authentication/model/enums';
import { CartStages, CartTransitionTypes } from 'features/Cart/model/enums';
import {
    PaymentStages,
    PaymentTransitionTypes,
} from 'features/Payment/model/enums';
import {
    ProductInfoStages,
    ProductInfoTransitionTypes,
} from 'features/ProductInfo/model/enums';
import {
    ProductListStages,
    ProductListTransitionTypes,
} from 'features/ProductList/model/enums';

export const Stages = {
    ...AuthStages,
    ...ProductListStages,
    ...ProductInfoStages,
    ...CartStages,
    ...PaymentStages,
};
export type Stages = typeof Stages;

export const TransitionTypes = {
    ...AuthTransitionTypes,
    ...ProductListTransitionTypes,
    ...ProductInfoTransitionTypes,
    ...CartTransitionTypes,
    ...PaymentTransitionTypes,
};
export type TransitionTypes = typeof TransitionTypes;
