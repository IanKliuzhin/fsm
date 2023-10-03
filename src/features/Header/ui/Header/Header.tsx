import { useContext } from 'react';
import { ProductListStoreType } from 'features/ProductList/model';
import { ActionContext, GetStateContext } from 'store';
import { useLogout, useGoBack, useGoToCart } from '../../model';
import { CartIcon } from '../CartIcon';
import classes from './Header.module.scss';

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
        <div className={classes.header}>
            {onGoBackClick && (
                <div className={classes.back} onClick={onGoBackClick} />
            )}
            {onLogoutClick && (
                <div className={classes.user}>
                    <img className={classes.avatar} src={image} alt={email} />
                    {username} ({email}){' '}
                    <span className={classes.logout} onClick={onLogoutClick}>
                        Logout
                    </span>
                </div>
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
