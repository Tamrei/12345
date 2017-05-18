import {Component, EventEmitter, Output, Host} from "@angular/core";

import {Md5} from "ts-md5/dist/md5";
import {FormGroup, FormBuilder} from "@angular/forms";

import {ActivatedRoute} from "@angular/router";
import {Subject} from "rxjs";
import {AuthorizationActions} from "../../../../actions/authorization.actions";
import {opacityTransition, routerTransition} from "../../../../utils/router.animations";

@Component({
    selector: 'loginView',
    templateUrl: 'login.template.html',
    animations: [routerTransition(1), opacityTransition()],
    host: {'[@routerTransition]': ''}
})
export class LoginView {

    loginForm: FormGroup;

    isLoading: boolean = false;

    constructor(private actions: AuthorizationActions,
                private route: ActivatedRoute,
                private fb: FormBuilder) {
        this.loginForm = fb.group({
            'login': "",
            'password': "",
        });
    }

    ngOnDestroy() {

    }

    submit() {
        //this.isLoading = true;

        let reqData = {
            login: this.loginForm.value.login,
            password: this.loginForm.value.password
        };

        this.actions.login(reqData);
    }
}