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

    constructor(private userService: FirebaseUserService,
        private recipeService: FirebaseRecipeService,
        private routerExtensions: RouterExtensions) {
        this.notifications = ["test notification", "another one that goes on for quite a while, as notifications are wont to do"];
    }

    removeNotification(i: number) {
        this.notifications.splice(i, 1);
    }
}