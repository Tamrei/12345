import {GlobalActions} from "../actions/global.actions";

export interface GlobalState {
    loading: boolean;
    error: boolean;
    errorMessage: any;
    globalMessage: string;
    toastMessage: string;
}

const initialState: GlobalState = {
    loading: false,
    error: false,
    errorMessage: 'empty',
    globalMessage: null,
    toastMessage: null
};

export function globalReducer(state: GlobalState = initialState, action:any) : GlobalState {
    switch (action.type) {
        case GlobalActions.LOADING:
            return Object.assign({}, state, {
                loading: true
            });
        case GlobalActions.STOP_LOADING:
            return Object.assign({}, state, {
                loading: false
            });
        case GlobalActions.PUSH_GLOBAL_MESSAGE:
            return Object.assign({}, state, {
                globalMessage: action.payload
            });
        case GlobalActions.RELEASE_GLOBAL_MESSAGE:
            return Object.assign({}, state, {
                globalMessage: null
            });
        case GlobalActions.PUSH_TOAST_MESSAGE:
            return Object.assign({}, state, {
                toastMessage: action.payload
            });
        case GlobalActions.RELEASE_TOAST_MESSAGE:
            return Object.assign({}, state, {
                toastMessage: null
            });
        default:
            return state;
    }
}
