import { ProductListStoreType } from 'features/ProductList/model';
import { ProtoState } from 'lib/FSM';
import type { ProductType } from 'store';
import { ProductInfoStages } from './enums';

type ProductInfoStoreType = ProductListStoreType & {
    productForInfo: ProductType;
};

export interface ProductInfoState extends ProtoState {
    stage: ProductInfoStages.PRODUCT_INFO;
    data: ProductInfoStoreType;
}
