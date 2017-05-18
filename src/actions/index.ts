
import * as AuthorizationActions from './authorization.actions';
import {HomeActions} from "./home.actions";
import {GlobalActions} from "./global.actions";


// export here for object imports
export {
    AuthorizationActions,
    HomeActions,
    GlobalActions

};

// export here for injecting the dependencies (e.g. at bootstrap)
export default [
    AuthorizationActions,
    HomeActions,
    GlobalActions
];
