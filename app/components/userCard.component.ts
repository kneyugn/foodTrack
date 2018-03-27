import {Component} from "@angular/core";
import {FirebaseUserService} from "../services/firebaseUser.service";
import * as imagepicker from "nativescript-imagepicker";
import { Observable } from "tns-core-modules/ui/page/page";

@Component({
    selector: "user-card",
    moduleId: module.id,
    templateUrl: "./userCard.component.html",
    styleUrls: ['./userCard.component.css', './css/icons.css'],
})

export class UserCardComponent {
    private usr_pic = new Observable();
    private userInfo = {
        age: 29,
        name: "Jane Doe",
        username: "JDHealthy"
    };

    public edit_icon = String.fromCharCode(0xe905);

    constructor(private fbUser: FirebaseUserService) {
        this.fbUser.user$.subscribe((userObj) => {
            if (userObj) {
                this.userInfo.name = userObj.first + " " + userObj.last;
                this.userInfo.age = userObj.age;
                this.userInfo.username = userObj.username;
            }
        });
        this.usr_pic.set("src", "~/res/profilepic.jpg");
    }

    getImage() {
        let _that = this;
        let context = imagepicker.create({
            mode: "single"
        });
        context.authorize().then(function () {
            return context.present();
        }).then(function (selection) {
            _that.usr_pic.set("src", selection[0]);
            // TODO save to user_profile
        }).catch(function (e) {
            // process error
        });
    }
}