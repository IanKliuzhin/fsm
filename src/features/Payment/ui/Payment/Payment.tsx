import { useContext, Fragment } from 'react';
import { PaymentStages } from 'features/Payment/model/enums';
import { Loader } from 'shared/ui';
import { ActionContext, GetStateContext, PayState } from 'store';
import { TransitionTypes } from 'store/enums';
import { usePay } from '../../model';

export const Payment = () => {
    const state = useContext(GetStateContext)();
    const dispatch = useContext(ActionContext);

    const {
        stage,
        data: { products },
    } = state as PayState;

    const onPayClick = usePay(dispatch);

    const productsInCart = products.filter(
        (product) => product.inCartAmount > 0,
    );

    const totalPrice = productsInCart.reduce(
        (totalPrice, product) =>
            totalPrice + product.price * product.inCartAmount,
        0,
    );

    const onNewPurchaseClick = () => {
        dispatch({
            type: TransitionTypes.PAID__PICKING_PRODUCTS,
            payload: {},
        });
    };

    if (stage === PaymentStages.PAID)
        return (
            <>
                Thank you for your purchase!
                <button type="button" onClick={onNewPurchaseClick}>
                    New purchase
                </button>
            </>
        );

    return (
        <div>
            <br />
            {productsInCart.map(({ id, title, price, inCartAmount }, index) => (
                <Fragment key={id}>
                    {index + 1}. {title} | {inCartAmount}*${price}
                    <br />
                </Fragment>
            ))}
            <br />
            Total price: ${totalPrice}
            <br />
            {stage === PaymentStages.PAYING ? (
                <Loader />
            ) : (
                <button type="button" onClick={onPayClick}>
                    Pay
                </button>
            )}
        </div>
    );
};
