import { Component } from "@angular/core";
import {FirebaseUserService} from "../services/firebaseUser.service";
import {RouterExtensions} from "nativescript-angular";
import {FirebaseRecipeService} from "../services/firebaseRecipe.service";

@Component({
    selector: "notifications",
    moduleId: module.id,
    templateUrl: "./notifications.component.html",
    styleUrls: ['./notifications.component.css'],
})

export class NotificationsComponent {

    private notifications: string[];
    public icons = {};

    constructor(private userService: FirebaseUserService,
        private recipeService: FirebaseRecipeService,
        private routerExtensions: RouterExtensions) {
        this.notifications = ["Test notification", "Another one that goes on for quite a while, as notifications are wont to do"];
        this.icons = {
            cancel: String.fromCharCode(0xea0f)
        };
    }

    removeNotification(i: number) {
        this.notifications.splice(i, 1);
    }
}