import { Component } from "@angular/core";
import {FirebaseAuthService} from "../services/firebaseAuth.service";

@Component({
    selector: "log-in",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css'],
})

export class LoginComponent {
    constructor(private authService: FirebaseAuthService) {
    }

    anonLogin() {
        this.authService.anonLogin();
    }
}