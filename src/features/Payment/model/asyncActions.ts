import { DispatchType } from 'store';
import { PaymentTransitionTypes } from './enums';

export const usePay = (dispatch: DispatchType) => () => {
    dispatch({
        type: PaymentTransitionTypes.PAYMENT__PAYING,
        payload: {},
    });
    setTimeout(() => {
        dispatch({
            type: PaymentTransitionTypes.PAYING__PAID,
            payload: {},
        });
    }, 1000);
};
