import { ProtoTransition } from 'lib/FSM';
import { TransitionTypes, Stages } from 'store/enums';
import {
    CheckingAuthState,
    NotAuthenticatedState,
    AuthenticatingState,
} from './types';

export const trCheckingAuthToNotAuthenticated = {
    type: TransitionTypes.CHECKING_AUTH__NOT_AUTHENTICATED,
    from: Stages.CHECKING_AUTH,
    to: Stages.NOT_AUTHENTICATED,
    collectData: (state) => ({
        ...state.data,
    }),
} satisfies ProtoTransition<CheckingAuthState, NotAuthenticatedState>;

export const trNotAuthToAuthenticating = {
    type: TransitionTypes.NOT_AUTHENTICATED__AUTHENTICATING,
    from: Stages.NOT_AUTHENTICATED,
    to: Stages.AUTHENTICATING,
    collectData: (state) => ({
        ...state.data,
        authError: null,
    }),
} satisfies ProtoTransition<NotAuthenticatedState, AuthenticatingState>;

export const trAuthenticatingToNotAuthenticated = {
    type: TransitionTypes.AUTHENTICATING__NOT_AUTHENTICATED,
    from: Stages.AUTHENTICATING,
    to: Stages.NOT_AUTHENTICATED,
    collectData: (state, { authError }) => ({
        ...state.data,
        authError,
    }),
} satisfies ProtoTransition<AuthenticatingState, NotAuthenticatedState>;
