import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
const firebase = require("nativescript-plugin-firebase");
import {RouterExtensions} from "nativescript-angular";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private routerExtensions: RouterExtensions) { }

    canActivate() {
        return firebase.getCurrentUser()
            .then((user) => {
                return true;
            })
            .catch((error) => {
                this.routerExtensions.navigate(['login']);
            });
    }
}
