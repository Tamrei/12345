import {Component, Input} from "@angular/core";
import {opacityTransition} from "../../utils/router.animations";
import {HomeActions} from "../../actions/home.actions";


@Component({
    selector: 'message-item',
    animations: [opacityTransition()],
    template: `     
     <div class="ui feed">
            <div *ngFor="let data of messages" class="event">
                <div class="label">
                    <img src="https://semantic-ui.com/images/avatar/small/elliot.jpg">
                </div>
                <div class="content">
                    <div class="summary">
                        <a (click)="viewProfile(data.from)">{{data.from}}</a> typed to you
                        <div class="date">
                            {{data.created | date:'yMdjm'}}
                        </div>
                    </div>
                    <div class="extra text">
                        {{data.content}}
                    </div>
                </div>
            </div>
        </div>
`,
})
export class MessageItemComponent {

    @Input() messages: Array<Object>;

    constructor(private actions: HomeActions) {
    }

    viewProfile(userId) {
        this.actions.getUserProfile(userId);
    }

    ngOnInit() {
    }
}