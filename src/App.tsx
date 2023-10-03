import { Dispatch, useCallback, useReducer } from 'react';
import { ActionType } from 'lib/FSM';
import { routing } from 'pages';
import {
    ActionContext,
    GetStateContext,
    Transition,
    State,
    reducer,
    initState,
} from 'store';
import './styles/App.scss';

export const App = () => {
    const [state, dispatch] = useReducer(reducer, initState);
    const getState = useCallback(() => state, [state]);

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
