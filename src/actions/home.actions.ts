import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import {IAppState} from "../store";
import {WebApiService} from "../service/webapi.service";
import {CookieService} from "../service/cookie.service";
import {Router} from "@angular/router";
import {ErrorMessageService} from "../service/errorMessage.service";
import {GlobalActions} from "./global.actions";
import {PROPOSE_MESSAGE} from "../config/constans";

declare var alertify:any;

@Injectable()
export class HomeActions {
    constructor (private ngRedux: NgRedux<IAppState>,
                 private webApi: WebApiService,
                 private cookie: CookieService,
                 private errorMessage: ErrorMessageService,
                 private router: Router) {}

    //TODO: temp
    public static RELEASE_ERROR: string = 'RELEASE_ERROR';

    public static LOADING: string = 'LOADING';

    public static GET_ALL_GAMES_SUCCESS: string = 'GET_ALL_GAMES_SUCCESS';
    public static GET_ALL_GAMES_ERROR: string = 'GET_ALL_GAMES_ERROR';

    public static GET_USER_GAMES_SUCCESS: string = 'GET_USER_GAMES_SUCCESS';
    public static GET_USER_GAMES_ERROR: string = 'GET_USER_GAMES_ERROR';

    public static GET_GAME_FROM_STEAM_SUCCESS: string = 'GET_GAME_FROM_STEAM_SUCCESS';
    public static GET_GAME_FROM_STEAM_ERROR: string = 'GET_GAME_FROM_STEAM_ERROR';

    public static SAVE_GAME_SUCCESS: string = 'SAVE_GAME_SUCCESS';
    public static SAVE_GAME_ERROR: string = 'SAVE_GAME_ERROR';

    public static DELETE_GAME_SUCCESS: string = 'DELETE_GAME_SUCCESS';
    public static DELETE_GAME_ERROR: string = 'DELETE_GAME_ERROR';

    public static BIND_GAME_TO_USER_SUCCESS: string = 'BIND_GAME_TO_USER_SUCCESS';
    public static BIND_GAME_TO_USER_ERROR: string = 'BIND_GAME_TO_USER_ERROR';

    public static CREATE_GAME_PROPOSAL_SUCCESS: string = 'CREATE_GAME_PROPOSAL_SUCCESS';
    public static CREATE_GAME_PROPOSAL_ERROR: string = 'CREATE_GAME_PROPOSAL_ERROR';

    public static GET_PROPOSAL_USERS_SUCCESS: string = 'GET_PROPOSAL_USERS_SUCCESS';
    public static GET_PROPOSAL_USERS_ERROR: string = 'GET_PROPOSAL_USERS_ERROR';

    public static GET_ALL_USERS_SUCCESS: string = ' GET_ALL_USERS_SUCCESS';
    public static GET_ALL_USERS_ERROR: string = ' GET_ALL_USERS_ERROR';

    public static GET_USER_MESSAGES_SUCCESS: string = 'GET_USER_MESSAGES_SUCCESS';
    public static GET_USER_MESSAGES_ERROR: string = 'GET_USER_MESSAGES_ERROR';

    public static GET_MY_PROFILE_SUCCESS: string = 'GET_MY_PROFILE_SUCCESS';
    public static GET_MY_PROFILE_ERROR: string = 'GET_MY_PROFILE_ERROR';

    public static GET_USER_PROFILE_SUCCESS: string = 'GET_USER_PROFILE_SUCCESS';
    public static GET_USER_PROFILE_ERROR: string = 'GET_USER_PROFILE_ERROR';

    public static UPDATE_PROFILE_SUCCESS: string = 'UPDATE_PROFILE_SUCCESS';
    public static UPDATE_PROFILE_ERROR: string = 'UPDATE_PROFILE_ERROR';

    public static GET_USER_GAMES_MESSAGES_SUCCESS: string = 'GET_USER_GAMES_MESSAGES_SUCCESS';
    public static GET_USER_GAMES_MESSAGES_ERROR: string = 'GET_USER_GAMES_MESSAGES_ERROR';

    public static GET_USER_CHAT_SUCCESS: string = 'GET_USER_CHAT_SUCCESS';
    public static GET_USER_CHAT_ERROR: string = 'GET_USER_CHAT_ERROR';

    pushToast(message: string) {
        this.ngRedux.dispatch({ type: GlobalActions.PUSH_TOAST_MESSAGE, payload: message });
    }

    getAllGames() {
        this.webApi.getAllGames().subscribe(
            success => {
                console.log(success);
                this.pushToast("Games fetched");
                this.ngRedux.dispatch({type: HomeActions.GET_ALL_GAMES_SUCCESS, payload: success.games});
            }, error => {
                this.ngRedux.dispatch({type: HomeActions.GET_ALL_GAMES_ERROR,
                    payload: this.errorMessage.getMessageFromErrorData(error)});
                console.log(error);
            }
        );
    }

