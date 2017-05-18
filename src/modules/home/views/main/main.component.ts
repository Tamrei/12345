import {Component} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {IAppState} from "../../../../store/index";
import {NgRedux} from "ng2-redux";
import {HomeActions} from "../../../../actions/home.actions";

@Component({
    selector: 'mainView',
    templateUrl: 'main.template.html',
    // animations: [routerTransition(1), opacityTransition()],
    // host: {'[@routerTransition]': ''}
})
export class MainView {
    isLoading: boolean = false;

    games = [];
    messages = [];

    firstState = true;

    constructor(private actions: HomeActions,
                private route: ActivatedRoute,
                private fb: FormBuilder,
                private store: NgRedux<IAppState>) {
        store.subscribe(() => this.updateState());
        this.updateState();
    }

    updateState() {
        let state = this.store.getState();
        this.games = state.home.userGames;
        this.messages = state.home.messages;
    }

    ngOnInit() {
        this.actions.getUserGames();
        this.actions.getUserMessages();
    }

    ngOnDestroy() {
    }

    state1() {
        this.firstState = true;
    }

    state2() {
        this.firstState = false;
    }
}