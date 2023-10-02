import { Dispatch, useCallback, useEffect, useReducer } from 'react';
import { ActionType } from 'lib/FSM';
import { routing } from 'pages';
import {
    ActionContext,
    GetStateContext,
    Transition,
    State,
    reducer,
    useCheckAuth,
    initState,
} from 'store';
import { Stages } from 'store/enums';

export const App = () => {
    const [state, dispatch] = useReducer(reducer, initState);
    const getState = useCallback(() => state, [state]);

    const checkAuth = useCheckAuth(dispatch, state.data.authService);

    useEffect(() => {
        if (state.stage === Stages.CHECKING_AUTH) {
            checkAuth();
        }
    }, [state.stage, checkAuth]);

    console.log('Render App', state);
    return (
        <ActionContext.Provider
            value={dispatch as Dispatch<ActionType<State, State, Transition>>}
        >
            <GetStateContext.Provider value={getState}>
                {routing(state)}
            </GetStateContext.Provider>
        </ActionContext.Provider>
    );
};
