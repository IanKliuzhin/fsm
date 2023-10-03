import { CartState } from 'features/Cart/model';
import { CartStages } from 'features/Cart/model/enums';
import { ProductListState } from 'features/ProductList/model';
import { ProductListStages } from 'features/ProductList/model/enums';
import { ProtoTransition } from 'lib/FSM';
import { PaymentStages, PaymentTransitionTypes } from './enums';
import { PaidState, PayingState, PaymentState } from './types';

export const trPaymentToCart = {
    type: PaymentTransitionTypes.PAYMENT__CART,
    from: PaymentStages.PAYMENT,
    to: CartStages.CART,
    collectData: (state) => ({
        ...state.data,
    }),
} satisfies ProtoTransition<PaymentState, CartState>;

export const trPaymentToPaying = {
    type: PaymentTransitionTypes.PAYMENT__PAYING,
    from: PaymentStages.PAYMENT,
    to: PaymentStages.PAYING,
    collectData: (state) => ({
        ...state.data,
    }),
} satisfies ProtoTransition<PaymentState, PayingState>;

export const trPayingToPaid = {
    type: PaymentTransitionTypes.PAYING__PAID,
    from: PaymentStages.PAYING,
    to: PaymentStages.PAID,
    collectData: (state) => ({
        ...state.data,
    }),
} satisfies ProtoTransition<PayingState, PaidState>;

export const trPaidToPickingProducts = {
    type: PaymentTransitionTypes.PAID__PICKING_PRODUCTS,
    from: PaymentStages.PAID,
    to: ProductListStages.PICKING_PRODUCTS,
    collectData: (state: PaymentState) => ({
        ...state.data,
        products: state.data.products.map((product) => ({
            ...product,
            inCartAmount: 0,
        })),
        productsInCartAmount: 0,
    }),
} satisfies ProtoTransition<PaidState, ProductListState>;
