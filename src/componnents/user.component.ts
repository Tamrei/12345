import {Component, Input} from "@angular/core";
import {HomeActions} from "../actions/home.actions";
import {opacityTransition} from "../utils/router.animations";
import {GlobalActions} from "../actions/global.actions";

@Component({
    selector: 'user',
    animations: [opacityTransition()],
    template: `     
  <div class="ui cards" style="margin-bottom: 15px;">
   <div class="card">
    <div class="content">
      <div class="header">{{name}}</div>
      <div class="description">
        {{password}}
        <p>{{_id}}</p>
      </div>
    </div>
    <div class="ui bottom attached button">
      <i class="add icon"></i>
      Add
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
export class UserComponent {

    @Input() _id: string;
    @Input() name: string;
    @Input() password?: string;
    @Input() description: string;
    @Input() gameName?: string;

    constructor(private actions: HomeActions,
                private global: GlobalActions) {
    }

    propose() {
        //this.global.pushToastMessage("Proposed");
        //proposeGameRequest

        this.actions.proposeGameRequest(this._id, "test game name");


    }
}