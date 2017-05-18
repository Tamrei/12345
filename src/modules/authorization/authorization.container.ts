import {Component, ViewChild, Input} from '@angular/core';
import {Router} from "@angular/router";

//import '../../assets/styles/layout.scss';
import {IAppState} from "../../store/index";
import {NgRedux} from "ng2-redux";
import {AuthorizationActions} from "../../actions/authorization.actions";
import {CookieService} from "../../service/cookie.service";
import {WebApiService} from "../../service/webapi.service";
import {AlertModalComponent} from "../../componnents/modals/alert-modal.component";
import {Subject} from "rxjs";

@Component({
    selector   : 'dashboard', //TODO: rename to authorization
    templateUrl: 'authorization.template.html',
    styles: [
            `html, body {
                background-color: white !important;
                overflow-y: visible;
            }`]
})
export class AuthorizationContainer {

    @ViewChild(AlertModalComponent)
    private alertModal: AlertModalComponent;

    @Input()
    parentSubject:Subject<any>;

    constructor(private router: Router,
                private webApi: WebApiService,
                private cookie: CookieService,
                private actions: AuthorizationActions,
                private store: NgRedux<IAppState>) {
        store.subscribe(() => this.updateState());
        this.updateState();
    }

    updateState() {
        let state = this.store.getState();

        if (state.authorization.error) {
            //this.alertModal.openModal(state.authorization.errorMessage);
            this.alertModal.open("Error", state.authorization.errorMessage);
            this.actions.releaseError();
        }
    }

    ngOnInit() {
        //this.alertModal.open();
    }
}