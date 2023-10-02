import { ProtoTransition } from 'lib/FSM';
import {
    CheckingAuthState,
    NotAuthenticatedState,
    AuthenticatingState,
    AuthTransitionTypes,
    AuthStages,
} from './types';

export const trCheckingAuthToNotAuthenticated = {
    type: AuthTransitionTypes.CHECKING_AUTH__NOT_AUTHENTICATED,
    from: AuthStages.CHECKING_AUTH,
    to: AuthStages.NOT_AUTHENTICATED,
    collectData: (state) => ({
        ...state.data,
    }),
} satisfies ProtoTransition<CheckingAuthState, NotAuthenticatedState>;

export const trNotAuthToAuthenticating = {
    type: AuthTransitionTypes.NOT_AUTHENTICATED__AUTHENTICATING,
    from: AuthStages.NOT_AUTHENTICATED,
    to: AuthStages.AUTHENTICATING,
    collectData: (state) => ({
        ...state.data,
        authError: null,
    }),
} satisfies ProtoTransition<NotAuthenticatedState, AuthenticatingState>;

export const trAuthenticatingToNotAuthenticated = {
    type: AuthTransitionTypes.AUTHENTICATING__NOT_AUTHENTICATED,
    from: AuthStages.AUTHENTICATING,
    to: AuthStages.NOT_AUTHENTICATED,
    collectData: (state, { authError }) => ({
        ...state.data,
        authError,
    }),
} satisfies ProtoTransition<AuthenticatingState, NotAuthenticatedState>;
