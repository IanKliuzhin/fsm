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

export type ProductType = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    thumbnail: string;
    images: [string, string, string];
};

export type ProductListStoreType = {
    products: ProductType[];
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
