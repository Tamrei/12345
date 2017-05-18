import {NgModule} from "@angular/core";
import {RouterModule, Router} from "@angular/router";
import {AppComponent} from "./app";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule, RequestOptions, XHRBackend, Http} from "@angular/http";
import {ROUTES} from "./app.routes";
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {WebApiService} from "../service/webapi.service";
import {HttpInterceptor} from "../service/httpInterceptor.service";
import {AlertPanelComponent} from "../componnents/alert-panel/alert-panel.component";

import {SingUpViewComponent} from "../modules/authorization/views/sing-up/sing-up.component";
// import {AppState, default as reducer, default as rootReducer} from '../reducers';

import {NgReduxModule, NgRedux} from "ng2-redux";
import {CookieService} from "../service/cookie.service";
import {AuthorizationActions} from "../actions/authorization.actions";

import {AuthorizationContainer} from "../modules/authorization/authorization.container";

import {PhoneInputDirective} from "../directives/phoneInput.directive";
import {TranslatePipe} from "../utils/translate/translate.pipe";
import {TranslateService} from "../utils/translate/translate.service";
import {TRANSLATION_PROVIDERS} from "../utils/translate/translations";

import {HomeContainer} from "../modules/home/home.container";

import {ErrorMessageService} from "../service/errorMessage.service";
import {LoadingSpinnerComponent} from "../componnents/loading-spinner.component";
import {HomeActions} from "../actions/home.actions";

import {IframeComponent} from "../componnents/Iframe.component";

import {IAppState} from "../store/index";
import {GlobalActions} from "../actions/global.actions";

import {PaymentRequestsService} from "../service/paymentRequest.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

import {AlertModalComponent} from "../componnents/modals/alert-modal.component";
import {LoginView} from "../modules/authorization/views/login/login.component";
import {MainView} from "../modules/home/views/main/main.component";
import {NavigationBarComponent} from "../componnents/navigation-bar.component";
import {GamesView} from "../modules/home/views/games/games.component";
import {GameItemComponent} from "../componnents/game-item.component";
import {LoadGameModalComponent} from "../componnents/modals/loadGame-modal.component";
import {ConfirmModalComponent} from "../componnents/modals/confirm-modal.component";
import {TempToastComponent} from "../componnents/temp-toast.component";
import {MainGameItemComponent} from "../componnents/main-game-item.component";
import {GameProposedUsersView} from "../modules/home/views/game-proposed-users/game-proposed-users.component";
import {ProposedUserComponent} from "../componnents/proposet-user.component";
import {FeedComponent} from "../componnents/feed.component";
import {UsersView} from "../modules/home/views/users/users.component";
import {UserComponent} from "../componnents/user.component";
import {MyProfileView} from "../modules/home/views/my-profile/my-profile.component";
import {ProfileComponent} from "../componnents/profile.component";
import {UserProfileView} from "../modules/home/views/user-profile/user-profile.component";
import {MessagesPanelComponent} from "../componnents/containers/messages-panel.component";

@NgModule({
    declarations: [
        AppComponent,

        AuthorizationContainer,

        AlertPanelComponent,
        SingUpViewComponent,

        HomeContainer,

        LoadingSpinnerComponent,

        PhoneInputDirective,

        IframeComponent,

        TranslatePipe,
        LoginView,
        MainView,
        GamesView,

        NavigationBarComponent,
        GameItemComponent,
        LoadGameModalComponent,
        ConfirmModalComponent,
        TempToastComponent,
        MainGameItemComponent,
        GameProposedUsersView,
        ProposedUserComponent,
        FeedComponent,
        UsersView,
        UserComponent,
        MyProfileView,
        ProfileComponent,
        UserProfileView,
        MessagesPanelComponent,

        AlertModalComponent
    ],
    imports: [
        // Angular modules
        BrowserModule,
        HttpModule,
        FormsModule,
        RouterModule,
        ReactiveFormsModule,

        NgReduxModule.forRoot(),
        RouterModule.forRoot(ROUTES),
        //NgbModule.forRoot()
    ],
    providers: [
        TRANSLATION_PROVIDERS,
        TranslateService,
        CookieService,
        ErrorMessageService,
        AuthorizationActions,
        GlobalActions,
        HomeActions,
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        WebApiService,
        {
            provide: Http,
            useFactory: (xhrBackend: XHRBackend, requestOptions: RequestOptions, router: Router, ngRedux: NgRedux<IAppState>) =>
                new HttpInterceptor(xhrBackend, requestOptions, router, ngRedux),
            deps: [XHRBackend, RequestOptions, Router]
        },
        PaymentRequestsService
        //{ provide: AppStore, useFactory: () => store }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {

}