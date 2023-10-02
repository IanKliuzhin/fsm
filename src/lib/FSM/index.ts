import { Dispatch, Reducer, createContext } from 'react';

type Stage = string;
type TransitionType = string;

export type ProtoState = {
    stage: Stage;
    data: unknown;
};

export type ProtoTransition<
    STATE_FROM extends ProtoState,
    STATE_TO extends ProtoState,
> = {
    type: TransitionType;
    from: STATE_FROM['stage'];
    to: STATE_TO['stage'];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collectData: (oldState: any, payload: any) => STATE_TO['data'];
};

export type ActionType<
    STATE_FROM extends ProtoState,
    STATE_TO extends ProtoState,
    TRANSITION extends ProtoTransition<STATE_FROM, STATE_TO>,
> = {
    type: TRANSITION['type'];
    payload: Parameters<TRANSITION['collectData']>[1];
};

export class FSM<
    STATE extends ProtoState,
    TRANSITION extends ProtoTransition<STATE, STATE>,
> {
    private stage: STATE['stage'];

    private transitions: TRANSITION[] = [];

    GetStateContext: React.Context<() => STATE>;

    reducer: Reducer<STATE, ActionType<STATE, STATE, TRANSITION>>;

    ActionContext = createContext<
        Dispatch<ActionType<STATE, STATE, TRANSITION>>
    >(() => null);

    constructor(transitions: TRANSITION[], initState: STATE) {
        this.stage = initState.stage;

        this.transitions = transitions;

        this.reducer = (state, action) => {
            console.log('OLD STATE:', state, 'ACTION', action);
            const transition = this.transitions.find(
                (transition) =>
                    transition.from === this.stage &&
                    transition.type === action.type,
            );
            if (transition) {
                this.stage = transition.to;
                return {
                    ...state,
                    stage: transition.to,
                    data: transition.collectData(state, action.payload),
                };
            } else return state;
        };

        this.GetStateContext = createContext(() => initState);
    }
}
