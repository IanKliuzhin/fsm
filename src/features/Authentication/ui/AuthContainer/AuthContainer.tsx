import { useContext, useEffect } from 'react';
import { Loader } from 'shared/ui';
import { ActionContext, GetStateContext, AuthState } from 'store';
import { Stages } from 'store/enums';
import { useCheckAuth } from '../../model';
import { AuthForm } from '../AuthForm';

export const AuthContainer = () => {
    const dispatch = useContext(ActionContext);
    const state = useContext(GetStateContext)();

    const {
        stage,
        data: { authService },
    } = state as AuthState;

    const checkAuth = useCheckAuth(dispatch, authService);

    useEffect(() => {
        if (state.stage === Stages.CHECKING_AUTH) {
            checkAuth();
        }
    }, [state.stage, checkAuth]);

    console.log('Render Authentication', state);

    if (stage === Stages.CHECKING_AUTH) return <Loader />;

    return (
        <div>
            You are not authenticated
            <AuthForm />
            {stage === Stages.AUTHENTICATING && <Loader />}
        </div>
    );
};