    getUserGames() {
        this.webApi.getUserGames().subscribe(
            success => {
                this.pushToast("User games fetched");
                this.ngRedux.dispatch({type: HomeActions.GET_USER_GAMES_SUCCESS, payload: success.games});
            }, error => {
                this.ngRedux.dispatch({type: HomeActions.GET_USER_GAMES_ERROR,
                    payload: this.errorMessage.getMessageFromErrorData(error)});
                console.log(error);
            }
        );
    }

    getGameFromSteam(steamId: string, done?: Function) {
        this.webApi.getGameFromSteam(steamId).subscribe(
            success => {
                console.log(success);
                this.ngRedux.dispatch({type: HomeActions.GET_GAME_FROM_STEAM_SUCCESS, payload: success.game});
            }, error => {
                this.ngRedux.dispatch({type: HomeActions.GET_GAME_FROM_STEAM_ERROR,
                    payload: this.errorMessage.getMessageFromErrorData(error)});
                console.log(error);
            }, () => {
                if (done) done();
            }
        );
    }

    saveGame(game: Object, done?: Function) {
        this.webApi.saveGame(game).subscribe(
            success => {
                console.log(success);
                this.pushToast(game['name'] + " saved");
                this.ngRedux.dispatch({type: HomeActions.SAVE_GAME_SUCCESS, payload: game});
            }, error => {
                this.ngRedux.dispatch({type: HomeActions.SAVE_GAME_ERROR,
                    payload: this.errorMessage.getMessageFromErrorData(error)});
                console.log(error);
            }, () => {
                if (done) done();
            }
        );
    }

    deleteGame(_id: string, done?: Function) {
        this.webApi.deleteGame(_id).subscribe(
            success => {
                console.log(success);
                this.pushToast('Deleted');
                this.ngRedux.dispatch({type: HomeActions.DELETE_GAME_SUCCESS, payload: _id});
            }, error => {
                this.ngRedux.dispatch({type: HomeActions.DELETE_GAME_ERROR,
                    payload: this.errorMessage.getMessageFromErrorData(error)});
                console.log(error);
            }, () => {
                if (done) done();
            }
        );
    }

    bindGameToUser(gameId: string, done?: Function) {
        this.webApi.bindGameToUser(gameId).subscribe(
            success => {
                console.log(success);
                this.pushToast('Game bound');
                this.ngRedux.dispatch({type: HomeActions.BIND_GAME_TO_USER_SUCCESS, payload: gameId});
            }, error => {
                this.ngRedux.dispatch({type: HomeActions.BIND_GAME_TO_USER_ERROR,
                    payload: this.errorMessage.getMessageFromErrorData(error)});
                console.log(error);
            }, () => {
                if (done) done();
            }
        );
    }

    createProposal(gameId: string, done?: Function) {

        alertify.prompt("This is a prompt dialog.", "",
            (evt, value) => {
                this.webApi.createProposal(gameId, value).subscribe(
                    success => {
                        this.pushToast('Game proposal created');
                        this.ngRedux.dispatch({type: HomeActions.CREATE_GAME_PROPOSAL_SUCCESS, payload: gameId});
                    }, error => {
                        this.ngRedux.dispatch({type: HomeActions.CREATE_GAME_PROPOSAL_ERROR,
                            payload: this.errorMessage.getMessageFromErrorData(error)});
                        console.log(error);
                    }, () => {
                        if (done) done();
                    }
                );

            },
            function(){
                alertify.error('Cancel');
            });
    }

    getProposetUsers(gameId: string, done?: Function) {
        this.webApi.getProposalUsers(gameId).subscribe(
            success => {
                this.pushToast('Proposet users fetched');
                this.ngRedux.dispatch({type: HomeActions.GET_PROPOSAL_USERS_SUCCESS, payload: success});
                this.router.navigate(['home/gameProposedUsers', gameId]);
            }, error => {
                this.ngRedux.dispatch({type: HomeActions.GET_PROPOSAL_USERS_ERROR,
                    payload: this.errorMessage.getMessageFromErrorData(error)});
                console.log(error);
            }, () => {
                if (done) done();
            }
        );
    }

    getAllUsers(done?: Function) {
        this.webApi.getAllUsers().subscribe(
            success => {
                this.pushToast('Users fetched');
                this.ngRedux.dispatch({type: HomeActions.GET_ALL_USERS_SUCCESS, payload: success.users});
            }, error => {
                this.ngRedux.dispatch({type: HomeActions.GET_ALL_USERS_ERROR,
                    payload: this.errorMessage.getMessageFromErrorData(error)});
                console.log(error);
            }, () => {
                if (done) done();
            }
        );
    }

    updateProfile(data: any, done?: Function) {
        this.webApi.updateUser(data).subscribe(
            success => {
                this.pushToast('Profile updated');
                this.ngRedux.dispatch({type: HomeActions.UPDATE_PROFILE_SUCCESS, payload: data});
            }, error => {
                this.ngRedux.dispatch({type: HomeActions.UPDATE_PROFILE_ERROR,
                    payload: this.errorMessage.getMessageFromErrorData(error)});
                console.log(error);
            }, () => {
                if (done) done();
            }
        );
    }

