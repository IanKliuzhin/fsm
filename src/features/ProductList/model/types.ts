import type { ProductsService } from 'features';
import type { ProtoState } from 'lib/FSM';
import type { Stages } from 'store/enums';

export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: {
        id: number;
        name: string;
        image: string;
    };
    images: string[];
};

export type ProductListStoreType = {
    products: Product[];
    productsService: ProductsService;
    productsPage: number;
};

export interface LoadingProductsState extends ProtoState {
    stage: Stages.LOADING_PRODUCTS;
    data: ProductListStoreType;
}

export interface PickingProductsState extends ProtoState {
    stage: Stages.PICKING_PRODUCTS;
    data: ProductListStoreType;
}

export type ProductListState = LoadingProductsState | PickingProductsState;
