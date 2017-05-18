import {Component} from "@angular/core";

@Component({
    selector: 'loading-spinner',
    template: `     
     <div *ngIf="active" class="loader-container" style="
            margin: auto;
            position: fixed;
            z-index: 1200;
            left: 0;
            bottom: 0;
            right: 0;
            top: 30%;
            text-align: center;">
                     <div class="preloader-wrapper big active">
                        <div class="spinner-layer ">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div>
                            <div class="gap-patch">
                                <div class="circle"></div>
                            </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div>
  </div>
`,
    // styles: [`.loader-container {
    //         margin: 'auto',
    //         position: 'fixed',
    //         zIndex: 1200,
    //         left: 0,
    //         bottom: 0,
    //         right: 0,
    //         top: 30%,
    //         text-align: 'center'
    //         }`]
})
export class LoadingSpinnerComponent {

    active = false;

    constructor() {
    }

    start() {
        this.active = true;
        document.getElementsByTagName('body')[0].style.zIndex = "-100";
        //document.getElementsByTagName('body')[0].style.opacity = "0.60";
    }

    stop() {
        this.active = false;
        document.getElementsByTagName('body')[0].style.zIndex = "0";
       // document.getElementsByTagName('body')[0].style.opacity = "1";
    }
}
