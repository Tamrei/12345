import {Component, ViewChild} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {IAppState} from "../../../../store/index";
import {NgRedux} from "ng2-redux";
import {HomeActions} from "../../../../actions/home.actions";

import * as _ from "lodash";
import {MessagesPanelComponent} from "../../../../componnents/containers/messages-panel.component";

declare var jQuery:any;

@Component({
    selector: 'myProfileView',
    templateUrl: 'my-profile.template.html',
    // animations: [routerTransition(1), opacityTransition()],
    // host: {'[@routerTransition]': ''}
})
export class MyProfileView {
    isLoading: boolean = false;

    profile;

    firstState = true;
    messages = [];

    games = [];

    feedLoading = false;

    constructor(private actions: HomeActions,
                private route: ActivatedRoute,
                private fb: FormBuilder,
                private store: NgRedux<IAppState>) {
        store.subscribe(() => this.updateState());
        this.updateState();
    }

    updateState() {
        let state = this.store.getState();
        this.profile = state.home.myProfile;
        this.messages = state.home.gameMessages;

        if (this.profile) this.games = this.t(state.home.myProfile['games'],state.home.myProfile['proposals']);
    }

    private t(games: Array<Object>, proposals: Array<Object>) {
        let result = games;

        for(let i = 0; i < games.length; i++) {
            games[i]['proposals'] = [];
            for (let j = 0; j < proposals.length; j++) {
                if (proposals[j]['gameId'] == games[i]['_id']) {
                    result[i]['proposals'].push(proposals[j]);
                }
            }
        }

        return result;
    }

    ngOnInit() {
        this.actions.getMyProfile(() => {
            setTimeout(() => { //TODO: tempo
                jQuery('.ui.accordion').accordion();
            }, 0);
        });

        //this.actions.getUserMessages();
    }

    loadGameFeed(gameId) {
        this.feedLoading = true;



        //let game = _.find(this.games, {_id : gameId});

        //this.messages = game.proposals;

        this.actions.getGameMessages(gameId, ()=> {
            setTimeout(()=> {
                this.feedLoading = false;
            }, 200);
        })
    }

    getProposetUsers(userId) {
        this.actions.getProposetUsers(userId);
    }

    createPropose(gameId) {
        this.actions.createProposal(gameId);
    }

    viewProfile(userId) {
        this.actions.getUserProfile(userId);
    }

    ngOnDestroy() {
    }
}