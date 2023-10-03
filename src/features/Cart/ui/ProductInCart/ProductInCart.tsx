import { useContext } from 'react';
import { Button } from 'shared/ui';
import { ActionContext, ProductType } from 'store';
import { TransitionTypes } from 'store/enums';
import classes from './ProductInCart.module.scss';

export const ProductInCart = ({ product }: { product: ProductType }) => {
    const { id, title, price, thumbnail, inCartAmount } = product;
    const dispatch = useContext(ActionContext);

    const onAddClick = () => {
        dispatch({
            type: TransitionTypes.CART__CART,
            payload: { id, isAdding: true },
        });
    };

    const onRemoveClick = () => {
        dispatch({
            type: TransitionTypes.CART__CART,
            payload: { id, isAdding: false },
        });
    };

    return (
        <div className={classes.cartProduct}>
            <img className={classes.thumbnail} src={thumbnail} alt={title} />
            <div className={classes.description}>
                <span>
                    {id}. {title}
                </span>
                <span>Price: ${price * inCartAmount}</span>
            </div>
            <div className={classes.choice}>
                <Button onClick={onRemoveClick} text="Remove" />
                Amount: {inCartAmount}
                <Button onClick={onAddClick} text="Add" />
            </div>
        </div>
    );
};
