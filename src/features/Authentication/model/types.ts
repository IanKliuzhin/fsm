import type { AuthService } from 'features';
import type { ProtoState } from 'lib/FSM';
import type { Stages } from 'store/enums';

type Profile = {
    id: number;
    name: string;
    role: string;
    avatar: string;
};

type AuthStoreType = {
    authService: AuthService;
    authError?: string | null;
    profile?: Profile;
};

export interface CheckingAuthState extends ProtoState {
    stage: Stages.CHECKING_AUTH;
    data: AuthStoreType;
}

export interface NotAuthenticatedState extends ProtoState {
    stage: Stages.NOT_AUTHENTICATED;
    data: AuthStoreType;
}

export interface AuthenticatingState extends ProtoState {
    stage: Stages.AUTHENTICATING;
    data: AuthStoreType;
}

export type AuthState =
    | CheckingAuthState
    | NotAuthenticatedState
    | AuthenticatingState;
