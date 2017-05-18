import {Component, Output, EventEmitter} from "@angular/core";

@Component({
    selector: 'navigation-bar',
    template: `     
<div  class="ui left demo vertical inverted labeled icon sidebar menu uncover visible" (click)="sendNotification()">
  <a class="item" [routerLink]="['/home/main']">
    <i class="home icon"></i>
    Home
  </a>
  <a class="item" [routerLink]="['/home/games']">
    <i class="game icon"></i>
    Games
  </a>
  <a class="item" [routerLink]="['/home/users']">
   <i class="users icon"></i>
   Users
  </a>
  
  <a class="item" [routerLink]="['/home/myProfile']">
   <i class="user icon"></i>
   Profile
  </a>
  
 
</div>`,
    styles: [
        `a.item {
            /*padding: 6px !important;*/
         }`]
})
export class NavigationBarComponent {

    @Output() notifyParent: EventEmitter<any> = new EventEmitter();
    sendNotification() {
        this.notifyParent.emit('Some value to send to the parent');
    }

    active = false;

    constructor() {
    }
}
