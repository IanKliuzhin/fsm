import { PickingProductsState } from 'features/ProductList/model';
import { ProductListStages } from 'features/ProductList/model/enums';
import { ProtoTransition } from 'lib/FSM';
import { ProductInfoStages, ProductInfoTransitionTypes } from './enums';
import { ProductInfoState } from './types';

export const trProductInfoToPickingProducts = {
    type: ProductInfoTransitionTypes.PRODUCT_INFO__PICKING_PRODUCTS,
    from: ProductInfoStages.PRODUCT_INFO,
    to: ProductListStages.PICKING_PRODUCTS,
    collectData: (state) => ({
        ...state.data,
    }),
} satisfies ProtoTransition<ProductInfoState, PickingProductsState>;
