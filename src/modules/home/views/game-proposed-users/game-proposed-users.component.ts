import {Component} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {IAppState} from "../../../../store/index";
import {NgRedux} from "ng2-redux";
import {HomeActions} from "../../../../actions/home.actions";

@Component({
    selector: 'gameProposedUsersView',
    templateUrl: 'game-proposed-users.template.html',
    // animations: [routerTransition(1), opacityTransition()],
    // host: {'[@routerTransition]': ''}
})
export class GameProposedUsersView {
    isLoading: boolean = false;

    users = [];
    proposals = [];
    res = [];

    gameId;

    constructor(private actions: HomeActions,
                private route: ActivatedRoute,
                private fb: FormBuilder,
                private store: NgRedux<IAppState>) {
        store.subscribe(() => this.updateState());
        this.updateState();
    }

    updateState() {
        let state = this.store.getState();
        this.users = state.home.proposalUsers;
        this.proposals = state.home.proposals;

        this.res = this.t(state.home.proposals, state.home.proposalUsers);
        console.log(this.res);
    }

    private t(proposals: Array<Object>, users: Array<Object>) {
        let result = proposals;

        for(let i = 0; i < proposals.length; i++) {
            for (let j = 0; j < users.length; j++) {
                if (proposals[i]['requesterId'] == users[j]['_id']) {
                    result[i]['user'] = users[j];
                }
            }
        }
        return result;
    }

    ngOnInit() {
        this.gameId = this.route.snapshot.params['gameId'];
        this.actions.getProposetUsers(this.gameId)
    }

    ngOnDestroy() {
    }
}