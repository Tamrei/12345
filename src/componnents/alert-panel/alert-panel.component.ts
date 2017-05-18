import {Component} from "@angular/core";

@Component({
    selector: 'AlertPanel',
    template: `<div class="alert ease alert-danger" [ngClass]="{'active': message}" role="alert">
                   <a class="alert-link" href="">{{message}}</a>.
               </div>`,
    styles: [
        `.alert.ease {
            transition: opacity 1s ease-out;
            opacity: 0;
            overflow: hidden;
        }`,
        `.alert.ease.active {
            opacity: 1;
            height: auto;
        }`
    ]
})
export class AlertPanelComponent {
    private message: String = null;

    constructor() {
    }

    showMessage(msg: String) {
        this.message = msg;
    }
}