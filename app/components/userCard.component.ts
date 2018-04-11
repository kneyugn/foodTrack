import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
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

export class UserCardComponent implements OnInit {
    public usr_pic_url = new Observable();
    private userInfo = {
        name: "Jane Doe",
        username: "JDHealthy"
    };

    @ViewChild('picture') picture: ElementRef;


    public edit_icon = String.fromCharCode(0xe905);

    constructor(private fbUser: FirebaseUserService) {
        this.fbUser.user$.subscribe((userObj) => {
            if (userObj) {
                this.userInfo.name = userObj.first + " " + userObj.last;
                console.log(this.userInfo.name);
                this.userInfo.username = userObj.username;
                console.log(this.userInfo.username);
                this.usr_pic_url.set("src", userObj.profile_pic);
            }
        });
    }

    ngOnInit() {
        this.picture.nativeElement.backgroundImage = this.usr_pic_url.get("src")
        this.picture.nativeElement.backgroundPosition= "center";
        this.picture.nativeElement.backgroundRepeat = "no-repeat"

    }

    async get_profile_pic(username) {
        let _that = this;
        return firebase.getDownloadUrl({
            remoteFullPath: this.userInfo.username + '/profilepic.jpg'
        }).then(
            function (url) {
                _that.fbUser.update_user_V2({
                    profile_pic: url
                });
            },
            function (error) {
                //console.log("Error: " + error);
                _that.usr_pic_url.set("src", "~/res/image_placeholder.png");
            }
        );
    }

    getImage() {
        let _that = this;
        let context = imagepicker.create({
            mode: "single"
        });
        var user_id = this.userInfo.username;
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
                    this.get_profile_pic(user_id);
                },
                function (error) {
                }
            );
        }).catch(function (e) {
        });
    }
}