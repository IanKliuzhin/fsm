import { useContext, useEffect, useState } from 'react';
import { Input } from 'shared/ui';
import { ActionContext, AuthState, GetStateContext } from 'store';
import { Stages, TransitionTypes } from 'store/enums';
import { useAuthenticate } from '../..//model';

export const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useContext(ActionContext);
    const state = useContext(GetStateContext)();

    const {
        stage,
        data: { authError, authService },
    } = state as AuthState;

    const authenticate = useAuthenticate(dispatch, authService);

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        dispatch({
            type: TransitionTypes.NOT_AUTHENTICATED__AUTHENTICATING,
            payload: {},
        });
    };

    useEffect(() => {
        if (stage === Stages.AUTHENTICATING) {
            authenticate(email, password);
        }
    }, [stage, authenticate, email, password]);

    console.log('Render Authform', state);

    return (
        <form onSubmit={onSubmit}>
            <Input
                value={email}
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEmail(e.target.value)
                }
                placeholder="email"
            />
            <Input
                value={password}
                type="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                }
                placeholder="Password"
            />
            <button type="submit">Authentication</button>
            {authError ? (
                <>
                    <br />
                    {authError}
                </>
            ) : null}
        </form>
    );
};
