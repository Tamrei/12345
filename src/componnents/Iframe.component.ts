import {Component, Input, ElementRef} from "@angular/core";

@Component({
    selector: 'iframeComponent',
    template: `<iframe id="topUpIframe"></iframe>`,
    styles: [``]
})
export class IframeComponent {

    @Input() id: string;

    private iframeElement;
    private heightOffset;

    constructor(private elementRef: ElementRef) {
        //this.iframeElement = el.nativeElement;
    }

    public mountIframe() {
        this.iframeElement.style.display = "block";
        this.iframeElement.style.width = "100%";
        this.iframeElement.style.height = window.innerHeight - this.heightOffset + "px";
    }

    public setHeightOffset(offset: number) {
        this.heightOffset = offset;
    }

    public openUrl(url: string) {
        this.mountIframe();
        this.iframeElement.src = url;
    }

    public putContent(content: string) {
        this.mountIframe();
        this.iframeElement.contentWindow.document.open();
        this.iframeElement.contentWindow.document.write(content);
        this.iframeElement.contentWindow.document.close();
    }

    public clearIframe() {
        //if (this.iframeElement.src) {
            this.iframeElement.src = '';
        //}
        //
        this.iframeElement.style.display = "none";
    }

    ngAfterViewChecked() {
    }

    ngOnInit() {
        this.iframeElement = document.getElementById('topUpIframe');
        this.iframeElement.style.border = "none";
        this.iframeElement.style.display = "none";
        this.heightOffset = 0;
    }
}
