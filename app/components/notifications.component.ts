import { Component } from "@angular/core";
import {FirebaseUserService} from "../services/firebaseUser.service";
import {RouterExtensions} from "nativescript-angular";
import {FirebaseRecipeService} from "../services/firebaseRecipe.service";

@Component({
    selector: "notifications",
    moduleId: module.id,
    templateUrl: "./notifications.component.html",
    styleUrls: ['./notifications.component.css', './css/icons.css'],
})

export class NotificationsComponent {

    private notifications: { message: string, read: boolean }[];
    public icons = {};

    constructor(private userService: FirebaseUserService) {
        this.userService.user$.subscribe((result) => {
            this.notifications = [];
            if (result.notifications) {
                result.notifications.forEach((item) => {
                    this.notifications.unshift(item);
                });
                this.sortNotifications();
            } else {
                this.notifications.push({message: "No Notifications", read: true });
            }
        });
        this.icons = {
            cancel: String.fromCharCode(0xea0f)
        };
    }

    // TODO: Create Notification for user when comment/rating is added

    sortNotifications() {
        var temp_notification = [];
        this.notifications.forEach((notification)=> {
            if (notification) {
                if (notification.read == false) {
                    temp_notification.unshift(notification);
                } else {
                    temp_notification.push(notification);
                }
            }
        });
        this.notifications = temp_notification;
    }

    read(i: number) {
        this.notifications[i].read = true;
        this.userService.update_user_V2({notifications: this.notifications});
    }

    removeNotification(i: number) {
        this.notifications.splice(i, 1);
        this.userService.update_user_V2({notifications: this.notifications});
    }
}