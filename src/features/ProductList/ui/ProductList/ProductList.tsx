import { useContext, useEffect } from 'react';
import { Loader } from 'shared/ui';
import {
    ActionContext,
    GetStateContext,
    ProductListState,
    useFetchProducts,
} from 'store';
import { Stages, TransitionTypes } from 'store/enums';
import { ProductsService } from '../../api';
import { Product } from '../Product';

export const ProductList = () => {
    const dispatch = useContext(ActionContext);
    const state = useContext(GetStateContext)();

    const {
        stage,
        data: { products, productsService, productsPage },
    } = state as ProductListState;

    const fetchProducts = useFetchProducts(dispatch, productsService);

    useEffect(() => {
        if (stage === Stages.LOADING_PRODUCTS) {
            fetchProducts(productsPage);
        }
    }, [stage, fetchProducts, productsPage]);

    const onClickLoadMore = () => {
        dispatch({
            type: TransitionTypes.PICKING_PRODUCTS__LOADING_PRODUCTS,
            payload: { productsPage: productsPage + 1 },
        });
    };

    const isAllLoaded =
        (productsPage + 1) * ProductsService.LIMIT < productsService.total;

    return (
        <div>
            Product list:
            {products.map((product) => (
                <Product key={product.id} product={product} />
            ))}
            {stage === Stages.PICKING_PRODUCTS && isAllLoaded && (
                <button type="button" onClick={onClickLoadMore}>
                    Load 10 more
                </button>
            )}
            {stage === Stages.LOADING_PRODUCTS && <Loader />}
        </div>
    );
};
