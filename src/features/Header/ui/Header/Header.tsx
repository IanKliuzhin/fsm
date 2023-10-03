import { useContext } from 'react';
import { ProductListStoreType } from 'features/ProductList/model';
import { ActionContext, GetStateContext } from 'store';
import { useLogout, useGoBack, useGoToCart } from '../../model';
import { CartIcon } from '../CartIcon';

export const Header = () => {
    const state = useContext(GetStateContext)();
    const dispatch = useContext(ActionContext);
    const { profile, productsInCartAmount } =
        state.data as ProductListStoreType;
    const { username, email, image } = profile;

    const onGoBackClick = useGoBack(dispatch, state);
    const onLogoutClick = useLogout(dispatch, state);
    const onGoToCartClick = useGoToCart(dispatch, state);

    return (
        <div>
            {onGoBackClick && (
                <span onClick={onGoBackClick}>{'<--'} Go back</span>
            )}
            {onLogoutClick && (
                <>
                    {username} ({email}){' '}
                    <img src={image} alt={email} height="50" />
                    <span onClick={onLogoutClick}>logout</span>
                </>
            )}
            {onGoToCartClick && (
                <CartIcon
                    open={onGoToCartClick}
                    amount={productsInCartAmount}
                />
            )}
        </div>
    );
};
