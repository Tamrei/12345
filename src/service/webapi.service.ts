import {Injectable} from '@angular/core';
import {Http, Response, Headers, RequestOptions, Request, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';

import {WEB_API_URL, PROXY_URL} from '../config/constans'
import {CookieService} from "./cookie.service";

@Injectable()
export class WebApiService {

    constructor(private http:Http, private cookie: CookieService) {
    }

    public login(data: any) {
        return this.http.post(WEB_API_URL + "/user/login", data).map(res => res.json())
    }

    public singUp(data: any) {
        return this.http.post(WEB_API_URL + "/user/signUp", data).map(res => res.json())
    }

    public getAllGames() {
        let headers = new Headers();
        headers.append("Token", this.cookie.getCookie("Token"));

        let options = new RequestOptions({
            method: "GET",
            url: WEB_API_URL + "/games/getAll",
            headers: headers,
        });

        return this.http.request(new Request(options)).map(res => res.json())
    }

    public getUserGames() {
        let headers = new Headers();
        headers.append("Token", this.cookie.getCookie("Token"));

        let options = new RequestOptions({
            method: "GET",
            url: WEB_API_URL + "/user/getUserGames",
            headers: headers,
        });

        return this.http.request(new Request(options)).map(res => res.json())
    }

    public getGameFromSteam(steamId: string) {
        let headers = new Headers();
        headers.append("Token", this.cookie.getCookie("Token"));

        let options = new RequestOptions({
            method: "GET",
            url: WEB_API_URL + "/games/loadFromSteam/" + steamId,
            headers: headers,
        });

        return this.http.request(new Request(options)).map(res => res.json())
    }

    public saveGame(game: Object) {
        let headers = new Headers();
        headers.append("Token", this.cookie.getCookie("Token"));

        let options = new RequestOptions({
            method: "POST",
            url: WEB_API_URL + "/games/save",
            headers: headers,
            body: game
        });

        return this.http.request(new Request(options)).map(res => res.json())
    }

    public deleteGame(_id: string) {
        let headers = new Headers();
        headers.append("Token", this.cookie.getCookie("Token"));

        let options = new RequestOptions({
            method: "POST",
            url: WEB_API_URL + "/games/delete",
            headers: headers,
            body: {_id: _id}
        });

        return this.http.request(new Request(options)).map(res => res.json())
    }

    public bindGameToUser(gameId: string) {
        let headers = new Headers();
        headers.append("Token", this.cookie.getCookie("Token"));

        let options = new RequestOptions({
            method: "POST",
            url: WEB_API_URL + "/user/bindGame",
            headers: headers,
            body: {gameId: gameId}
        });

        return this.http.request(new Request(options)).map(res => res.json())
    }

    public createProposal(gameId: string, description: string) {
        let headers = new Headers();
        headers.append("Token", this.cookie.getCookie("Token"));

        let options = new RequestOptions({
            method: "POST",
            url: WEB_API_URL + "/proposal/create",
            headers: headers,
            body: {
                gameId: gameId,
                description: description
            }
        });

        return this.http.request(new Request(options)).map(res => res.json())
    }

    public getProposalUsers(gameId: string) {
        let headers = new Headers();
        headers.append("Token", this.cookie.getCookie("Token"));

        let options = new RequestOptions({
            method: "POST",
            url: WEB_API_URL + "/proposal/getByGame",
            headers: headers,
            body: {gameId: gameId}
        });

        return this.http.request(new Request(options)).map(res => res.json())
    }

    public joinProposal(gameId: string) {
        let headers = new Headers();
        headers.append("Token", this.cookie.getCookie("Token"));

        let options = new RequestOptions({
            method: "POST",
            url: WEB_API_URL + "/proposal/join",
            headers: headers,
            body: {gameId: gameId}
        });

        return this.http.request(new Request(options)).map(res => res.json())
    }

    public pushMessage(type: string, to: string, content: string) {
        let headers = new Headers();
        headers.append("Token", this.cookie.getCookie("Token"));

        let options = new RequestOptions({
            method: "POST",
            url: WEB_API_URL + "/messages/push",
            headers: headers,
            body: {
                type: type,
                to: to,
                content: content
            }
        });

        return this.http.request(new Request(options)).map(res => res.json())
    }

    public pushMessage_v2(data: Object) {
        let headers = new Headers();
        headers.append("Token", this.cookie.getCookie("Token"));

        let options = new RequestOptions({
            method: "POST",
            url: WEB_API_URL + "/messages/push",
            headers: headers,
            body: data
        });

        return this.http.request(new Request(options)).map(res => res.json())
    }

    public updateUser(body: any) {
        let headers = new Headers();
        headers.append("Token", this.cookie.getCookie("Token"));

        let options = new RequestOptions({
            method: "POST",
            url: WEB_API_URL + "/user/update",
            headers: headers,
            body: body
        });

        return this.http.request(new Request(options)).map(res => res.json())
    }

    public getMyProfile() {
        let headers = new Headers();
        headers.append("Token", this.cookie.getCookie("Token"));

        let options = new RequestOptions({
            method: "GET",
            url: WEB_API_URL + "/user/myProfile",
            headers: headers
        });

        return this.http.request(new Request(options)).map(res => res.json())
    }

    public getProfile(userId: string) {
        let headers = new Headers();
        headers.append("Token", this.cookie.getCookie("Token"));

        let options = new RequestOptions({
            method: "GET",
            url: WEB_API_URL + "/user/profile/" + userId,
            headers: headers,
        });

        return this.http.request(new Request(options)).map(res => res.json())
    }

    public getAllUsers() {
        let headers = new Headers();
        headers.append("Token", this.cookie.getCookie("Token"));

        let options = new RequestOptions({
            method: "GET",
            url: WEB_API_URL + "/user/getAll",
            headers: headers
        });

        return this.http.request(new Request(options)).map(res => res.json())
    }

    public getMessages() {
        let headers = new Headers();
        headers.append("Token", this.cookie.getCookie("Token"));

        let options = new RequestOptions({
            method: "GET",
            url: WEB_API_URL + "/messages/get",
            headers: headers
        });

        return this.http.request(new Request(options)).map(res => res.json())
    }

    public getUserChat(userId: string) {
        let headers = new Headers();
        headers.append("Token", this.cookie.getCookie("Token"));

        let options = new RequestOptions({
            method: "GET",
            url: WEB_API_URL + "/messages/getChat/" + userId,
            headers: headers
        });

        return this.http.request(new Request(options)).map(res => res.json())
    }

    public getMessagesForGame(gameId: string) {
        let headers = new Headers();
        headers.append("Token", this.cookie.getCookie("Token"));

        let options = new RequestOptions({
            method: "GET",
            url: WEB_API_URL + "/messages/forGame/" + gameId,
            headers: headers
        });

        return this.http.request(new Request(options)).map(res => res.json())
    }

    public registerSocket(socket_id: string) {
        let headers = new Headers();
        headers.append("Token", this.cookie.getCookie("Token"));

        let options = new RequestOptions({
            method: "POST",
            url: WEB_API_URL + "/registerSocket",
            headers: headers,
            body: {socket_id : socket_id}
        });

        return this.http.request(new Request(options)).map(res => res.json())
    }

    // Uses Observable.forkJoin() to run multiple concurrent http.get() requests.
    // The entire operation will result in an error state if any single request fails.
    getPaymentRequests() {
        return Observable.forkJoin(
            this.http.get('/app/books.json').map((res:Response) => res.json()),
            this.http.get('/app/movies.json').map((res:Response) => res.json())
        );
    }
}
