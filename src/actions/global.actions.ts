import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import {IAppState} from "../store";


@Injectable()
export class GlobalActions {
    constructor (private ngRedux: NgRedux<IAppState>) {}

    //TODO: temp
    public static RELEASE_ERROR: string = 'RELEASE_ERROR';

    public static LOADING: string = 'LOADING';
    public static STOP_LOADING: string = 'STOP_LOADING';

    public static PUSH_GLOBAL_MESSAGE: string = 'PUSH_GLOBAL_MESSAGE';
    public static RELEASE_GLOBAL_MESSAGE: string = 'RELEASE_GLOBAL_MESSAGE';

    public static PUSH_TOAST_MESSAGE: string = 'PUSH_TOAST_MESSAGE';
    public static RELEASE_TOAST_MESSAGE: string = 'RELEASE_TOAST_MESSAGE';

    loading() {
        this.ngRedux.dispatch({type : GlobalActions.LOADING});
    }

    stopLoading() {
        this.ngRedux.dispatch({type : GlobalActions.STOP_LOADING});
    }

    releaseError() {
        this.ngRedux.dispatch({type : GlobalActions.RELEASE_ERROR});
    }

    pushGlobalMessage(message: string) {
        this.ngRedux.dispatch({type : GlobalActions.PUSH_GLOBAL_MESSAGE, payload : message});
    }

    releaseGlobalMessage() {
        this.ngRedux.dispatch({type : GlobalActions.RELEASE_GLOBAL_MESSAGE});
    }

    pushToastMessage(message: string) {
        this.ngRedux.dispatch({type : GlobalActions.PUSH_TOAST_MESSAGE, payload : message});
    }

    releaseToastMessage() {
        this.ngRedux.dispatch({type : GlobalActions.RELEASE_TOAST_MESSAGE});
    }
}
