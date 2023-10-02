import { ProtoState } from 'lib/FSM';
import type { ProductType } from 'store';
import { ProductInfoStages } from './enums';

export interface ProductInfoState extends ProtoState {
    stage: ProductInfoStages.PRODUCT_INFO;
    data: { productForInfo: ProductType };
}
