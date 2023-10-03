import { useContext } from 'react';
import { Button } from 'shared/ui';
import { ActionContext, CartState, GetStateContext } from 'store';
import { TransitionTypes } from 'store/enums';
import { ProductInCart } from '../ProductInCart';
import classes from './Cart.module.scss';

export const Cart = () => {
    const state = useContext(GetStateContext)();
    const dispatch = useContext(ActionContext);

    const {
        data: { products },
    } = state as CartState;

    const productsInCart = products.filter(
        (product) => product.inCartAmount > 0,
    );

    const totalPrice = productsInCart.reduce(
        (totalPrice, product) =>
            totalPrice + product.price * product.inCartAmount,
        0,
    );

    const onPaymentClick = () => {
        dispatch({
            type: TransitionTypes.CART__PAYMENT,
            payload: {},
        });
    };

    if (productsInCart.length === 0)
        return (
            <div className={classes.cart}>
                <h1>No items left.</h1>
            </div>
        );

    return (
        <div className={classes.cart}>
            {productsInCart.map((product) => (
                <ProductInCart key={product.id} product={product} />
            ))}
            <div className={classes.goToPay}>
                <span className={classes.price}>
                    Total price: ${totalPrice}
                </span>
                <Button
                    type="button"
                    onClick={onPaymentClick}
                    text="Go to payment"
                />
            </div>
        </div>
    );
};
