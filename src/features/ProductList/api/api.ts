import axios from 'axios';
import { Product } from '../model';

export class ProductsService {
    static MAX_AMOUNT = 200;
    static LIMIT = 10;
    error: string | null = null;
    page = 0;

    async fetchProducts(newPage: number): Promise<Product[]> {
        if (newPage * ProductsService.LIMIT > ProductsService.MAX_AMOUNT)
            return [];

        return axios
            .get<unknown, { data: Product[] }>(
                'https://api.escuelajs.co/api/v1/products',
                {
                    params: {
                        offset: ProductsService.LIMIT * newPage,
                        limit: ProductsService.LIMIT,
                    },
                },
            )
            .then(({ data }) => {
                this.page = newPage;
                return data;
            })
            .catch(() => {
                return [];
            });
    }
}
