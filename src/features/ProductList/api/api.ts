import axios from 'axios';
import { ProductType } from '../model';

type Response = {
    data: {
        products: ProductType[];
        total: number;
    };
};

export class ProductsService {
    static LIMIT = 10;
    error: string | null = null;
    page = 0;
    total = 0;

    async fetchProducts(newPage: number): Promise<ProductType[]> {
        if (this.total > 0 && newPage * ProductsService.LIMIT > this.total)
            return [];

        return axios
            .get<unknown, Response>('https://dummyjson.com/products', {
                params: {
                    skip: ProductsService.LIMIT * newPage,
                    limit: ProductsService.LIMIT,
                },
            })
            .then(({ data: { products, total } }) => {
                this.page = newPage;
                this.total = total;
                return products;
            })
            .catch(() => {
                return [];
            });
    }
}
