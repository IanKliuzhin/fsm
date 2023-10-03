import { ButtonHTMLAttributes } from 'react';
import classes from './Button.module.scss';

export const Button = ({
    text,
    onClick,
    type = 'button',
}: {
    text: string;
    onClick?: () => void;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}) => {
    return (
        <button className={classes.button} onClick={onClick} type={type}>
            {text}
        </button>
    );
};
