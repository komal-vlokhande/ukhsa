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
        await axios.post(`${process.env.API_ENDPOINT}/authentication`, requestData,{
            headers: {
            'Content-Type': 'application/json',
            }
          })
        .then(response => {
            if(response.data.errorType ){
                dispatch(authenticationFailed('Something went wrong'));
            } else if (response.data.body){
                dispatch(authenticationSucess(response.data.body));
            }
        })
        .catch(error => {
            dispatch(authenticationFailed(error));
        })
    }
}

