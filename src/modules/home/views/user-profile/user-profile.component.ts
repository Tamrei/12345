import {Component} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {IAppState} from "../../../../store/index";
import {NgRedux} from "ng2-redux";
import {HomeActions} from "../../../../actions/home.actions";

import * as _ from "lodash";

declare var jQuery:any;

@Component({
    selector: 'userProfileView',
    templateUrl: 'user-profile.template.html',
    // animations: [routerTransition(1), opacityTransition()],
    // host: {'[@routerTransition]': ''}
})
export class UserProfileView {
    isLoading: boolean = false;

    profile;

    firstState = true;
    messages = [];

    games = [];

    userId;

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
        this.profile = state.home.userProfile;
        //this.messages = state.home.gameMessages;

        if (this.profile) this.games = this.t(this.profile.games, this.profile.proposals);
        console.log(this.games);
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
        this.userId = this.route.snapshot.params['userId'];
        this.actions.getUserProfile(this.userId, () => {
            setTimeout(() => { //TODO: tempo
                jQuery('.ui.accordion').accordion();
            }, 0);
        });
    }

    loadGameFeed(gameId) {
        // this.feedLoading = true;
        //
        // this.actions.getGameMessages(gameId, ()=> {
        //     this.feedLoading = false;
        // })
    }

    getProposetUsers(userId) {
        //this.actions.getProposetUsers(userId);
    }

    createPropose(gameId) {
        //this.actions.createProposal(gameId);
    }

    ngOnDestroy() {
    }
}