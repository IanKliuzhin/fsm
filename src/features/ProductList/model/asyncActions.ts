import { DispatchType } from 'store';
import type { ProductsService } from '../api';
import { ProductListTransitionTypes } from './enums';

export const useFetchProducts =
    (dispatch: DispatchType, productsService: ProductsService) =>
    (productsPage: number) => {
        productsService.fetchProducts(productsPage).then((products) =>
            dispatch({
                type: ProductListTransitionTypes.LOADING_PRODUCTS__PICKING_PRODUCTS,
                payload: { products },
            }),
        );
    };
