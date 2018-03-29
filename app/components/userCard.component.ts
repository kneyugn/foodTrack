import {Component} from "@angular/core";
import {FirebaseUserService} from "../services/firebaseUser.service";
import * as imagepicker from "nativescript-imagepicker";
import { Observable } from "tns-core-modules/ui/page/page";
const firebase = require("nativescript-plugin-firebase");
var fs = require("file-system");

@Component({
    selector: "user-card",
    moduleId: module.id,
    templateUrl: "./userCard.component.html",
    styleUrls: ['./userCard.component.css', './css/icons.css'],
})

export class UserCardComponent {
    public usr_pic_url = new Observable();
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
                this.get_profile_pic(userObj.username);
            }
        });
    }

    async get_profile_pic(username) {
        // TODO use this.user_id
        var user_id = 'JDHealthy';
        let _that = this;
        return firebase.getDownloadUrl({
            // the full path of an existing file in your Firebase storage
            remoteFullPath: user_id + '/profilepic.jpg'
        }).then(
            function (url) {
                console.log("Remote URL: " + url);
                _that.usr_pic_url.set("src", url);
                _that.fbUser.update_user_V2({
                    profile_pic: url
                });
            },
            function (error) {
                console.log("Error: " + error);
                _that.usr_pic_url.set("src", "~/res/image_placeholder.png");
            }
        );
    }

    getImage() {
        let _that = this;
        let context = imagepicker.create({
            mode: "single"
        });
        var user_id = 'JDHealthy'; // TEMPORARY user_id
        context.authorize().then(function () {
            return context.present();
        }).then(function (selection) {
            _that.usr_pic_url.set("src", selection[0]);
            firebase.uploadFile({
                //TODO Change to USERNAME
                remoteFullPath: user_id + '/profilepic.jpg',
                localFile: fs.File.fromPath(selection[0]["_android"]),
            }).then(
                function (uploadedFile) {
                    console.log("File uploaded: " + JSON.stringify(uploadedFile));
                },
                function (error) {
                    console.log("File upload error: " + error);
                }
            );
        }).catch(function (e) {
            // process error
        });
    }
}