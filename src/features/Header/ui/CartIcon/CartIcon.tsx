export const CartIcon = ({
    amount,
    open,
}: {
    amount: number;
    open: () => void;
}) => {
    return <div onClick={open}>Items in cart: {amount}</div>;
};
