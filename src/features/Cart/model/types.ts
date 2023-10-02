import { ProductListStoreType } from 'features/ProductList/model';
import { ProtoState } from 'lib/FSM';
import { CartStages } from './enums';

export interface CartState extends ProtoState {
    stage: CartStages.CART;
    data: ProductListStoreType;
}
