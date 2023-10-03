import { useContext, useEffect } from 'react';
import { Button, Loader } from 'shared/ui';
import { ActionContext, GetStateContext, ProductListState } from 'store';
import { Stages, TransitionTypes } from 'store/enums';
import { ProductsService } from '../../api';
import { useFetchProducts } from '../../model';
import { ProductItem } from '../ProductItem';
import classes from './ProductList.module.scss';

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

    const onLoadMoreClick = () => {
        dispatch({
            type: TransitionTypes.PICKING_PRODUCTS__LOADING_PRODUCTS,
            payload: { productsPage: productsPage + 1 },
        });
    };

    const isAllLoaded =
        (productsPage + 1) * ProductsService.LIMIT < productsService.total;

    return (
        <div className={classes.productList}>
            <h1>Product list</h1>
            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
            {stage === Stages.PICKING_PRODUCTS && isAllLoaded && (
                <Button
                    onClick={onLoadMoreClick}
                    text="Load 10 more"
                    className={classes.loadMore}
                />
            )}
            {stage === Stages.LOADING_PRODUCTS && <Loader />}
        </div>
    );
};
