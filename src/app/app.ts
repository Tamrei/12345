import {Component, Inject, ViewChild, animate, transition, style, state, trigger} from '@angular/core';

import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";

import { NgRedux, DevToolsExtension } from 'ng2-redux';

// Core vendor styles
//import '../../node_modules/bootstrap/dist/css/bootstrap.css';
import '../../node_modules/semantic-ui-css/semantic.css';
import '../utils/utils';

import '../assets/styles/general.scss';
import '../assets/styles/grid.css';
import '../assets/styles/animate.css';

import '../../node_modules/semantic-ui/dist/semantic.js';

//import '../../node_modules/semantic-ui'

import {rootReducer} from "../store";
import {IAppState} from "../store";
import {TranslateService} from "../utils/translate/translate.service";
import {LoadingSpinnerComponent} from "../componnents/loading-spinner.component";
import {IframeComponent} from "../componnents/Iframe.component";
import {opacityTransition, scaleIframe} from "../utils/router.animations";
import {putInBraces} from "../utils/other";
import {WebApiService} from "../service/webapi.service";
import {HomeActions} from "../actions/home.actions";


//declare var jQuery:any;

@Component({
    selector   : 'app',
    templateUrl: 'app.template.html',
    animations: [opacityTransition(), scaleIframe(),
        trigger('focusPanel', [
            state('inactive', style({
                //transform: 'scale(0)',
                opacity: '0',
                'position': 'fixed',
                'width': '100%',
                //backgroundColor: '#303440'
            })),
            state('active', style({
                //transform: 'scale(1)',
                opacity: '1',
                'position': 'fixed',
                'width': '100%',
                //backgroundColor: '#303440'
            })),
            transition('inactive => active', animate('500ms ease-in-out')),
            //transition('active => inactive', animate('500ms ease-in-out'))
        ])
    ]
})
export class AppComponent {

    @ViewChild(LoadingSpinnerComponent)
    private spinner: LoadingSpinnerComponent;

    @ViewChild(IframeComponent)
    private iframe: IframeComponent;

    isIframeActiveTemp : boolean;

    state: string = 'inactive';

    constructor(private router: Router,
                //private _location: Location,
                private route: ActivatedRoute,
                private ngRedux: NgRedux<IAppState>,
                private devTool: DevToolsExtension,
                private homeActions: HomeActions,
                private webApi: WebApiService,
                private _translate: TranslateService,
                private store: NgRedux<IAppState>) {
        this.ngRedux.configureStore(
            rootReducer,
            {}
            //,
            //[ createLogger(), thunk ],
            //[ ...enhancers, devTool.isEnabled() ? devTool.enhancer() : f => f]
        );

        this.router.events.filter(e => e instanceof NavigationEnd)
            .pairwise().subscribe((e) => {
            console.log(e);
        });

        this.router.events.subscribe(event => {
            //console.log(this.route.snapshot.data);
            // console.log(event);
            // if (this.isIframeActiveTemp) {
            //     this.closeIframe();
            // }

            // let state = this.store.getState();
            //
            // if (state.home.activePayment) {
            // this.closeIframe();
            // }
        });
    }

    updateState() {
        let state = this.store.getState();
        state.global.loading ? this.spinner.start() : this.spinner.stop();
    }

    selectLang(lang: string) {
        // set default;
        this._translate.use(lang);
    }

    ngAfterViewInit() {
    }

    ngOnInit() {
        this.isIframeActiveTemp = false;
        this.store.subscribe(() => this.updateState());
        //this.updateState();

        this.selectLang('en');
    }
}
