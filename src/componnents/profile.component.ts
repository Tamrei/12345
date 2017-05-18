import {Component, Input} from "@angular/core";
import {HomeActions} from "../actions/home.actions";
import {opacityTransition} from "../utils/router.animations";
import {GlobalActions} from "../actions/global.actions";
import {FormGroup, FormBuilder} from "@angular/forms";

@Component({
    selector: 'profile',
    animations: [opacityTransition()],
    template: `     
  <div class="ui card">
  <div class="image">
    <img src="https://semantic-ui.com/images/avatar2/large/kristy.png">
  </div>
  <div class="content">
    <!--<a class="header">{{name}}</a>-->
    <!--<div class="meta">-->
      <!--<span class="date">Joined in 2013</span>-->
    <!--</div>-->
    <div class="description">
      <form class="ui form" [formGroup]="profileForm" novalidate>
  <div class="field">
    <label>Your Name</label>
    <input disabled class="editable-text" type="text" name="name" placeholder="Your Name" [formControl]="profileForm.controls['name']">
  </div>
  <div class="field">
    <label>About your</label>
    <textarea class="editable-text" placeholder="About you" rows="5" [formControl]="profileForm.controls['about']"></textarea>
  </div>
  <button *ngIf="profileForm.dirty" class="ui positive basic button small" type="submit" (click)="submit()" [disabled]="!profileForm.valid">Update</button>
  
</form>
    </div>
  </div>
  <div class="extra content">
    <a>
      <i class="user icon"></i>
      22 Friends
    </a>
  </div>
</div>
`,
    styles: [
        `.ui.card {
            width: 100%;
            box-shadow: none;
        }
        .ui.card .description {
            /*max-height: 250px;*/
            /*min-height: 250px;*/
            /*overflow: scroll;*/
            /*overflow-x: hidden;*/
        }
        input.editable-text, 
        textarea.editable-text {
            border: none !important;
            padding-left: 0 !important;
        }
        .loader-container {
            margin: auto;
            position: fixed;
        }`]
})
export class ProfileComponent {

    profileForm: FormGroup;

    @Input() _id: string;
    @Input() name: string;
    @Input() password?: string;
    @Input() about?: string;

    constructor(private actions: HomeActions,
                private global: GlobalActions,
                private fb: FormBuilder) {
        this.profileForm = fb.group({
            'name': "",
            'about': ""
        });

        // this.profileForm.valueChanges.subscribe(data => {
        //     console.log('Form changes', data);
        // })
    }

    submit() {
        let reqData = {
            name: this.profileForm.value.name,
            about: this. profileForm.value.about
        };

        this.actions.updateProfile(reqData);
    }

    ngOnInit() {
        this.profileForm.setValue({
            name: this.name,
            about: this.about
        });
    }

    // subcribeToFormChanges() {
    //     // initialize stream
    //     const myFormValueChanges$ = this.profileForm.valueChanges;
    //
    //     // subscribe to the stream
    //     myFormValueChanges$.subscribe(x => this.events
    //         .push({ event: 'STATUS CHANGE', object: x }));
    // }
}