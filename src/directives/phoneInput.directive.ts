import {Directive,ElementRef,Renderer,HostListener,Input} from '@angular/core';

@Directive({
    selector:'[phoneInput]',
    host: {
        '(keypress)': 'onKeyPress($event)'
    }
})
export class PhoneInputDirective{

    private _defaulColor = 'red';
    @Input('phoneInput') highlightColor: string;

    constructor(private el:ElementRef,private render:Renderer){
    }

    @HostListener('mouseenter') methodToHandleMouseEnterAction(){

        //console.log(this.highlightColor);
        this.changecolor(this.highlightColor || this._defaulColor);
    }

    @HostListener('mouseleave')methodToHandleMouseExitAction(){
        //console.log(this.highlightColor);
        this.changecolor(null);
    }

    @HostListener('keyup')methodToHandleKeyUpAction(e){
        //console.log(e);
        //console.log(this.highlightColor);
        //this.changecolor(null);
    }

    onKeyPress(event: any) {
        //event.preventDefault();
        console.log(event);
        //this.sorted.next(this.sortProperty); //Raise clicked event
    }

    private changecolor(color: string) {
        //this.render.setElementStyle(this.el.nativeElement, 'color', color);
    }
}