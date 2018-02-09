import { Injectable } from "@angular/core";
var firebase = require("nativescript-plugin-firebase");

@Injectable()
export class FirebaseRecipeService {

    constructor() {
    }

    /*
    *   Add health tag to recipe
    */
    add_health_tag(tag, recipe_id) {
    }

    /*
    *   Add rating to recipe's rating list
    */
    add_rating(recipe_id, comment, rating, rated_by) {

    }

    /*
    *   Return the recipe if the recipe exists in our database
    */
    get_recipe_if_exists(recipe_id) {
    }

    /*
    *   Push new recipe when rated/commented/favorited
    */
    push_new_recipe(recipe_id, calories, sodium, cooking_directions, ingredients) {
        var recipe_detail = {};
        recipe_detail['ratings'] = [];
        recipe_detail['health_tag'] = [String];
        recipe_detail['image'] = "image_URL";
        recipe_detail['calories'] = calories;
        recipe_detail['sodium'] = sodium;
        recipe_detail['cooking_directions'] = cooking_directions;
        recipe_detail['ingredients'] = ingredients;
        firebase.setValue('/recipes/' + recipe_id, recipe_detail );
    }
}
