import {Component} from "@angular/core";
import {FirebaseUserService} from "../services/firebaseUser.service";

@Component({
    selector: "user-card",
    moduleId: module.id,
    templateUrl: "./userCard.component.html",
    styleUrls: ['./userCard.component.css', './css/icons.css'],
})

export class UserCardComponent {
    private usr_pic = '~/res/profilepic.jpg';
    private userInfo = {
        age: 29,
        name: "Jane Doe",
        username: "JDHealthy"
    };

    constructor(private fbUser: FirebaseUserService) {
        this.fbUser.user$.subscribe((userObj) => {
            if (userObj) {
                this.userInfo.name = userObj.first + " " + userObj.last;
                this.userInfo.age = userObj.age;
                this.userInfo.username = userObj.username;
            }
        });

    }
}