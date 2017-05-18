import {Component, Input} from "@angular/core";
import {HomeActions} from "../actions/home.actions";
import {opacityTransition} from "../utils/router.animations";
import {GlobalActions} from "../actions/global.actions";
import {PROPOSE_MESSAGE} from "../config/constans";

declare var alertify: any;

@Component({
    selector: 'proposed-user',
    animations: [opacityTransition()],
    template: `     
  <div class="ui cards" style="margin-bottom: 15px;">
  <div class="card">
    <div class="content">
      <img class="right floated mini ui image" src="http://semantic-ui.com/images/avatar/large/jenny.jpg">
      <div class="header">
        {{name}} 
      </div>
      <div class="meta">
        {{date | date}}
      </div>
      <div class="description">
       {{description}}
      </div>
    </div>
    <div class="extra content">
      <!--<div class="ui two buttons">-->
        <!--<div class="ui basic green button" (click)="propose()">Propose</div>-->
        <!--<div class="ui basic red button">Decline</div>-->
      <!--</div>-->
      <button class="ui green small basic button" (click)="reply()">Reply</button>
    </div>
  </div>
  </div>
`,
    styles: [
        `.ui.card {
            width: 100%;
            box-shadow: none;
        }
        .ui.card .description {
            max-height: 250px;
            min-height: 250px;
            overflow: scroll;
            overflow-x: hidden;
        }
        .loader-container {
            margin: auto;
            position: fixed;
        }`]
})
export class ProposedUserComponent {

    @Input() _id: string;
    @Input() name: string;
    @Input() password?: string;
    @Input() description: string;
    @Input() gameName?: string;
    @Input() proposeDescription?: string;
    @Input() gameId: string;
    @Input() date: string;

    constructor(private actions: HomeActions,
                private global: GlobalActions) {
    }

    propose() {
        //this.global.pushToastMessage("Proposed");
        //proposeGameRequest

        //this.actions.proposeGameRequest(this._id, "test game name");
    }

    reply() {
        alertify.prompt("Push message to " + this._id, "", (evt, value) => {

            let data = {
                type: PROPOSE_MESSAGE,
                to: this._id,
                content: value,
                gameId: this.gameId
            };

            this.actions.pushMessage(data);
            }, () => {

            });
    }
}