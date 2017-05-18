import {Component, Input, Output, EventEmitter} from "@angular/core";
import {HomeActions} from "../actions/home.actions";
import {opacityTransition} from "../utils/router.animations";

@Component({
    selector: 'game-item',
    animations: [opacityTransition()],
    template: `     
     <div class="ui card" style="margin-bottom: 15px;">
  <div class="image">
    <img src="{{imageUrl}}">
  </div>
  <div class="content">
    <a class="header" style="font-size: 1.1em;">{{name}}</a>
    <!--<div class="meta">-->
      <!--<span class="date">Joined in 2013</span>-->
    <!--</div>-->
    <!--<div class="description">-->
      <!--{{description}}-->
    <!--</div>-->
  </div>
  <div class="extra content">
   <button *ngIf="!deleteState" class="tiny ui negative basic button" (click)="delete()">Delete</button>
    <button *ngIf="!deleteState" class="tiny ui primary basic button" (click)="bindToUser()">Bind to user</button>
   <button *ngIf="deleteState" [@opacityTransition]="deleteState" class="tiny ui negative basic button" (click)="confirmDelete()">Confirm</button>
   <button *ngIf="deleteState" [@opacityTransition]="deleteState" class="tiny ui black basic button" (click)="cancelDelete()">Cancel</button>
  </div>
</div>
`,
    styles: [
        `
        .ui.card {
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
export class GameItemComponent {

    @Input() _id: string;
    @Input() imageUrl : string;
    @Input() name: string;
    @Input() description: string;

    @Output() deleteEvent: EventEmitter<any> = new EventEmitter();

    deleteState: boolean;
    deleted: boolean = false;

    constructor(private actions: HomeActions) {
    }

    delete() {
        //this.deleteState = true;
        this.deleteEvent.emit(this._id + " : " + this.name);
    }

    confirmDelete() {
        this.actions.deleteGame(this._id, () => {
            this.deleted = true;
        })
    }

    bindToUser() {
        this.actions.bindGameToUser(this._id, () => {

        })
    }

    cancelDelete() {
        this.deleteState = false;
    }
}