    getMyProfile(done?: Function) {
        this.webApi.getMyProfile().subscribe(
            success => {
                this.ngRedux.dispatch({type: HomeActions.GET_MY_PROFILE_SUCCESS, payload: success.profile});
            }, error => {
                this.ngRedux.dispatch({type: HomeActions.GET_MY_PROFILE_ERROR,
                    payload: this.errorMessage.getMessageFromErrorData(error)});
                console.log(error);
            }, () => {
                if (done) done();
            }
        );
    }

    getUserProfile(userId: string, done?: Function) {
        this.webApi.getProfile(userId).subscribe(
            success => {
                this.ngRedux.dispatch({type: HomeActions.GET_USER_PROFILE_SUCCESS, payload: success.profile});
                this.router.navigate(['home/userProfile', userId]);
            }, error => {
                this.ngRedux.dispatch({type: HomeActions.GET_USER_PROFILE_ERROR,
                    payload: this.errorMessage.getMessageFromErrorData(error)});
                console.log(error);
            }, () => {
                if (done) done();
            }
        );
    }

    getUserProfile_noRedirect(userId: string, done?: Function) {
        this.webApi.getProfile(userId).subscribe(
            success => {
                this.ngRedux.dispatch({type: HomeActions.GET_USER_PROFILE_SUCCESS, payload: success.profile});
            }, error => {
                this.ngRedux.dispatch({type: HomeActions.GET_USER_PROFILE_ERROR,
                    payload: this.errorMessage.getMessageFromErrorData(error)});
                console.log(error);
            }, () => {
                if (done) done();
            }
        );
    }

    getUserChat(userId: string, done?: Function) {
        this.webApi.getUserChat(userId).subscribe(
            success => {
                this.ngRedux.dispatch({type: HomeActions.GET_USER_CHAT_SUCCESS, payload: success.messages});
            }, error => {
                this.ngRedux.dispatch({type: HomeActions.GET_USER_CHAT_ERROR,
                    payload: this.errorMessage.getMessageFromErrorData(error)});
                console.log(error);
            }, () => {
                if (done) done();
            }
        );
    }

    getUserMessages(done?: Function) {
        this.webApi.getMessages().subscribe(
            success => {
                this.ngRedux.dispatch({type: HomeActions.GET_USER_MESSAGES_SUCCESS, payload: success});
            }, error => {
                this.ngRedux.dispatch({type: HomeActions.GET_USER_MESSAGES_ERROR,
                    payload: this.errorMessage.getMessageFromErrorData(error)});
                console.log(error);
            }, () => {
                if (done) done();
            }
        );
    }

    getGameMessages(gameId: string, done?: Function) {
        this.webApi.getMessagesForGame(gameId).subscribe(
            success => {
                this.ngRedux.dispatch({type: HomeActions.GET_USER_GAMES_MESSAGES_SUCCESS, payload: success.messages});
            }, error => {
                this.ngRedux.dispatch({type: HomeActions.GET_USER_GAMES_MESSAGES_ERROR,
                    payload: this.errorMessage.getMessageFromErrorData(error)});
                console.log(error);
            }, () => {
                if (done) done();
            }
        );
    }

    proposeGameRequest(to: string, gameName: string, done?: Function) {
        this.webApi.pushMessage(PROPOSE_MESSAGE, to, "Propose to play " + gameName).subscribe(
            success => {
                this.pushToast("Proposed");
                //this.ngRedux.dispatch({type: HomeActions.GET_USER_MESSAGES_SUCCESS, payload: success.messages});
            }, error => {
                // this.ngRedux.dispatch({type: HomeActions.GET_USER_MESSAGES_ERROR,
                //     payload: this.errorMessage.getMessageFromErrorData(error)});
                console.log(error);
            }, () => {
                if (done) done();
            }
        );
    }

    pushMessage(data: Object, done?: Function) {
        this.webApi.pushMessage_v2(data).subscribe(
            success => {
                this.pushToast("Proposed");
                //this.ngRedux.dispatch({type: HomeActions.GET_USER_MESSAGES_SUCCESS, payload: success.messages});
            }, error => {
                // this.ngRedux.dispatch({type: HomeActions.GET_USER_MESSAGES_ERROR,
                //     payload: this.errorMessage.getMessageFromErrorData(error)});
                console.log(error);
            }, () => {
                if (done) done();
            }
        );
    }

    registerSocket(socket_id: string, done?: Function) {
        this.webApi.registerSocket(socket_id).subscribe(
            success => {
                this.pushToast("socket register");
                //this.ngRedux.dispatch({type: HomeActions.GET_USER_MESSAGES_SUCCESS, payload: success.messages});
            }, error => {
                // this.ngRedux.dispatch({type: HomeActions.GET_USER_MESSAGES_ERROR,
                //     payload: this.errorMessage.getMessageFromErrorData(error)});
                console.log(error);
            }, () => {
                if (done) done();
            }
        );
    }
}
