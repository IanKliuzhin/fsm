import { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import classes from './Button.module.scss';

export const Button = ({
    text,
    className,
    onClick,
    type = 'button',
}: {
    text: string;
    className?: string;
    onClick?: () => void;
    type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
}) => {
    return (
        <button
            className={cn(classes.button, className)}
            onClick={onClick}
            type={type}
        >
            {text}
        </button>
    );
};
