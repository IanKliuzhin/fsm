import { useContext } from 'react';
import { Loader } from 'shared/ui';
import { GetStateContext, AuthState } from 'store';
import { Stages } from 'store/enums';
import { AuthForm } from '../AuthForm';
import classes from './AuthContainer.module.scss';

export const AuthContainer = () => {
    const state = useContext(GetStateContext)();

    const { stage } = state as AuthState;

    return (
        <div className={classes.authContainer}>
            You are not authenticated
            <AuthForm />
            {stage === Stages.AUTHENTICATING && <Loader />}
        </div>
    );
};
