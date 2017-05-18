import { combineReducers } from 'redux';
import { routerReducer } from 'ng2-redux-router';
import {authorizationReducer, AuthorizationState} from "./authorization.reducer";
import {HomeState, homeReducer} from "./home.reducer";
import {GlobalState, globalReducer} from "./global.reducer";
// import {AuthorizationState} from "../reducers/authorization.redicer";

export class IAppState {
    authorization?: AuthorizationState;
    home?: HomeState;
    global?: GlobalState;
}

export const rootReducer = combineReducers<IAppState>({
    authorization: authorizationReducer,
    home: homeReducer,
    global: globalReducer
});


