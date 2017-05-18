import {Component} from "@angular/core";

@Component({
    selector: 'temp-toast',
    template: `<div id="snackbar">{{message}}</div>`,
    styles: [`
#snackbar {
    visibility: hidden;
    min-width: 250px;
    margin-left: -125px;
    background-color: #fff;
    color: #333;
    text-align: center;
    border-radius: 2px;
    padding: 11px;
    position: fixed;
    z-index: 1;
    left: 50%;
    bottom: 30px;
    font-size: 15px;
}

#snackbar.show {
    visibility: visible;
    -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
    animation: fadein 0.5s, fadeout 0.5s 2.5s;
}

@-webkit-keyframes fadein {
    from {bottom: 0; opacity: 0;} 
    to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
    from {bottom: 0; opacity: 0;}
    to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes fadeout {
    from {bottom: 30px; opacity: 1;} 
    to {bottom: 0; opacity: 0;}
}

@keyframes fadeout {
    from {bottom: 30px; opacity: 1;}
    to {bottom: 0; opacity: 0;}
}`]
})
export class TempToastComponent {
    message: string;

    private timeout;

    constructor() {

    }

    push(message: string, callback?: Function) {
        this.message = message;
        let x = document.getElementById("snackbar");
        x.className = "show";

        clearTimeout(this.timeout);

        this.timeout = setTimeout(function () {
            x.className = x.className.replace("show", "");
            callback();
        }, 3000);
    }

    ngOnInit() {

    }
}