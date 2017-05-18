import {
    Component, EventEmitter, Output, Host, ViewChild, trigger, state, style, transition,
    animate
} from "@angular/core";

import {Md5} from "ts-md5/dist/md5";
import {FormGroup, FormBuilder} from "@angular/forms";

import {ActivatedRoute} from "@angular/router";
import {Subject} from "rxjs";
import {AuthorizationActions} from "../../../../actions/authorization.actions";
import {opacityTransition, routerTransition} from "../../../../utils/router.animations";
import {IAppState} from "../../../../store/index";
import {NgRedux} from "ng2-redux";
import {HomeActions} from "../../../../actions/home.actions";
import {LoadGameModalComponent} from "../../../../componnents/modals/loadGame-modal.component";

import '../../../../../node_modules/alertifyjs/build/alertify.min.js';
import '../../../../../node_modules/alertifyjs/build/css/themes/semantic.min.css';

declare var alertify:any;

@Component({
    selector: 'gamesView',
    animations: [
        trigger('growShrinkStaticStart', [
            //state('in', style({ height: '*', 'padding-top': '*', 'padding-bottom': '*', 'margin-top': '*', 'margin-bottom': '*' })),
            transition('* => void', [
                style({opacity: 1}),
                animate('500ms', style({opacity: 0}))
            ]),
            transition('void => false', [
                /*no transition on first load*/
            ]),
            transition('void => *', [
                style({opacity: 0}),
                animate('500ms', style({opacity: 1}))
            ])
        ])
    ],
    templateUrl: 'games.template.html',
    // animations: [routerTransition(1), opacityTransition()],
    // host: {'[@routerTransition]': ''}
})
export class GamesView {
    isLoading: boolean = false;

    games = [];

    toggle = true;

    private animationInitialized: boolean = true;

    @ViewChild(LoadGameModalComponent)
    private loadGameModal: LoadGameModalComponent;

    constructor(private actions: HomeActions,
                private route: ActivatedRoute,
                private fb: FormBuilder,
                private store: NgRedux<IAppState>) {
        store.subscribe(() => this.updateState());
        this.updateState();
    }

    deleteEvent(event) {
        alert(event);
    }

    updateState() {
        let state = this.store.getState();
        this.games = state.home.games;
    }

    ngOnInit() {
        this.actions.getAllGames();
    }

    toggleGames() {
        this.toggle = !this.toggle;

        alertify
            .alert("This is an alert dialog.", function(){
                alertify.message('OK');
            });
    }

    addGame() {
        this.loadGameModal.open();
    }

    ngOnDestroy() {
    }
}