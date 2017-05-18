import {Routes} from "@angular/router";
import {MainView} from "./views/main/main.component";
import {GamesView} from "./views/games/games.component";
import {GameProposedUsersView} from "./views/game-proposed-users/game-proposed-users.component";
import {UsersView} from "./views/users/users.component";
import {MyProfileView} from "./views/my-profile/my-profile.component";
import {UserProfileView} from "./views/user-profile/user-profile.component";


export const homeRoutes: Routes = [
    // Main redirect
    {path: '', redirectTo: 'main', pathMatch: 'full'},

    {path: 'main', component: MainView},
    {path: 'games', component: GamesView},
    {path: 'users', component: UsersView},
    {path: 'myProfile', component: MyProfileView},
    {path: 'userProfile/:userId', component: UserProfileView},
    {path: 'gameProposedUsers/:gameId', component: GameProposedUsersView}
];
