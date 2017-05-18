import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app/app.module";
import {enableProdMode} from "@angular/core";



/*
 * Bootstrap Angular app with a top level NgModule
 */

//enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));