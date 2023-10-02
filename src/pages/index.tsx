import { ReactNode } from 'react';
import { State } from 'store';
import { Stages } from 'store/enums';
import { AuthenticationPage } from './authentication';
import { ProductListPage } from './productList';

export const routing = (state: State): ReactNode => {
    switch (state.stage) {
        case Stages.CHECKING_AUTH:
        case Stages.NOT_AUTHENTICATED:
        case Stages.AUTHENTICATING:
            return <AuthenticationPage />;
        case Stages.LOADING_PRODUCTS:
        case Stages.PICKING_PRODUCTS:
            return <ProductListPage />;
        default:
            return '';
    }
};
