import classes from './CartIcon.module.scss';

export const CartIcon = ({
    amount,
    open,
}: {
    amount: number;
    open: () => void;
}) => {
    return (
        <div className={classes.cart} onClick={open}>
            {amount > 0 && <div className={classes.amount}>{amount}</div>}
        </div>
    );
};
