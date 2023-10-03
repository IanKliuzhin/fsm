import { ProductListStoreType } from 'features/ProductList/model';
import { ProtoState } from 'lib/FSM';
import { PaymentStages } from './enums';

export type PayStoreType = ProductListStoreType;

export interface PaymentState extends ProtoState {
    stage: PaymentStages.PAYMENT;
    data: PayStoreType;
}

export interface PayingState extends ProtoState {
    stage: PaymentStages.PAYING;
    data: PayStoreType;
}

export interface PaidState extends ProtoState {
    stage: PaymentStages.PAID;
    data: PayStoreType;
}

export type PayState = PaymentState | PayingState | PaidState;
