import {Component} from "@angular/core";
import {FormBuilder} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {IAppState} from "../../../../store/index";
import {NgRedux} from "ng2-redux";
import {HomeActions} from "../../../../actions/home.actions";

@Component({
    selector: 'usersView',
    templateUrl: 'users.template.html',
    // animations: [routerTransition(1), opacityTransition()],
    // host: {'[@routerTransition]': ''}
})
export class UsersView {
    isLoading: boolean = false;

    users = [];

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
        this.users = state.home.users;
    }

    ngOnInit() {
        this.actions.getAllUsers();
    }

    ngOnDestroy() {
    }
}