import * as actionTypes from '../actions/actionTypes';

const initialState = {
    authDetails: {
        failureCode: null , 
        timeoutExpiry: null, 
        redirectURL: null, 
        authToken: null
    },
    error: null
}

const authenticationSucess = (state: any, action: any ) => {
    return {
        ...state,
        authDetails : action.payload
    }
}

const authenticationFailed = (state: any, action: any) => {
    return {
        ...state,
        error : action.error
    }
    
}

const reducer = (state = initialState, action: any) => {
    switch( action.type ) {
        case actionTypes.AUTHENTICATIONSUCESS : return authenticationSucess ( state, action );
        case actionTypes.AUTHENTICATIONFAILED : return authenticationFailed ( state, action );
    }
    return state;
}

export default reducer;