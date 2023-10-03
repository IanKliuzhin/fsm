import { ReactNode } from 'react';
import { State } from 'store';
import { Stages } from 'store/enums';
import { AuthenticationPage } from './AuthenticationPage';
import { CartPage } from './CartPage';
import { PaymentPage } from './PaymentPage';
import { ProductInfoPage } from './ProductInfoPage';
import { ProductListPage } from './ProductListPage';

export const routing = (state: State): ReactNode => {
    switch (state.stage) {
        case Stages.NOT_AUTHENTICATED:
        case Stages.AUTHENTICATING:
            return <AuthenticationPage />;
        case Stages.LOADING_PRODUCTS:
        case Stages.PICKING_PRODUCTS:
            return <ProductListPage />;
        case Stages.PRODUCT_INFO:
            return <ProductInfoPage />;
        case Stages.CART:
            return <CartPage />;
        case Stages.PAYMENT:
        case Stages.PAYING:
        case Stages.PAID:
            return <PaymentPage />;
        default:
            return '';
    }
};
