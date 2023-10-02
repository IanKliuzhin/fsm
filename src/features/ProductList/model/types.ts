import type { ProductsService } from 'features';
import type { ProtoState } from 'lib/FSM';
import type { ProductType } from 'store';
import { ProductListStages } from './enums';

export type ProductListStoreType = {
    products: ProductType[];
    productsService: ProductsService;
    productsPage: number;
    productsInCartAmount: number;
};

export interface LoadingProductsState extends ProtoState {
    stage: ProductListStages.LOADING_PRODUCTS;
    data: ProductListStoreType;
}

export interface PickingProductsState extends ProtoState {
    stage: ProductListStages.PICKING_PRODUCTS;
    data: ProductListStoreType;
}

export type ProductListState = LoadingProductsState | PickingProductsState;
