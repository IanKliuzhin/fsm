import { useContext, useEffect } from 'react';
import { Loader } from 'shared/ui';
import { ActionContext, GetStateContext, ProductListState } from 'store';
import { Stages, TransitionTypes } from 'store/enums';
import { ProductsService } from '../../api';
import { useFetchProducts } from '../../model';
import { CartIcon } from '../CartIcon';
import { ProductItem } from '../ProductItem';

export const ProductList = () => {
    const dispatch = useContext(ActionContext);
    const state = useContext(GetStateContext)();

    const {
        stage,
        data: { products, productsService, productsPage, productsInCartAmount },
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

    const openCart = () => {
        dispatch({
            type: TransitionTypes.PICKING_PRODUCTS__CART,
            payload: {},
        });
    };

    return (
        <div>
            <CartIcon amount={productsInCartAmount} open={openCart} />
            <br />
            Product list:
            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
            {stage === Stages.PICKING_PRODUCTS && isAllLoaded && (
                <button type="button" onClick={onLoadMoreClick}>
                    Load 10 more
                </button>
            )}
            {stage === Stages.LOADING_PRODUCTS && <Loader />}
        </div>
    );
};
