import { Component } from "@angular/core";
import {FirebaseAuthService} from "../services/firebaseAuth.service";
import { FirebaseUserService } from "../services/firebaseUser.service";
import { last } from "rxjs/operators";
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";
import { TextField } from "ui/text-field";

@Component({
    selector: "log-in",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css', "./css/icons.css"],
})

export class LoginComponent {

    private myItems: Array<SegmentedBarItem>;
    private segSelectedIndex: number = 0;
    private pencil = String.fromCharCode(0xe905);
    private key = String.fromCharCode(0xe98d);
    private loginEmailStr;
    private loginPswStr;
    private registEmailStr;
    private registUsrnmStr;
    private registFirstNmStr;
    private registLastNmStr;
    private registPswStr;
    private registCPwdStr;

    constructor(private authService: FirebaseAuthService, private fbUser: FirebaseUserService) {
        
        this.myItems = [];
        const item1 = new SegmentedBarItem();
        item1.title = "Login";
        this.myItems.push(item1);
        const item2 = new SegmentedBarItem();
        item2.title = "Register";
        this.myItems.push(item2);
    }

    anonLogin() {
        this.authService.anonLogin();
    }

    login() {
        if (this.loginEmailStr && this.loginPswStr) {
            this.authService.emailPasswordLogin(this.loginEmailStr, this.loginPswStr);
            this.fbUser.get_user();
        }
    }

    loginEmail(args) {
        let textField = <TextField>args.object;

        console.log("loginEmail");
        this.loginEmailStr = textField.text;
    }

    loginPsw(args) {
        let textField = <TextField>args.object;

        console.log("loginPsw");
        this.loginPswStr = textField.text;
    }

    register() {
        if (this.registEmailStr && this.registCPwdStr && this.registPswStr == this.registCPwdStr) {
            if (!this.registUsrnmStr) {
                this.registUsrnmStr = "jdoe123";
            }
            if (!this.registFirstNmStr) {
                this.registFirstNmStr = "Jane";
            }
            if (!this.registLastNmStr) {
                this.registLastNmStr = "Doe";
            }
            this.authService.emailPasswordRegister(this.registEmailStr, this.registUsrnmStr, this.registFirstNmStr, this.registLastNmStr, this.registPswStr);
        }
    }

    registEmail(args) {
        let textField = <TextField>args.object;

        console.log("registEmail");
        this.registEmailStr = textField.text;
    }

    registUsrnm(args) {
        let textField = <TextField>args.object;

        console.log("registUsrnm");
        this.registUsrnmStr = textField.text;
    }

    registFirstNm(args) {
        let textField = <TextField>args.object;

        console.log("registFirstNm");
        this.registFirstNmStr = textField.text;
    }

    registLastNm(args) {
        let textField = <TextField>args.object;

        console.log("registLastNm");
        this.registLastNmStr = textField.text;
    }

    registPsw(args) {
        let textField = <TextField>args.object;

        console.log("registPsw");
        this.registPswStr = textField.text;
    }

    registCPwd(args) {
        let textField = <TextField>args.object;

        console.log("registCPwd");
        this.registCPwdStr = textField.text;
    }

    // If Login Successful - gets a random health tip and puts into list
    getNewHealthTip() {
        var health_index = Math.floor(Math.random() * this.fbUser.pool_of_health_notifications.length) + 1;
        var notification_list = [];
        this.fbUser.user$.subscribe((result) => {
            if (result.notifications) {
                result.notifications.forEach((item) => {
                    notification_list.unshift(item);
                });
            }
            notification_list.unshift(this.fbUser.pool_of_health_notifications[health_index]);
            this.fbUser.update_user_V2({ notifications: notification_list});
        });
    }

    // If Login Successful - check latest BP timestamp if not today then create reminder notification
    getBPReminder() {
        var bp_values = []
        var notification_list = []
        this.fbUser.user$.subscribe((result) => {
            if (result.notifications) {
                result.notifications.forEach((item) => {
                    notification_list.unshift(item);
                });
                if (result.bp_values) {
                    result.bp_values.forEach((item) => {
                        bp_values.push(item);
                    });
                    var last_bp_time = bp_values[bp_values.length - 1][3];
                    var split = last_bp_time.split(" ");
                    var timestamp = new Date(Date.now());
                    var time_now = (timestamp.getMonth() + 1) + '/' + timestamp.getDate() + '/' + timestamp.getFullYear();
                    if (split[0] != time_now) {
                        notification_list.unshift({ message: "Reminder to enter in your BP Value", read: false });
                    }
                } else {
                    notification_list.unshift({message: "Reminder to enter in your BP Value", read: false});
                }
            }
            this.fbUser.update_user_V2({ notifications: notification_list });
        });
    }

    onSelectedIndexChange(args) {
        let segmetedBar = <SegmentedBar>args.object;
        this.segSelectedIndex = segmetedBar.selectedIndex;
    }
}