import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, Request, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';

import {WEB_API_URL, PROXY_URL} from '../config/constans'
import {CookieService} from "./cookie.service";

@Injectable()
export class PaymentRequestsService {

    constructor(private http:Http, private cookie: CookieService) {
    }

    public getPaymentReqHistory(type) {
        let headers = new Headers();
        headers.append("Token", this.cookie.getCookie("Token"));

        let options = new RequestOptions({
            method: "GET",
            url: WEB_API_URL + "/payment-request/history/" + type,
            headers: headers,
            //search:  new URLSearchParams(`type=${type}&from=${till}&page_size=${pageSize}`)
        });

        return this.http.request(new Request(options)).map(res => res.json())
    }

    public getPendingPaymentReq(type) {
        let headers = new Headers();
        headers.append("Token", this.cookie.getCookie("Token"));

        let options = new RequestOptions({
            method: "GET",
            url: WEB_API_URL + "/payment-request/pending/" + type,
            headers: headers,
            //search:  new URLSearchParams(`type=${type}&from=${till}&page_size=${pageSize}`)
        });

        return this.http.request(new Request(options)).map(res => res.json())
    }

    // Uses Observable.forkJoin() to run multiple concurrent http.get() requests.
    // The entire operation will result in an error state if any single request fails.
    getPaymentRequests(type) {
        let headers = new Headers();
        headers.append("Token", this.cookie.getCookie("Token"));

        let historyReq = new RequestOptions({
            method: "GET",
            url: WEB_API_URL + "/payment-request/history/" + type,
            headers: headers,
            //search:  new URLSearchParams(`type=${type}&from=${till}&page_size=${pageSize}`)
        });

        let pendingReq = new RequestOptions({
            method: "GET",
            url: WEB_API_URL + "/payment-request/pending/" + type,
            headers: headers,
            //search:  new URLSearchParams(`type=${type}&from=${till}&page_size=${pageSize}`)
        });

        return Observable.forkJoin(
            this.http.request(new Request(historyReq)).map(res => res.json()),
            this.http.request(new Request(pendingReq)).map(res => res.json())
        );
    }
}

