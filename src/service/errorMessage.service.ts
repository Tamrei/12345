import {Injectable} from '@angular/core';
import {TranslateService} from "../utils/translate/translate.service";
import {Router} from "@angular/router";

@Injectable()
export class ErrorMessageService {

    constructor(private translateService: TranslateService,
                private router: Router,) {
    }

    public getMessageFromErrorData(errorResponse: any) : string {
        let message = "";

        let statusCode = errorResponse.status;
        let errorData = JSON.parse(errorResponse._body);

        console.log(errorResponse, ' from error message service');

        if (statusCode == 404 && errorData.error_code == 1) {
            message = "login_fail";
        } else if (statusCode == 403 && errorData.error_code == 1) {
            message = "alert_you_are_blocked_text";
        } else if (statusCode == 409 && errorData.error_code == 1) {
            message = "user_exists";
        } else if (statusCode == 409 && errorData.error_code == 2) {
            message = "wallet exists";
        } else if (statusCode == 409 && errorData.error_code == 3) {
            message = "promo claimed";
        } else if (statusCode == 404 && errorData.error_code == 2) {
            message = "confirm_fail";
        } else if (statusCode == 404 && errorData.error_code == 10) {
            message = "Card not Found";
        } else if (statusCode == 404 && errorData.error_code == 7) {
            message = "Currency not found";
        } else if (statusCode == 404 && errorData.error_code == 9) {
            message = "Promo not found";
        } else if (statusCode == 400) { //
            message = "Wrong request data";
        } else if (statusCode == 500 || statusCode == 503) {
            message = "Service unavailable please try again later";
        }
        else if (statusCode == 401) {
            this.router.navigate(['/login']);
        }

        return this.translateService.instant(message, []);

    }

}
