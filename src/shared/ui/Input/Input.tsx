import cn from 'classnames';
import classes from './Input.module.scss';

type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & { className?: string };

export const Input = (props: Props) => {
    const { className, ...inputProps } = props;
    return (
        <div className={cn(classes.input_wrapper, className)}>
            <input {...inputProps} />
        </div>
    );
};
