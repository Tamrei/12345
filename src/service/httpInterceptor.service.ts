import {Injectable} from '@angular/core';
import {
    Http, Response, Headers, RequestOptions, Request, URLSearchParams, ConnectionBackend,
    RequestOptionsArgs
} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import {Router} from "@angular/router";
import {IAppState} from "../store/index";
import {NgRedux} from "ng2-redux";
import {GlobalActions} from "../actions/global.actions";

@Injectable()
export class HttpInterceptor extends Http {

    constructor(backend: ConnectionBackend,
                defaultOptions: RequestOptions,
                private router: Router,
                private ngRedux: NgRedux<IAppState>) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, options));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.get(url,options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.delete(url, options));
    }

    getRequestOptionArgs(options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        return options;
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
            if (err.status == 401) {
                this.router.navigate(['/login']);
                // this.ngRedux.dispatch({ type: GlobalActions.STOP_LOADING });
                // this.ngRedux.dispatch({ type: GlobalActions.RELEASE_ERROR });
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        });

    }
}