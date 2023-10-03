import { useContext } from 'react';
import { Loader } from 'shared/ui';
import { GetStateContext, AuthState } from 'store';
import { Stages } from 'store/enums';
import { AuthForm } from '../AuthForm';

export const AuthContainer = () => {
    const state = useContext(GetStateContext)();

    const { stage } = state as AuthState;

    return (
        <div>
            You are not authenticated
            <AuthForm />
            {stage === Stages.AUTHENTICATING && <Loader />}
        </div>
    );
};
