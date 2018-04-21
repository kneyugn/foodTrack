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
        this.getMockRecipes();
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
                'ratings' : [0],
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
                'ratings': [0],
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
            firebase.update(
                '/recipes/' + result.key, {'id' : result.key }
            );
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
        } else if (recipe["cooking_directions"]) {
            directions_arr = recipe["cooking_directions"];
        } else {
            directions_arr = [];
        }
        let newObject = Object.assign(recipe, {cooking_directions : directions_arr});
        if (!recipe['health_tag']) {
            newObject = Object.assign(newObject, {'health_tag' : []});
        }
        if (!recipe['comments']) {
            newObject = Object.assign(newObject, {'comments' : []});
        }
        //console.log(recipe);
        this.recipe_.next(newObject);
        this.routerExtensions.navigate(['recipeDetails']);
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

    getMockRecipes() {
        firebase.getValue('/recipes/').then((result) => {
            let recipeArr = Object.values(result.value);
            console.log("recipes in fb", recipeArr.length);
            var j, x, i;
            for (i = recipeArr.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = recipeArr[i];
                recipeArr[i] = recipeArr[j];
                recipeArr[j] = x;
            }
            let newRecipeArr = recipeArr.slice(0, 8);
            console.log(newRecipeArr.length);
            this.landingPageRecipes_.next(newRecipeArr);
        });
    }
}
