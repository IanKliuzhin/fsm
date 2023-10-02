import { useContext } from 'react';
import { ActionContext } from 'store';
import type { ProductType } from 'store';
import { ProductListTransitionTypes } from '../../model/enums';

export const ProductItem = ({ product }: { product: ProductType }) => {
    const { id, title, brand, price, thumbnail, inCartAmount } = product;
    const dispatch = useContext(ActionContext);

    const onClickDetails = () => {
        dispatch({
            type: ProductListTransitionTypes.PICKING_PRODUCTS__PRODUCT_INFO,
            payload: product,
        });
    };

    const onAddClick = () => {
        dispatch({
            type: ProductListTransitionTypes.PICKING_PRODUCTS__PICKING_PRODUCTS,
            payload: { id, isAdding: true },
        });
    };

    const onRemoveClick = () => {
        dispatch({
            type: ProductListTransitionTypes.PICKING_PRODUCTS__PICKING_PRODUCTS,
            payload: { id, isAdding: false },
        });
    };

    return (
        <div>
            {id}. {title}
            <br />
            {brand}
            <br />
            Price: ${price}
            <img src={thumbnail} alt={title} height="100" />
            <button type="button" onClick={onClickDetails}>
                Details
            </button>
            <button type="button" onClick={onAddClick}>
                Add to cart
            </button>
            {inCartAmount > 0 && (
                <>
                    Amount in cart: {inCartAmount}
                    <button type="button" onClick={onRemoveClick}>
                        Remove
                    </button>
                </>
            )}
        </div>
    );
};
