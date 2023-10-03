import { AuthForm } from '../AuthForm';
import classes from './AuthContainer.module.scss';

export const AuthContainer = () => {
    return (
        <div className={classes.authContainer}>
            You are not authenticated
            <AuthForm />
        </div>
    );
};
