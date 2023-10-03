import classes from './Input.module.scss';

type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

export const Input = (props: Props) => {
    return (
        <div className={classes.input_wrapper}>
            <input {...props} />
        </div>
    );
};
