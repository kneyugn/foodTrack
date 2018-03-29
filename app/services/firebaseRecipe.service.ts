import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Rx'
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/merge";
import "rxjs/add/operator/do";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import {RouterExtensions} from "nativescript-angular";
const firebase = require("nativescript-plugin-firebase");
import { FirebaseUserService } from "./firebaseUser.service";
import {SpoonacularService} from "./spoonacular.service";
import {FirebaseAuthService} from "./firebaseAuth.service";

var onChildEvent = function (result) {
    console.log("Event type: " + result.type);
    console.log("Key: " + result.key);
    console.log("Value: " + JSON.stringify(result.value));
};

@Injectable()
export class FirebaseRecipeService {

    private landingPageRecipes_ = new BehaviorSubject<any>([]);
    public landingPageRecipes_$ = this.landingPageRecipes_.asObservable();

    private recipe_ = new BehaviorSubject<any>({});
    public recipe$ = this.recipe_.asObservable();

    private user_id = null;
    private recipe_id = null;

    public user_recipe_list = [];

    constructor(private fbUser: FirebaseUserService,
                private spoonacularService: SpoonacularService,
                private routerExtensions: RouterExtensions) {

        firebase.getCurrentUser()
            .then(user => {
                this.user_id = user.uid;
                firebase.getValue('/users/' + this.user_id).then((result) => {
                    if (result.value && result.value.recipe_list) {
                        result.value.recipe_list.forEach((item) => {
                            this.user_recipe_list.push(item);
                        });
                    }
                });
                this.getMockRecipes();
            })
            .catch(error => { this.routerExtensions.navigate(['login']); });
    }

    get_recipe(recipe_id) : any {
        firebase.getValue('/recipes/' + this.recipe_id).then((result) => {
            // checker for getting no recipe from Firebase
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
            '/recipes/' + recipe_id,
            payload
        ).then(() => {
            firebase.getValue('/recipes/' + recipe_id).then((result) => {
                this.recipe_.next(result.value);
            });
        });
    }

    /*
    *   Push new spoonacular recipe into firebase
    */
    push_new_recipe(id) {
        firebase.setValue(
            '/recipes/' + id,
            {
                'title': '',
                'ratings' : [],
                'avg_rating' : 0,
                'health_tag' : [],
                'image' : 'image_url',
                'calories' : 0,
                'sodium' : 0,
                'cooking_directions' : 'Directions',
                'ingredients': [],
                'comments': [],
            }
        );
    }

    /*
    *   Push new custom recipe into firebase
    */
    push_custom_recipe(title, health_tag, direction, ingredient, image_url, author) {
        firebase.push(
            '/recipes/',
            {
                'title': title,
                'ratings': [],
                'avg_rating': 0,
                'health_tag': health_tag,
                'image': image_url,
                'calories': 0,
                'sodium': 0,
                'cooking_directions': direction,
                'ingredients': ingredient,
                'comments': [],
                'author': author
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

    getDetails(recipe) {
        let instructions = [];
        let directions_arr = [];
        if (recipe["analyzedInstructions"]) {
            let instructions = recipe["analyzedInstructions"][0]["steps"];
            instructions.forEach(element => {
                var dir = JSON.stringify(element.step);
                directions_arr.push(dir);
            });
        } else {
            directions_arr = [];
        }

        // this.routerExtensions.navigate(['recipeDetails']);

        firebase.getValue('/recipes/' + recipe['id']).then((result) => {
            let final_recipe_obj;
            if (result.value === null) {
                let newObj = {
                    'ratings' : [0],
                    'avg_rating' : 0,
                    'health_tag' : [],
                    'calories' : 0,
                    'sodium' : 0,
                    'cooking_directions' : directions_arr,
                    'ingredients': [],
                    'comments': [],
                };
                final_recipe_obj = Object.assign(newObj, recipe);
            } else {
                let newObject = Object.assign(result.value, {cooking_directions : directions_arr});
                final_recipe_obj = Object.assign(newObject, recipe);
            }
            this.recipe_.next(final_recipe_obj);
            this.routerExtensions.navigate(['recipeDetails']);
        });
    }

    getRecipeList(listOfIds) {
        firebase.getValue('/recipes/').then((allRecipes) => {
            let recipeResults = [];
            listOfIds.forEach((item) => {
                recipeResults.push(allRecipes.value[item.toString()]);
            });
            this.spoonacularService.sendFromFirebase(recipeResults.filter((rec) => typeof rec !== "undefined"));
        });
    }

    // TODO: Delete me later
    pushMockRecipes(result) {
        firebase.setValue('/kimMockRecipes/', result);
    }

    getMockRecipes() {
        firebase.getValue('/kimMockRecipes/').then((result) => {
            this.landingPageRecipes_.next(result.value);
        });
    }
}
