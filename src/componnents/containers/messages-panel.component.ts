import {Component} from "@angular/core";
import {HomeActions} from "../../actions/home.actions";
import {NgRedux} from "ng2-redux";
import {IAppState} from "../../store/index";
import {FormBuilder, FormGroup} from "@angular/forms";

declare var jQuery: any;

const FEED: string = "FEED";
const CHAT: string = "CHAT";
const CONTACTS: string = "CONTACTS";

@Component({
    selector: 'messages-panel',
    templateUrl: 'messages-panel.template.html',
    styles: [
        `.loader-container {
            margin: auto;
            position: fixed;
            zIndex: 1200;
            left: 0;
            bottom: 0;
            right: 0;
            top: 30%;
            text-align: center;
            }
        .messages-container {
            overflow: hidden;
            padding: 25px;
            background: white;
            position: absolute;
            height: 100%;
            width: 100%;
            max-width: 650px;
            top: 0;
            right: -100%;
            /*right: 0;*/
            /*bottom: 0;*/
             -webkit-transition-duration: 0.6s;
             -moz-transition-duration: 0.6s;
             -o-transition-duration: 0.6s;
             transition-duration: 0.6s;
             
             box-shadow: 0 0 5px rgba(0,0,0,.3);
             
             /*padding-left: 84px;*/
        }
        .messages-container.active {
            right: 0%;
        }`]
})
export class MessagesPanelComponent {

    active = false;

    messages = [];
    userChat = [];
    activeProfile;
    state: string = FEED;

    contacts = [];

    s_feed = FEED;
    s_chat = CHAT;
    s_contacts = CONTACTS;

    chatForm: FormGroup;

    constructor(private actions: HomeActions,
                private store: NgRedux<IAppState>,
                private fb: FormBuilder) {
        store.subscribe(() => this.updateState());
        this.updateState();

        this.chatForm = fb.group({
            'message': "",
        });
    }

    updateState() {
        let state = this.store.getState();
        this.messages = state.home.messages;
        this.contacts = state.home.contacts;
    }

    ngOnInit() {
        this.actions.getUserMessages();
    }

    private scrolldownChat() {
        let objDiv = document.getElementById("chatMessages");
        objDiv.scrollTop = objDiv.scrollHeight;
    }

    open() {
        this.active = !this.active;

        // if (this.active) {
        //     document.getElementById('home').style.width = "75%";
        // } else {
        //     document.getElementById('home').style.width = "100%";
        // }
    }

    ngOnDestroy() {

    }

    pushMessage() {
        let data = {
            type: "MESSAGE",
            to: this.activeProfile.user._id,
            content: this.chatForm.value.message,
        };

        this.actions.pushMessage(data);
        data['created'] = new Date();
        this.userChat.push(data);

        setTimeout(() => this.scrolldownChat(), 0);
    }

    viewProfile(userId: string) {
        this.actions.getUserProfile_noRedirect(userId, () => {
            let state = this.store.getState();
            this.activeProfile = state.home.userProfile;
            this.state = CHAT;
        });

        this.actions.getUserChat(userId, () => {
            let state = this.store.getState();
            this.userChat = state.home.chatMessages;
        });
    }

    all() {
        this.state = FEED;
    }

    chat() {
        this.state = CHAT;
    }

    contactsState() {
        this.state = CONTACTS;
    }

    close() {
        this.active = false;
    }
}
