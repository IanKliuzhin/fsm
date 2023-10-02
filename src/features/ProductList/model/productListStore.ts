import { ProductsService } from '../api';

const productsService = new ProductsService();
export const initProductListStore = {
    productsService,
    products: [],
    productsPage: 0,
};
