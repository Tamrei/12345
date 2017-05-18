import {Routes} from "@angular/router";

import {SingUpViewComponent} from "./views/sing-up/sing-up.component";
import {LoginView} from "./views/login/login.component";

export const authorizationRoutes: Routes = [
    // Main redirect
    {path: '', redirectTo: 'sing-up', pathMatch: 'full'},

    {path: 'sing-up', component: SingUpViewComponent, data : {routeIndex : 1}},
    {path: 'login', component: LoginView, data : {routeIndex : 0}},
];

