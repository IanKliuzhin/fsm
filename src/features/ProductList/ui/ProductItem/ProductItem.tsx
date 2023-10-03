import { useContext } from 'react';
import { Button } from 'shared/ui';
import { ActionContext } from 'store';
import type { ProductType } from 'store';
import { ProductListTransitionTypes } from '../../model/enums';
import classes from './ProductItem.module.scss';

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
        <div className={classes.productItem}>
            <div className={classes.description}>
                <span>
                    {id}. {title}
                </span>
                <span>{brand}</span>
                <span>Price: ${price}</span>
                <Button onClick={onClickDetails} text="Details" />
            </div>
            <img
                className={classes.thumbnail}
                src={thumbnail}
                alt={title}
                onClick={onClickDetails}
            />
            <div className={classes.choice}>
                <Button onClick={onAddClick} text="Add to cart" />
                {inCartAmount > 0 && (
                    <>
                        <span>Amount in the cart: {inCartAmount}</span>
                        <Button onClick={onRemoveClick} text="Remove" />
                    </>
                )}
            </div>
        </div>
    );
};
