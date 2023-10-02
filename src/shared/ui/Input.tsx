import { useRef } from 'react';

type Props = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

export const Input = (props: Props) => {
    const ref = useRef<HTMLInputElement>(null);
    return (
        <div>
            <input {...props} ref={ref} />
        </div>
    );
};
