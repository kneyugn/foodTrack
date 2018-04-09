import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/do";
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {RouterExtensions} from "nativescript-angular";

import { knownFolders, File, Folder } from "file-system";
import { exitEvent } from "tns-core-modules/application/application";
import { FirebaseUserService } from "./firebaseUser.service";
import { Observable } from 'rxjs/Rx';
const firebase = require("nativescript-plugin-firebase");

@Injectable()
export class FirebaseAuthService {

    private loginStatus_ = new BehaviorSubject<any>(false);
    public loginStatus$ = this.loginStatus_.asObservable();

    constructor(private routerExtensions: RouterExtensions) {
        firebase.getCurrentUser()
            .then((user) => {
                this.routerExtensions.navigate(['landing']);
            })
            .catch((error) => {
                this.routerExtensions.navigate(['login']);
            });

        let listener = {
            onAuthStateChanged: function(data) {
                console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
                this.loginStatus_.next(data.loggedIn);
                if (data.loggedIn) {
                    console.log("User info", data.user);

                }
            },
            thisArg: this
        };
        firebase.addAuthStateListener(listener);
    }

    logout() {
        firebase.logout().then((res) => {
            this.routerExtensions.navigate(['login']);
        });
    }

    anonLogin() {
        firebase.login(
            {
                type: firebase.LoginType.ANONYMOUS
            })
            .then((user) => {
                firebase.setValue(
                    '/users/' + user.uid,
                    {
                        'first': 'Anonymous',
                        'last': 'person',
                        'username': 'jdoe123',
                        'bp_values': [],
                        'recent_bp': [],
                        'bp_goal': [],
                        'medical_history': [],
                        'health_goals': {},
                        'favorite_recipes': [],
                        'recipe_list': [{title: "My Custom List", recipes: ['123']},
                            {title: "My Favorite Recipes", recipes: ['123']}],
                        'recent_visited_recipe_id': 0,
                        'profile_pic': '~/res/image_placeholder.png',
                        'notifications': [{ message: "Welcome to FoodTrack, where you can track what you eat!", read: false }]
                    }
                ).then((user) => {
                    console.log("anonymous user created");
                    this.routerExtensions.navigate(['/landing']); }
                ).catch((err) => {console.log("err creating app")});
            }).catch(error => console.log("Login Anon Error: " + error));
    }

    emailPasswordLogin(emailIn, passwordIn) {
        let _that = this;
        firebase.login(
            {
                type: firebase.LoginType.PASSWORD,
                passwordOptions: {
                    email: emailIn,
                    password: passwordIn
                }
            }).then(result => {
                let json_result = JSON.stringify(result);
                this.routerExtensions.navigate(['/landing']);
            }
            ).catch(error => console.log("Login email Error: " + error));
    }

    emailPasswordRegister(emailIn, usrnmIn, firstNmIn, lastNmIn, passwordIn) {
        firebase.createUser({
            email: emailIn,
            password: passwordIn
        }).then((user) => {
            firebase.setValue(
                '/users/' + user.key,
                {
                    'first': firstNmIn,
                    'last': lastNmIn,
                    'username': usrnmIn,
                    'bp_values': [],
                    'recent_bp': [],
                    'bp_goal': [],
                    'medical_history': [],
                    'health_goals': {},
                    'favorite_recipes': [],
                    'recipe_list': [{title: "My Custom List", recipes: ['123']},
                        {title: "My Favorite Recipes", recipes: ['123']}],
                    'recent_visited_recipe_id': 0,
                    'profile_pic': '~/res/image_placeholder.png',
                    'notifications': [{ message: "Welcome to FoodTrack, where you can track what you eat!", read: false }]
                }
            ).then((user) => {
                console.log("new user created from user email and password");
                this.routerExtensions.navigate(['/landing']);
            });
        }).catch(error => console.log("Register email Error: " + error));
    }

    googleSignIn() {
        firebase.login({
            type: firebase.LoginType.GOOGLE,
            // Optional
            googleOptions: {
                hostedDomain: "mygsuitedomain.com"
            }
        }).then(
            function (result) {
                var json_result = JSON.stringify(result);
            },
            function (errorMessage) {
                console.log(errorMessage);
            }
        );
    }

}
