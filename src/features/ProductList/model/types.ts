import type { ProductsService } from 'features';
import type { ProtoState } from 'lib/FSM';

export enum ProductListStages {
    LOADING_PRODUCTS = 'LOADING_PRODUCTS',
    PICKING_PRODUCTS = 'PICKING_PRODUCTS',
}

export enum ProductListTransitionTypes {
    LOADING_PRODUCTS__PICKING_PRODUCTS = 'LOADING_PRODUCTS__PICKING_PRODUCTS',
    PICKING_PRODUCTS__LOADING_PRODUCTS = 'PICKING_PRODUCTS__LOADING_PRODUCTS',
}

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
    stage: ProductListStages.LOADING_PRODUCTS;
    data: ProductListStoreType;
}

export interface PickingProductsState extends ProtoState {
    stage: ProductListStages.PICKING_PRODUCTS;
    data: ProductListStoreType;
}

export type ProductListState = LoadingProductsState | PickingProductsState;
