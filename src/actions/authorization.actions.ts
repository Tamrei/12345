import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import {IAppState} from "../store";
import {WebApiService} from "../service/webapi.service";
import {CookieService} from "../service/cookie.service";
import {Router} from "@angular/router";
import {ErrorMessageService} from "../service/errorMessage.service";
import {GlobalActions} from "./global.actions";

@Injectable()
export class AuthorizationActions {
    constructor (private ngRedux: NgRedux<IAppState>,
                 private webApi: WebApiService,
                 private cookie: CookieService,
                 private errorMessage: ErrorMessageService,
                 private router: Router) {}

    //TODO: temp
    public static RELEASE_ERROR: string = 'RELEASE_ERROR';

    public static LOADING: string = 'LOADING';

    public static LOGIN_SUCCESS: string = 'LOGIN_SUCCESS';
    public static LOGIN_ERROR: string = 'LOGIN_ERROR';

    public static SING_UP_SUCCESS: string = 'SING_UP_SUCCESS';
    public static SING_UP_ERROR: string = 'SING_UP_ERROR';

    loading() {
        this.ngRedux.dispatch({ type: GlobalActions.LOADING });
    }

    stopLoading() {
        this.ngRedux.dispatch({ type: GlobalActions.STOP_LOADING });
    }

    login(payload) {
        this.loading();

        this.webApi.login(payload).subscribe(
            success => {
                this.ngRedux.dispatch({type: AuthorizationActions.LOGIN_SUCCESS, payload: payload});

                this.cookie.setCookie("Token", success.token, 'session');

                this.stopLoading();

                this.router.navigate(['home'])
            }, error => {
                this.stopLoading();
                this.ngRedux.dispatch({type: AuthorizationActions.LOGIN_ERROR,
                    payload: this.errorMessage.getMessageFromErrorData(error)});
                console.log(error);
                //this.router.navigate(['home/myAccount'])
            },
            () => this.stopLoading()
        );
    }

    singUp(payload) {
        this.loading();

        this.webApi.singUp(payload).subscribe(
            success => {
                this.stopLoading();
                console.log(success);
                this.ngRedux.dispatch({type: AuthorizationActions.SING_UP_SUCCESS, payload: payload});
                this.router.navigate(['login']);
                //this.router.navigate(['confirm-mail', payload.login,  payload.password]);
            }, error => {
                this.stopLoading();
                this.ngRedux.dispatch({type: AuthorizationActions.SING_UP_ERROR,
                    payload: this.errorMessage.getMessageFromErrorData(error)});
                console.log(error);
            },
            () => this.stopLoading()
        );
    }

    releaseError() {
        this.ngRedux.dispatch({type : AuthorizationActions.RELEASE_ERROR});
    }
}
