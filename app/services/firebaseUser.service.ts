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


var onChildEvent = function(result) {
    console.log("Event type: " + result.type);
    console.log("Key: " + result.key);
    console.log("Value: " + JSON.stringify(result.value));
};


@Injectable()
export class FirebaseUserService {

    private user_ = new BehaviorSubject<any>({});
    public user$ = this.user_.asObservable();

    private user_id = null;
    public mock_bp_arr = [];

    // Add to this pool for health tips notifications
    public pool_of_health_notifications = [{ message: "Remember to eat your vegtables", read: false }, { message: "Don't Drink Sugar Calories", read: false },
        { message: "Eat Nuts", read: false }, { message: "Eat Fatty Fish for Omega 3", read: false }, { message: "Get enough Sleep", read: false }, { message: "Drink some water, especially before meals", read: false },
        { message: "Drink coffee to have a better nap", read: false }, { message: "Ditch diet soda to lose weight", read: false }];

    constructor(private routerExtensions: RouterExtensions,
                private authService: FirebaseAuthService) {
        firebase.getCurrentUser()
            .then(user => {
                this.user_id = user.uid;
                this.get_user();
            })
            .catch(error => { this.routerExtensions.navigate(['login']); });

        // listen to changes in the /users path
        firebase.addChildEventListener(onChildEvent, "/users" + this.user_id + "/bp_values").then((listenerWrapper) => {
                let path = listenerWrapper.path;
                let listeners = listenerWrapper.listeners; // an Array of listeners added
                // you can store the wrapper somewhere to later call 'removeEventListeners'
            }
        );
    }

    set_userId(id) {
        this.user_id = id;
    }

    get_user() {
        firebase.getCurrentUser().then(user => {
            console.log("newID", this.user_id);
            firebase.getValue('/users/' + this.user_id).then((result) => {
                this.user_.next(result.value);
            });
        });
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
}
