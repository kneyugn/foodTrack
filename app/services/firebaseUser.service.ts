import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx'
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/do";
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {RouterExtensions} from "nativescript-angular";
const firebase = require("nativescript-plugin-firebase");
import { knownFolders, File, Folder } from "file-system";
import { exitEvent } from "tns-core-modules/application/application";
import {FirebaseAuthService} from "./firebaseAuth.service";


@Injectable()
export class FirebaseUserService {

    public user_ = new BehaviorSubject<any>({});
    public user$ = this.user_.asObservable();

    private user_id = null;
    public mock_bp_arr = [];
    public notifications = {};
    public bpValues = {};

    // Add to this pool for health tips notifications
    private pool_of_health_notifications = [{ message: "Remember to eat your vegtables", read: false }, { message: "Don't Drink Sugar Calories", read: false },
        { message: "Eat Nuts", read: false }, { message: "Eat Fatty Fish for Omega 3", read: false }, { message: "Get enough Sleep", read: false }, { message: "Drink some water, especially before meals", read: false },
        { message: "Drink coffee to have a better nap", read: false }, { message: "Ditch diet soda to lose weight", read: false }, { message: " About 7 of every 10 people having their first heart attack have high blood pressure", read: false},
        { message: "Kidney disease is also a major risk factor for high blood pressure", read: false }, { message: "About 8 of every 10 people having their first stroke have high blood pressure", read: false }, { message: "About 7 of every 10 people with chronic heart failure have high blood pressure", read: false}];

    constructor(private routerExtensions: RouterExtensions,
                private authService: FirebaseAuthService) {

        let listener = {
            onAuthStateChanged: function (data) {
                console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
                if (data.loggedIn) {
                    console.log("User info", data.user);
                    firebase.getCurrentUser()
                        .then(user => {
                            this.user_id = user.uid;
                            firebase.getValue('/users/' + user.uid).then((result) => {
                                this.user_.next(result.value); 
                            });
                            firebase.getValue('/users/' + user.uid).then((result) => {
                                this.notifications = result.value.notifications;
                                this.bpValues = result.value.bp_values;
                                if (this.bpValues) {
                                    var last_bp_time = this.bpValues[this.bpValues.length - 1][2];
                                    var split = last_bp_time.split(" ");
                                    var timestamp = new Date(Date.now());
                                    var time_now = (timestamp.getMonth() + 1) + '/' + timestamp.getDate() + '/' + timestamp.getFullYear();
                                    if (split[0] != time_now.toString()) {
                                        this.notifications.unshift({ message: "Reminder to enter in your BP Value", read: false });
                                    }
                                } else {
                                    this.notifications.unshift({ message: "Reminder to enter in your BP Value", read: false });
                                }
                                var health_index = Math.floor(Math.random() * this.pool_of_health_notifications.length) + 1;
                                var tip = this.pool_of_health_notifications[health_index];
                                this.notifications.unshift(tip);
                                this.update_user_V2({ notifications: this.notifications });
                            });
                        }).catch(error => {
                            this.routerExtensions.navigate(['login']);
                            //this.loginStatus_.next(false);
                        });                
                }
            },
            thisArg: this
        };

        firebase.addAuthStateListener(listener);
    }

    set_userId(id) {
        this.user_id = id;
    }

    get_userID() {
        return this.user_id;
    }

    update_user(payload) {
        firebase.update(
            '/users/' + this.user_id,
            payload
        ).then(() => {
            firebase.getValue('/users/' + this.user_id).then((result) => {
                this.user_.next(result.value);
                this.routerExtensions.navigate(['userProfile']);
            });
        });
    }

    update_user_V2(payload) {
        firebase.update(
            '/users/' + this.user_id,
            payload
        ).then(() => {
            firebase.getValue('/users/' + this.user_id).then((result) => {
                this.user_.next(result.value);
            });
        });
    }

    update_custom(list) {
        firebase.update(
            '/users/' + this.user_id,
            list
        ).then(() => {
            firebase.getValue('/users/' + this.user_id).then((result) => {
                this.user_.next(result.value);
            });
        });
    }

    createMockBP() {
        console.log('creating fake data');
        let days = [];
        let months = [11, 0, 1, 2, 3, 4];

        for (let i = 0; i < months.length; i++) {
            let startMonth = months[i];
            let date = new Date(2018, startMonth, 1);
            while (date.getMonth() === startMonth) {
                date.setDate(date.getDate() + 1);
                if (date.getMonth() == 11 || date.getMonth() == 0 || date.getMonth() == 10) {
                    if (date.getMonth() == 10) {
                        days.push('10/' + date.getDate() + '/2017');
                    }
                    if (date.getMonth() == 11) {
                        days.push('11/' + date.getDate() + '/2017');
                    }  else {
                        days.push('12/' + date.getDate() + '/2017');
                    }
                } else {
                    days.push(date.getMonth() + '/' + date.getDate() + '/2018');
                }
            }
        }

        let bpScores = [];
        days = days.slice(0, days.length - 8);
        days.forEach((day) => {
            let systolic = Math.floor(Math.random() * (150 - 120 + 1)) + 120;
            let diastolic = Math.floor(Math.random() * (100 - 70 + 1)) + 70;
            bpScores.push([systolic, diastolic, day]);
        });

        firebase.update(
            '/users/' + '', {'bp_values': bpScores}
        ).then((result) => {
            firebase.getValue('/users/' + this.user_id);
            this.user_.next(result.value);
        });
    }
}
