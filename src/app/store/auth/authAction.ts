import { Dispatch } from 'redux';
import { AppActions } from '../models/actions';

import {
    FETCH_AUTH_REQUEST,
    FETCH_AUTH_SUCCESS,
    FETCH_AUTH_FAILURE,
} from './models/actions';
import { auth } from './models/auth';

export const requestAuthentication = (): AppActions => ({
  type: FETCH_AUTH_REQUEST,
  loading: true,
  authDetails: {
    failureCode : '',
    timeoutExpiry : '',
    redirectURL : '',
    authToken : ''
  },
  error: '',
});
const receiveAuthenticationDetails = (authDetails: auth): AppActions => ({
  type: FETCH_AUTH_SUCCESS,
  loading: false,
  authDetails: authDetails,
  error: '',
});
const invalidateAuthenticationDetails = (): AppActions => ({
  type: FETCH_AUTH_FAILURE,
  loading: false,
  authDetails: {
    failureCode : '',
    timeoutExpiry : '',
    redirectURL : '',
    authToken : ''

  },
  error: 'Unable to fetch todo list',
});

export const getAuthenticationDetails = (reqData: {}) => {
  return (dispatch: Dispatch<AppActions>) => {
    dispatch(requestAuthentication());
    console.log('gfdgfdfgd')
    debugger;
    return fetch(`https://jsonplaceholder.typicode.com/todos?_limit=5`, reqData)
      .then((res) => res.json())
      .then((json) => dispatch(receiveAuthenticationDetails(json)));
  };
};
