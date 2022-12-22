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
    return async (dispatch) => {
        await axios.post('https://api.dev.rtts-sandbox.test-and-trace.nhs.uk/authentication', requestData,{
            headers: {
            'Content-Type': 'application/json',
            }
          })
        .then(response => {
            if(response.data.errorType ){
                dispatch(authenticationFailed('Something went wrong'));
            } else if (response.data.responseBody){
                dispatch(authenticationSucess(response.data.responseBody));
            }
        })
        .catch(error => {
            dispatch(authenticationFailed(error));
        })
    }
}

