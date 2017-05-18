import {Component} from "@angular/core";

declare var jQuery:any;

@Component({
    selector: 'confirm-modal',
    template: `     
    <div class="ui small modal" id="confirm-modal">
        <div class="header">
           {{title}}
        </div>
        <div class="image content">
            <div class="description text-center">
                <div class="ui header">{{content}}</div>
            </div>
        </div>
        <div class="actions">
            <!--<div class="ui black deny button">-->
                <!--Nope-->
            <!--</div>-->
            <div class="ui positive button">
                Ok
                <!--<i class="checkmark icon"></i>-->
            </div>
        </div>
    </div>

`,
})
export class ConfirmModalComponent {

    active = false;
    title: string;
    content: string;

    constructor() {
    }

    open(title: string, content: string) {
        this.title = title;
        this.content = content;
        jQuery('#confirm-modal').modal('show');
    }

    close() {
        jQuery('#confirm-modal').modal('hide');
    }
}
