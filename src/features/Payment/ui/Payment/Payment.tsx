import { useContext } from 'react';
import { Button, Loader } from 'shared/ui';
import { ActionContext, GetStateContext, PayState } from 'store';
import { Stages, TransitionTypes } from 'store/enums';
import { usePay } from '../../model';
import classes from './Payment.module.scss';

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

    if (stage === Stages.PAID)
        return (
            <div className={classes.thankYou}>
                <h1>Thank you for your purchase!</h1>
                <Button onClick={onNewPurchaseClick} text="New purchase" />
            </div>
        );

    return (
        <div className={classes.payment}>
            {productsInCart.map(({ id, title, price, inCartAmount }, index) => (
                <div key={id} className={classes.product}>
                    <span>
                        {index + 1}. {title}
                    </span>
                    <span>
                        {inCartAmount}*${price}
                    </span>
                </div>
            ))}
            <div className={classes.pay}>
                <div className={classes.price}>Total price: ${totalPrice}</div>
                {stage === Stages.PAYMENT && (
                    <Button onClick={onPayClick} text="Pay" />
                )}
            </div>
            {stage === Stages.PAYING && <Loader />}
        </div>
    );
};
