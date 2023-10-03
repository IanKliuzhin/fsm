import { useContext, useEffect, useState } from 'react';
import { Input, Loader } from 'shared/ui';
import { Button } from 'shared/ui/Button';
import { ActionContext, AuthState, GetStateContext } from 'store';
import { Stages, TransitionTypes } from 'store/enums';
import { useAuthenticate } from '../../model';
import classes from './AuthForm.module.scss';

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
        <form onSubmit={onSubmit} className={classes.form}>
            <Input
                value={username}
                type="text"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setUsername(e.target.value)
                }
                placeholder="Username"
                className={classes.input}
            />
            <Input
                value={password}
                type="password"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                }
                placeholder="Password"
                className={classes.input}
            />
            {stage === Stages.AUTHENTICATING ? (
                <Loader />
            ) : (
                <>
                    <Button
                        text="Authentication"
                        type="submit"
                        className={classes.button}
                    />
                    <div className={classes.hint}>
                        You can use pair atuny0 / 9uQFF1Lh
                    </div>
                </>
            )}
            {authError && <div className={classes.error}>{authError}</div>}
        </form>
    );
};
