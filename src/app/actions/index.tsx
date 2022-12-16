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

export const getAuthenticationDetails = ( requestData: any ) => {
    return (dispatch) => {
        // requestData = {
        //     event: {"urlToken": "77cef30cec6b5d62c4b5ac81daae161d4dbd2571fa0200d0d5bbb780201de00e",
        //     "dob": "01012000" }
        // }
        requestData = { "failureCode": null, "timeoutExpiry": null, redirectURL:'http://localhost:8080/welcome', authToken:'765478935hgjdsbchjds' }
        dispatch(authenticationSucess(requestData));
        // axios.post('http://localhost:3000/authenticate', requestData,{
        //     headers: {
        //     'Content-Type': 'application/json'
        //     }
        //   })
        // .then(response => {
        //     response.data.body = { "failureCode": null, "timeoutExpiry": null, redirectURL:'http://localhost:8080/welcome', authToken:'765478935hgjdsbchjds' }
        //     dispatch(authenticationSucess(response.data.body));
        // })
        // .catch(error => {
        //     dispatch(authenticationFailed(error));
        // })
    }
}

