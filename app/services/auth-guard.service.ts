import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
const firebase = require("nativescript-plugin-firebase");
import { BackendService } from "./shared/backend.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) { }

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
