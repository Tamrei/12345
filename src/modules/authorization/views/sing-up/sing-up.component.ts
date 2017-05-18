import {Component, EventEmitter, Output, Host} from "@angular/core";

import {Md5} from "ts-md5/dist/md5";
import {FormGroup, FormBuilder} from "@angular/forms";

import {ActivatedRoute} from "@angular/router";
import {Subject} from "rxjs";
import {AuthorizationActions} from "../../../../actions/authorization.actions";
import {opacityTransition, routerTransition} from "../../../../utils/router.animations";

@Component({
    selector: 'singUpView',
    templateUrl: 'sing-up.template.html',
    animations: [routerTransition(1), opacityTransition()],
    host: {'[@routerTransition]': ''}
})
export class SingUpViewComponent {

    singUpForm: FormGroup;

    isLoading: boolean = false;

    @Output()
    open: EventEmitter<any> = new EventEmitter<any>();

    constructor(private actions: AuthorizationActions,
                private route: ActivatedRoute,
                private fb: FormBuilder,) {
        this.singUpForm = fb.group({
            'login': "",
            'password': "",
        });
    }

    ngOnDestroy() {
    }

    submit() {
        this.isLoading = true;

        let reqData = {
            login: this.singUpForm.value.login,
            password: this.singUpForm.value.password
        };

        console.log(reqData);
        //
        this.actions.singUp(reqData);
    }
}