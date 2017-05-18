import {Component, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

//import '../../assets/styles/layout.scss';
import {IAppState} from "../../store/index";
import {NgRedux} from "ng2-redux";
import {AuthorizationActions} from "../../actions/authorization.actions";
import {CookieService} from "../../service/cookie.service";
import {WebApiService} from "../../service/webapi.service";
import {HomeActions} from "../../actions/home.actions";
import {routerTransition, slideTransition} from "../../utils/router.animations";
import {GlobalActions} from "../../actions/global.actions";
import {TempToastComponent} from "../../componnents/temp-toast.component";

import * as socket from "socket.io-client";
import {WEB_API_URL} from "../../config/constans";
import {MessagesPanelComponent} from "../../componnents/containers/messages-panel.component";

declare var Notification: any;

declare var alertify:any;

@Component({
    selector   : 'home',
    templateUrl: 'home.template.html',
    //styleUrls: ['home.scss'],
    styles: [`
        body, html {
            background-color: #1e1e1e !important;
        }
        
        #home {
          -webkit-transition-duration: 0.6s;
          -moz-transition-duration: 0.6s;
          -o-transition-duration: 0.6s;
          transition-duration: 0.6s;
        }
    `]
    //animations: [slideTransition()],
    //host: {'[@routerTransition]': ''}
})
export class HomeContainer {

    @ViewChild(TempToastComponent)
    private toast: TempToastComponent;

    @ViewChild(MessagesPanelComponent)
    private messagesPanel: MessagesPanelComponent;

    constructor(private router: Router,
                private webApi: WebApiService,
                private cookie: CookieService,
                private actions: HomeActions,
                private route: ActivatedRoute,
                private globalActions: GlobalActions,
                private store: NgRedux<IAppState>) {
        store.subscribe(() => this.updateState());
        this.updateState();
    }

    messagesContainer() {
        this.messagesPanel.open();
    }

    updateState() {
        let state = this.store.getState();

        if (state.global.toastMessage) {
            //this.toast.push(state.global.toastMessage, () => {
                alertify.message(state.global.toastMessage);
                this.globalActions.releaseToastMessage();
            //});
        }
    }

    getNotification(event) {
        console.log(event);
    }

    ngOnInit() {
        let sct = socket(WEB_API_URL);

        Notification.requestPermission(function(permission){
            console.log('Notification permission: ', permission);
        });

        sct.on('connect', ()=> {
            console.log("socket connected");
            console.log(sct.id);
            this.actions.registerSocket(sct.id);
        });

        sct.on('userJoined', (res)=> {
            alert(res);
            console.log(res);
            let notification = new Notification(res.title,
                { body: res.content, dir: 'auto', icon: 'https://semantic-ui.com/images/avatar/small/elliot.jpg' }
            );
        });

        sct.on('message', (res)=> {
            alertify.message(JSON.stringify(res));
        });


        //document.getElementsByTagName("html")[0].style.background = "#303440";
    }
}