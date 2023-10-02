import type { AuthService } from 'features';
import type { ProtoState } from 'lib/FSM';
import { AuthStages } from './enums';

type Profile = {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: 'male' | 'female';
    image: string;
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
