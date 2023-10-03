import type { AuthService } from 'features';
import type { ProtoState } from 'lib/FSM';
import { AuthStages } from './enums';

export type AuthStoreType = {
    authService: AuthService;
    authError?: string | null;
};

export interface NotAuthenticatedState extends ProtoState {
    stage: AuthStages.NOT_AUTHENTICATED;
    data: AuthStoreType;
}

export interface AuthenticatingState extends ProtoState {
    stage: AuthStages.AUTHENTICATING;
    data: AuthStoreType;
}

export type AuthState = NotAuthenticatedState | AuthenticatingState;
