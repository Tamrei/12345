import {Component, Input} from "@angular/core";
import {HomeActions} from "../actions/home.actions";
import {opacityTransition} from "../utils/router.animations";

@Component({
    selector: 'main-game-item',
    animations: [opacityTransition()],
    template: `     
     <div class="ui card" style="margin-bottom: 15px;">
  <div class="image">
    <img src="{{imageUrl}}">
  </div>
  <div class="content" style="padding: 12px;">
    <a class="header text-center" style="font-size: 0.9em;">{{name}}</a>
    <!--<div class="meta">-->
      <!--<span class="date">Joined in 2013</span>-->
    <!--</div>-->
    <!--<div class="description">-->
      <!--{{description}}-->
    <!--</div>-->
  </div>
  <div class="extra content">
    <button class="tiny ui basic button" (click)="createProposal()">Propose</button>
    <button class="tiny ui basic button" (click)="prosedUsers()">Find Friend</button>
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
export class MainGameItemComponent {

    @Input() _id: string;
    @Input() imageUrl : string;
    @Input() name: string;

    constructor(private actions: HomeActions) {
    }

    createProposal() {
        this.actions.createProposal(this._id, () => {

        })
    }

    prosedUsers() {
        this.actions.getProposetUsers(this._id, () => {

        })
    }

}