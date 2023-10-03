import { DispatchType, State } from 'store';
import { Stages, TransitionTypes } from 'store/enums';

export const useGoBack = (dispatch: DispatchType, state: State) => {
    switch (state.stage) {
        case Stages.CART:
            return () =>
                dispatch({
                    type: TransitionTypes.CART__PICKING_PRODUCTS,
                    payload: {},
                });
        case Stages.PAID:
            return () =>
                dispatch({
                    type: TransitionTypes.PAID__PICKING_PRODUCTS,
                    payload: {},
                });
        case Stages.PAYMENT:
            return () =>
                dispatch({
                    type: TransitionTypes.PAYMENT__CART,
                    payload: {},
                });
        case Stages.PRODUCT_INFO:
            return () =>
                dispatch({
                    type: TransitionTypes.PRODUCT_INFO__PICKING_PRODUCTS,
                    payload: {},
                });
    }
};

export const useLogout = (dispatch: DispatchType, state: State) => {
    if (state.stage === Stages.PICKING_PRODUCTS)
        return () =>
            dispatch({
                type: TransitionTypes.PICKING_PRODUCTS__NOT_AUTHENTICATED,
                payload: {},
            });
};

export const useGoToCart = (dispatch: DispatchType, state: State) => {
    if (state.stage === Stages.PICKING_PRODUCTS)
        return () =>
            dispatch({
                type: TransitionTypes.PICKING_PRODUCTS__CART,
                payload: {},
            });
};
