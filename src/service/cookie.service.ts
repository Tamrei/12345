import {Injectable} from '@angular/core';

@Injectable()
export class CookieService {

    constructor() {
    }

    public setCookie(cname, cvalue, exdays): void {
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toLocaleDateString();
        document.cookie = cname + "=" + cvalue + "; " + "session";
    }

    public getCookie(cname: string): string {
        let name = cname + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    public checkCookie(cname) {
        return this.getCookie(cname);
    }

    public onLangSet(lang) {
        this.setCookie("lang", lang, "session");
    }
}
