import {Component} from "@angular/core";

declare var jQuery:any;

@Component({
    selector: 'alert-modal',
    template: `     
    <div class="ui small modal" id="alert-modal">
        <div class="header">
           {{title}}
           <!--<i class="close icon" style="float: right;"></i>-->
        </div>
        <div class="image content">
            <!--<div class="ui medium image">-->
                <!--&lt;!&ndash;<img src="/images/avatar/large/chris.jpg">&ndash;&gt;-->
            <!--</div>-->
            <div class="description text-center">
                <div class="ui header">{{content}}</div>
                <!--<p>We've grabbed the following image from the <a href="https://www.gravatar.com" target="_blank">gravatar</a> image associated with your registered e-mail address.</p>-->
                <!--<p>Is it okay to use this photo?</p>-->
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
export class AlertModalComponent {

    active = false;
    title: string;
    content: string;

    constructor() {
    }

    open(title: string, content: string) {
        this.title = title;
        this.content = content;
        jQuery('#alert-modal').modal('show');
    }

    close() {
        jQuery('#alert-modal').modal('hide');
    }
}
