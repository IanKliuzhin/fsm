import { ProductListStoreType } from 'features/ProductList/model';
import { ProtoState } from 'lib/FSM';
import { PaymentStages } from './enums';

export interface PaymentState extends ProtoState {
    stage: PaymentStages.PAYMENT;
    data: ProductListStoreType;
}

export interface PayingState extends ProtoState {
    stage: PaymentStages.PAYING;
    data: ProductListStoreType;
}

export interface PaidState extends ProtoState {
    stage: PaymentStages.PAID;
    data: ProductListStoreType;
}

export type PayState = PaymentState | PayingState | PaidState;
