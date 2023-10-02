import { ProductsService } from '../api';
import { ProductListStoreType } from './types';

const productsService = new ProductsService();
export const initProductListStore = {
    productsService,
    products: [],
    productsPage: 0,
    productsInCartAmount: 0,
} satisfies ProductListStoreType;
