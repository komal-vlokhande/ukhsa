import {
    AuthActionTypes,
    FETCH_AUTH_REQUEST,
    FETCH_AUTH_SUCCESS,
    FETCH_AUTH_FAILURE,
  } from './models/actions';
  
  import { auth } from './models/auth';
  
  interface AuthState {
    loading: boolean;
    auth: auth;
    error: string;
  }
  
  const defaultState: AuthState = {
    loading: false,
    auth: {
        failureCode : '',
        timeoutExpiry : '',
        redirectURL : '',
        authToken : ''
    },
    error: '',
  };
  
  export const authReducer = (
    state = defaultState,
    action: AuthActionTypes
  ): AuthState => {
    switch (action.type) {
      case FETCH_AUTH_REQUEST:
        return { 
            loading: true, 
            auth: {
                    failureCode : '',
                    timeoutExpiry : '',
                    redirectURL : '',
                    authToken : ''
                    }, 
            error: '' };
      case FETCH_AUTH_SUCCESS:
        return { loading: false, auth: action.authDetails, error: '' };
      case FETCH_AUTH_FAILURE:
        return { loading: false, 
            auth: {
                    failureCode : '',
                    timeoutExpiry : '',
                    redirectURL : '',
                    authToken : ''
                }, 
            error: action.error };
      default:
        return state;
    }
  };
  