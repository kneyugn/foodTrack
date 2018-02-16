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


firebase.init({
    // Optionally pass in properties for database, authentication and cloud messaging,
    // see their respective docs.
}).then(
    instance => {
        console.log("firebase.init done");
    },
    error => {
        console.log(`firebase.init error: ${error}`);
    }
);

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

    constructor(private routerExtensions: RouterExtensions) {

        // listen to changes in the /users path
        firebase.addChildEventListener(onChildEvent, "/users" + this.user_id + "/bp_values").then((listenerWrapper) => {
                let path = listenerWrapper.path;
                let listeners = listenerWrapper.listeners; // an Array of listeners added
                // you can store the wrapper somewhere to later call 'removeEventListeners'
            }
        );

        // TODO: get this from the logging / authentication process
        this.user_id = "user1";
        this.get_user();
    }

    get_user() {
        firebase.getValue('/users/' + this.user_id).then((result) => {
            this.user_.next(result.value);
        });
    }

    generateAllData() {
        this.mock_bp_arr = [];
        let documents = knownFolders.currentApp();
        var file = documents.getFile("/services/mock_data.txt");
        file.readText()
            .then(res => {
                var arr = res.split("\n");
                arr.forEach(element => {
                    var values = element.split(" ", 3);
                    // console.log(values);
                    this.mock_bp_arr.push(values);
                });
                firebase.update(
                    '/users/' + this.user_id,
                    { bp_values: this.mock_bp_arr }
                ).then(() => {
                    this.get_user();
                });
                return;               
            }).catch(err => {
                console.log(err.stack);
            });
    }

    generate2Weeks() {
        this.mock_bp_arr = [];
        let documents = knownFolders.currentApp();
        var file = documents.getFile("/services/mock_data.txt");
        file.readText()
            .then(res => {
                var arr = res.split("\n");
                for(var i = 0; i < 7; i++) {
                    var values = arr[i].split(" ", 3);
                    // console.log(values);
                    this.mock_bp_arr.push(values);
                }
                console.log(this.mock_bp_arr);
                firebase.update(
                    '/users/' + this.user_id,
                    { bp_values: this.mock_bp_arr }
                ).then(() => {
                    this.get_user();
                });
                return;
            });
    }

    generate1Month() {
        this.mock_bp_arr = [];
        let documents = knownFolders.currentApp();
        var file = documents.getFile("/services/mock_data.txt");
        file.readText()
            .then(res => {
                var arr = res.split("\n");
                for (var i = 0; i < 30; i++) {
                    var values = arr[i].split(" ", 3);
                    // console.log(values);
                    this.mock_bp_arr.push(values);
                }
                firebase.update(
                    '/users/' + this.user_id,
                    { bp_values: this.mock_bp_arr }
                ).then(() => {
                    this.get_user();
                });
                return;
            }).catch(err => {
                console.log(err.stack);
            });
    }

    generate3Month() {
        this.mock_bp_arr = [];
        let documents = knownFolders.currentApp();
        var file = documents.getFile("/services/mock_data.txt");
        file.readText()
            .then(res => {
                var arr = res.split("\n");
                for (var i = 0; i < 90; i++) {
                    var values = arr[i].split(" ", 3);
                    // console.log(values);
                    this.mock_bp_arr.push(values);
                }
                firebase.update(
                    '/users/' + this.user_id,
                    { bp_values: this.mock_bp_arr }
                ).then(() => {
                    this.get_user();
                });
                return;
            }).catch(err => {
                console.log(err.stack);
            });
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

    push_new_user() {
        firebase.setValue(
            '/users/' + this.user_id,
            {
                'first': 'Jane',
                'last': 'Doe',
                'username': 'jdoe123',
                'bp_values': [],
                'recent_bp': [],
                'bp_goal': [],
                'medical_history': [],
                'health_goals': {},
                'favorite_recipes': [],
                'recent_visited_recipe_id': 0,
                'profile_pic': 'image_url',
                'notifications': []
            }
        );
    }
}
