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
import {FirebaseRecipeService} from "./firebaseRecipe.service";
import {FirebaseUserService} from "./firebaseUser.service";


firebase.init({
    onAuthStateChanged: function(data) { // optional but useful to immediately re-logon the user when he re-visits your app
        console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
        if (data.loggedIn) {
            console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
        } else {

        }
    }
}).then(
    instance => {
        console.log("firebase.init done");
    },
    error => {
        console.log(`firebase.init error: ${error}`);
    }
);


@Injectable()
export class FirebaseAuthService {

    constructor(private routerExtensions: RouterExtensions) {
        firebase.getCurrentUser()
            .then(user => this.routerExtensions.navigate(['landing']))
            .catch(error => { this.routerExtensions.navigate(['login']); });
    }

    logout() {
        firebase.logout();
        this.routerExtensions.navigate(['login']);
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
                        'first': 'Jane',
                        'last': 'Doe',
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
                        'profile_pic': 'image_url',
                        'notifications': []
                    }
                ).then((user) => {
                    console.log("new user created");
                    this.routerExtensions.navigate(['/landing']); });
            }).catch(error => console.log("Login Anon Error: " + error));
    }

    emailPasswordLogin() {
        firebase.login(
            {
                type: firebase.LoginType.PASSWORD,
                passwordOptions: {
                    email: 'eddyverbruggen@gmail.com',
                    password: 'firebase'
                }
            })
            .then(result => JSON.stringify(result))
            .catch(error => console.log(error));
    }

    emailPasswordRegister() {
        firebase.createUser({
            email: 'eddyverbruggen@gmail.com',
            password: 'firebase'
        }).then((user) => {
            firebase.setValue(
                '/users/' + user.uid,
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
                    'recipe_list': [{title: "My Custom List", recipes: ['123']},
                        {title: "My Favorite Recipes", recipes: ['123']}],
                    'recent_visited_recipe_id': 0,
                    'profile_pic': 'image_url',
                    'notifications': []
                }
            ).then((user) => {
                console.log("new user created from user email and password");
                this.routerExtensions.navigate(['/landing']); });
        }).catch(error => console.log("Login Anon Error: " + error));
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
                JSON.stringify(result);
            },
            function (errorMessage) {
                console.log(errorMessage);
            }
        );
    }

}
