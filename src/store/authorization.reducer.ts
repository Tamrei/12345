import { AuthorizationActions } from '../actions/authorization.actions';

export interface AuthorizationState {
    loading: boolean;
    error: boolean;
    errorMessage: any
}

const initialState: AuthorizationState = {
    loading: false,
    error: false,
    errorMessage: ''
};

export function authorizationReducer(state: AuthorizationState = initialState, action:any) : AuthorizationState {
    switch (action.type) {
        case AuthorizationActions.LOADING:
            return {
                loading : true,
                error: false,
                errorMessage: null
            };
        case AuthorizationActions.LOGIN_SUCCESS:
            return {
                loading : false,
                error: false,
                errorMessage: null
            };
        case AuthorizationActions.LOGIN_ERROR:
            return {
                loading : false,
                error: true,
                errorMessage: action.payload
            };
        case AuthorizationActions.SING_UP_SUCCESS:
            return {
                loading : false,
                error: false,
                errorMessage: null
            };
        case AuthorizationActions.SING_UP_ERROR:
            return {
                loading : false,
                error: true,
                errorMessage: action.payload
            };
        case AuthorizationActions.RELEASE_ERROR:
            return {
                loading : false,
                error: false,
                errorMessage: null
            };
        default:
            return state;
    }
}
