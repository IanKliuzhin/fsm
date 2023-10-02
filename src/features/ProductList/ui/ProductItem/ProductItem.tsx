import { useContext } from 'react';
import { ActionContext } from 'store';
import type { ProductType } from 'store';
import { ProductListTransitionTypes } from '../../model/enums';

export const ProductItem = ({ product }: { product: ProductType }) => {
    const { id, title, brand, price, thumbnail } = product;
    const dispatch = useContext(ActionContext);

    const onClickDetails = () => {
        dispatch({
            type: ProductListTransitionTypes.PICKING_PRODUCTS__PRODUCT_INFO,
            payload: product,
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
        </div>
    );
};
