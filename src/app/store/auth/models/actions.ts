import { auth } from './auth';

export const FETCH_AUTH_REQUEST = 'FETCH_AUTH_REQUEST';
export const FETCH_AUTH_SUCCESS = 'FETCH_AUTH_SUCCESS';
export const FETCH_AUTH_FAILURE = 'FETCH_AUTH_FAILURE';

interface authAsync {
  loading: boolean;
  authDetails: auth;
  error: string;
}

interface FetchAuthRequest extends authAsync {
  type: typeof FETCH_AUTH_REQUEST;
}
interface FetchAuthSuccess extends authAsync {
  type: typeof FETCH_AUTH_SUCCESS;
}
interface FetchAuthFailure extends authAsync {
  type: typeof FETCH_AUTH_FAILURE;
}

export type AuthActionTypes =
  | FetchAuthRequest
  | FetchAuthSuccess
  | FetchAuthFailure;
