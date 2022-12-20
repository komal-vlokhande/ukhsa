import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authenticationSucess = (responseData: any) =>{
    return {
        type: actionTypes.AUTHENTICATIONSUCESS,
        payload: responseData
    }
}

export const authenticationFailed = (error: any) =>{
    return {
        type: actionTypes.AUTHENTICATIONFAILED,
        error: error
    }
}

export const getAuthenticationDetails = ( requestData: {} ) => {
    return (dispatch) => {
        requestData = {
            event: requestData
        }
        // requestData = { "failureCode": null, "timeoutExpiry": null, redirectURL:'http://localhost:8080/welcome', authToken:'765478935hgjdsbchjds' }
        // dispatch(authenticationSucess(requestData));
        axios.post('http://localhost:3000/authenticate', requestData,{
            headers: {
            'Content-Type': 'application/json'
            }
          })
        .then(response => {
            // response.data.body = { "failureCode": null, "timeoutExpiry": null, redirectURL:'http://localhost:8080/welcome', authToken:'765478935hgjdsbchjds' }
            dispatch(authenticationSucess(response.data.responseBody));
        })
        .catch(error => {
            dispatch(authenticationFailed(error));
        })
    }
}

