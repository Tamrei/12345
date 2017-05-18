import {Routes} from "@angular/router";

import {SingUpViewComponent} from "../modules/authorization/views/sing-up/sing-up.component";
import {AuthorizationContainer} from "../modules/authorization/authorization.container";
import {authorizationRoutes} from "../modules/authorization/authorization.routes";
import {HomeContainer} from "../modules/home/home.container";
import {homeRoutes} from "../modules/home/home.routes";

export const ROUTES:Routes = [
    {path: '', redirectTo: 'sing-up', pathMatch: 'full'},

    // {path: 'login', component: loginViewComponent, data : {test : "test"}},
    // {path: 'sing-up', component: SingUpViewComponent},
    // {path: 'confirm-mail', component: ConfirmMailViewComponent},

    //App views
    {path: '', component: AuthorizationContainer, children: [
        ...authorizationRoutes
    ]},

    {path: 'home', component: HomeContainer, children: [
        ...homeRoutes
    ]},

    //{path: '**',    component: loginViewComponent}

];
