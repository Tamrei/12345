import {HomeActions} from "../actions/home.actions";
import * as _ from "lodash";

export interface HomeState {
    games: Array<Object>;
    userGames: Array<Object>;
    proposalUsers: Array<Object>;
    messages: Array<Object>;
    gameMessages: Array<Object>;
    users: Array<Object>;
    proposals: Array<Object>;
    chatMessages: Array<Object>;
    contacts: Array<Object>;
    myProfile: Object;
    userProfile: Object;
    loadedGame: Object;
    loading: boolean;
    error: boolean;
    errorMessage: any,
}

const initialState: HomeState = {
    games: [],
    userGames: [],
    proposalUsers: [],
    messages: [],
    gameMessages: [],
    users: [],
    proposals: [],
    chatMessages: [],
    contacts: [],
    myProfile: null,
    userProfile: null,
    loadedGame: null,
    loading: false,
    error: false,
    errorMessage: '',
};

export function homeReducer(state: HomeState = initialState, action: any): HomeState {

    console.log(action);

    let games = state.games;

    switch (action.type) {
        case HomeActions.LOADING:
            return Object.assign({}, state, {
                loading: true,
            });
        case HomeActions.GET_ALL_GAMES_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: false,
                games: action.payload
            });
        case HomeActions.GET_ALL_GAMES_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: true,
                errorMessage: action.payload
            });
        case HomeActions.GET_USER_GAMES_SUCCESS:
            console.log(action);
            return Object.assign({}, state, {
                loading: false,
                error: false,
                userGames: action.payload
            });
        case HomeActions.GET_USER_GAMES_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: true,
                errorMessage: action.payload
            });
        case HomeActions.GET_GAME_FROM_STEAM_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: false,
                loadedGame: action.payload
            });
        case HomeActions.GET_GAME_FROM_STEAM_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: true,
                errorMessage: action.payload,
                loadedGame: null
            });
        case HomeActions.SAVE_GAME_SUCCESS:
            games.push(action.payload);

            return Object.assign({}, state, {
                loading: false,
                error: false,
                games: games
            });
        case HomeActions.SAVE_GAME_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: true,
                errorMessage: action.payload,
            });
        case HomeActions.DELETE_GAME_SUCCESS:
            let index = _.findIndex(games, {_id: action.payload});
            games.splice(index, 1);

            return Object.assign({}, state, {
                loading: false,
                error: false,
                games: games
            });
        case HomeActions.DELETE_GAME_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: true,
                errorMessage: action.payload,
            });
        case HomeActions.GET_PROPOSAL_USERS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: false,
                proposalUsers: action.payload.users,
                proposals: action.payload.proposals
            });
        case HomeActions.GET_PROPOSAL_USERS_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: true,
                errorMessage: action.payload,
            });
        case HomeActions.GET_ALL_USERS_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: false,
                users: action.payload
            });
        case HomeActions.GET_ALL_USERS_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: true,
                errorMessage: action.payload,
            });
        case HomeActions.GET_USER_MESSAGES_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: false,
                messages: action.payload.messages,
                contacts: action.payload.users
            });
        case HomeActions.GET_USER_MESSAGES_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: true,
                errorMessage: action.payload,
            });
        case HomeActions.GET_MY_PROFILE_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: false,
                myProfile: action.payload
            });
        case HomeActions.GET_MY_PROFILE_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: true,
                errorMessage: action.payload,
            });
        case HomeActions.GET_USER_PROFILE_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: false,
                userProfile: action.payload
            });
        case HomeActions.GET_USER_PROFILE_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: true,
                errorMessage: action.payload,
            });
        case HomeActions.GET_USER_GAMES_MESSAGES_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: false,
                gameMessages: action.payload
            });
        case HomeActions.GET_USER_GAMES_MESSAGES_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: true,
                errorMessage: action.payload,
            });
        case HomeActions.GET_USER_CHAT_SUCCESS:
            return Object.assign({}, state, {
                loading: false,
                error: false,
                chatMessages: action.payload
            });
        case HomeActions.GET_USER_CHAT_ERROR:
            return Object.assign({}, state, {
                loading: false,
                error: true,
                errorMessage: action.payload,
            });
        default:
            return state;
    }
}