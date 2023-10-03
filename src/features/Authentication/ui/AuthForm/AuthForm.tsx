import { useContext, useEffect, useState } from 'react';
import { Input } from 'shared/ui';
import { ActionContext, AuthState, GetStateContext } from 'store';
import { Stages, TransitionTypes } from 'store/enums';
import { useAuthenticate } from '../..//model';

export const AuthForm = () => {
    const [username, setUsername] = useState('');
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
            authenticate(username, password);
        }
    }, [stage, authenticate, username, password]);

    return (
        <form onSubmit={onSubmit}>
            <Input
                value={username}
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                }
                placeholder="username"
            />
            atuny0
            <Input
                value={password}
                type="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                }
                placeholder="Password"
            />
            9uQFF1Lh
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
