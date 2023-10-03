import type { ProductsService } from 'features';
import { AuthStoreType } from 'features/Authentication/model';
import type { ProtoState } from 'lib/FSM';
import type { ProductType, Profile } from 'store';
import { ProductListStages } from './enums';

export type ProductListStoreType = AuthStoreType & {
    profile: Profile;
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
