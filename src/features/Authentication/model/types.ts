import type { AuthService } from 'features';
import type { ProtoState } from 'lib/FSM';

export enum AuthStages {
    CHECKING_AUTH = 'CHECKING_AUTH',
    NOT_AUTHENTICATED = 'NOT_AUTHENTICATED',
    AUTHENTICATING = 'AUTHENTICATING',
}

export enum AuthTransitionTypes {
    CHECKING_AUTH__NOT_AUTHENTICATED = 'CHECKING_AUTH__NOT_AUTHENTICATED',
    NOT_AUTHENTICATED__AUTHENTICATING = 'NOT_AUTHENTICATED__AUTHENTICATING',
    AUTHENTICATING__NOT_AUTHENTICATED = 'AUTHENTICATING__NOT_AUTHENTICATED',
}

type Profile = {
    id: number;
    name: string;
    role: string;
    avatar: string;
};

export type AuthStoreType = {
    authService: AuthService;
    authError?: string | null;
    profile?: Profile;
};

export interface CheckingAuthState extends ProtoState {
    stage: AuthStages.CHECKING_AUTH;
    data: AuthStoreType;
}

export interface NotAuthenticatedState extends ProtoState {
    stage: AuthStages.NOT_AUTHENTICATED;
    data: AuthStoreType;
}

export interface AuthenticatingState extends ProtoState {
    stage: AuthStages.AUTHENTICATING;
    data: AuthStoreType;
}

export type AuthState =
    | CheckingAuthState
    | NotAuthenticatedState
    | AuthenticatingState;
