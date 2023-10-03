import { useContext } from 'react';
import { ActionContext, CartState, GetStateContext } from 'store';
import { TransitionTypes } from 'store/enums';
import { ProductInCart } from '../ProductInCart';

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

    const onBackClick = () => {
        dispatch({
            type: TransitionTypes.CART__PICKING_PRODUCTS,
            payload: {},
        });
    };

    const onPaymentClick = () => {
        dispatch({
            type: TransitionTypes.CART__PAYMENT,
            payload: {},
        });
    };

    return (
        <div>
            <button type="button" onClick={onBackClick}>
                Back
            </button>
            <br />
            {productsInCart.length === 0 ? (
                'No items left.'
            ) : (
                <>
                    {productsInCart.map((product) => (
                        <ProductInCart key={product.id} product={product} />
                    ))}
                    <br />
                    <br />
                    Total price: ${totalPrice}
                    <button type="button" onClick={onPaymentClick}>
                        Go to payment
                    </button>
                </>
            )}
        </div>
    );
};
