import { useContext } from 'react';
import { ActionContext, ProductType } from 'store';
import { TransitionTypes } from 'store/enums';

export const ProductInCart = ({ product }: { product: ProductType }) => {
    const { id, title, brand, price, thumbnail, inCartAmount } = product;
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
        <div>
            {' '}
            {id}. {title}
            <br />
            {brand}
            <img src={thumbnail} alt={title} height="100" />
            <button type="button" onClick={onRemoveClick}>
                Remove
            </button>
            Amount in cart: {inCartAmount}
            <button type="button" onClick={onAddClick}>
                Add to cart
            </button>
            <br />
            Price: ${price * inCartAmount}
        </div>
    );
};
