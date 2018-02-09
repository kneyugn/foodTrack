import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx'
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as ts from "typescript/lib/tsserverlibrary";
var firebase = require("nativescript-plugin-firebase");


@Injectable()
export class FirebaseUserService {
    private favorite_recipes_ = new Subject<any>();
    public favorite_recipes$ = this.favorite_recipes_.asObservable();

    public curr_user_id: String; // Load in current logged in user ?? Can we do this for a service

    constructor() {
    }

    /*
    *   Update recent BP value and append to user's BP data array
    *   User expected to push twice a day
    */
    push_bp() {
    }

    /*
    * Returns array of BP -- for BP Chart
    */
    get_user_bp_data() {
    }

    /*
    *   Returns entire User json
    */
    get_user(user_id) {
        
    }

    /*
    *   Add medical history from user profile
    */
    add_medical_history(condition) {
        
    }

    /*
    *   Delete medical history from user profile
    */
    remove_medical_history(condition) {

    }

    /*
    *   Add favorite recipe to user's favorite list
    */
    add_favorite_recipe() {

    }

    /*
    *   Remove a recipe from user's favorite list
    */
    remove_favorite_recipe(recipe_id) {

    }

    /*
    *   Change user's profile image
    */
    update_profile_image(img_url) {

    }

    /*
    *   Update most recently visited recipe by User
    */
    update_recent_recipe(recipe_id) {

    }

    /*
    *   Creates a new user
    */
    push_new_user() {
        firebase.push(  
            '/users',
            {
                'first': 'John',
                'last': 'Lin',
                'username': 'jlin332',
                'bp_values': [],
                'recent_bp': [],
                'bp_goal': [],
                'medical_history': [String],
                'favorite_recipes': [],
                'recent_visited_recipe_id': 0,
                'profile_pic': 'image_url',
                'notifications': []
            }
        );
    }
}
