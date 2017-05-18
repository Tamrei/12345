import {Injectable, Inject} from '@angular/core';
import { TRANSLATIONS } from './translations'; // import our opaque token
import {sprintf} from "sprintf-js";

@Injectable()
export class TranslateService {
	private _currentLang: string;
	
	public get currentLang() {
	  return this._currentLang;
	}

    // inject our translations
	constructor(@Inject(TRANSLATIONS) private _translations: any) {
	}

	public use(lang: string): void {
		// set current language
		this._currentLang = lang;
	}

	private translate(key: string, args: any[]): string {
		// private perform translation
		let translation = key;
    
        if (this._translations[this.currentLang] && this._translations[this.currentLang][key]) {
			return sprintf(this._translations[this.currentLang][key], ...args);
		}

		return translation;
	}

	public instant(key: string, args: any[]) : string {
		// public perform translation
		return this.translate(key, args);
	}
}