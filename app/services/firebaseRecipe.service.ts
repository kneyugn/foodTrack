import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx'
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/do";
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RouterExtensions } from "nativescript-angular";
const firebase = require("nativescript-plugin-firebase");
import { knownFolders, File, Folder } from "file-system";
import { exitEvent } from "tns-core-modules/application/application";
import { FirebaseUserService } from "./firebaseUser.service";

var onChildEvent = function (result) {
    console.log("Event type: " + result.type);
    console.log("Key: " + result.key);
    console.log("Value: " + JSON.stringify(result.value));
};

@Injectable()
export class FirebaseRecipeService {

    private recipe_ = new BehaviorSubject<any>({});
    public recipe$ = this.recipe_.asObservable();

    private user_id = null;
    private recipe_id = null;
    private custom_id = 0; // decrement this every new custom is added

    public user_recipe_list = [];

    constructor(private fbUser: FirebaseUserService) {
        this.fbUser.user$.subscribe((userObj) => {
            if (userObj.recipe_list) {
                userObj.recipe_list.forEach((item) => {
                    this.user_recipe_list.push(item);
                });
            }
        }); 
        this.user_id = "user1";
    }

    get_recipe(recipe_id) : any {
        firebase.getValue('/recipe/' + this.recipe_id).then((result) => {
            // Need checker for getting no recipe from Firebase
            if (result.value) {
                this.recipe_.next(result.value);
                return true;
            } else {
                return false;
            }
        });
    }

    update_recipe(recipe_id, payload) {
        firebase.update(
            '/recipe/' + this.recipe_id,
            payload
        ).then(() => {
            firebase.getValue('/recipe/' + this.recipe_id).then((result) => {
                this.recipe_.next(result.value);
            });
        });
    }

    /*
    *   Push new spoonacular recipe into firebase
    */
    push_new_recipe(id) {
        firebase.setValue(
            '/recipe/' + id,
            {
                'name': '',
                'ratings' : [],
                'avg_rating' : 0,
                'health_tag' : [],
                'image' : 'image_url',
                'calories' : 0,
                'sodium' : 0,
                'cooking_directions' : 'Directions',
                'ingredients': [],
                'comments': []
            }
        );
    }

    /*
    *   Push new custom recipe into firebase
    */
    push_custom_recipe(name, health_tag, direction, ingredient, image_url) {
        firebase.push(
            '/recipes/',
            {
                'name': name,
                'ratings': [],
                'avg_rating': 0,
                'health_tag': health_tag,
                'image': 'image_url', // Will need this functionality 
                'calories': 0,
                'sodium': 0,
                'cooking_directions': direction,
                'ingredients': ingredient,
                'comments': []
            }
        ).then((result) => {
            if (this.user_recipe_list[0].recipes) {
                this.user_recipe_list[0].recipes.push(result.key);
            } else {
                this.user_recipe_list[0].recipes = new Array(result.key);
            }
            this.fbUser.update_custom({recipe_list: this.user_recipe_list} );
        });
    }

}
