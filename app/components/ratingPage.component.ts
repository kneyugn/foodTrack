import {Component, ViewChild, ElementRef} from "@angular/core";
import {FirebaseUserService} from "../services/firebaseUser.service";
import {FirebaseRecipeService} from "../services/firebaseRecipe.service";
import { RouterExtensions } from "nativescript-angular/router/router-extensions";

@Component({
    selector: "rating-recipe",
    moduleId: module.id,
    templateUrl: "./ratingPage.component.html",
    styleUrls: ['./ratingPage.component.css'],
})

export class RatingRecipeComponent {
    private food_pic = '~/res/kk.jpg';
    //changes how many levels
    //doesn't change star number though
    private max = 5;
    @ViewChild('starValue') starValue: ElementRef;

    private recipe;

    constructor(private recipeService: FirebaseRecipeService, private routerExtensions: RouterExtensions) {
        this.recipeService.recipe$.subscribe((detailedRecipe) => {
            this.recipe = detailedRecipe;
            // console.log(this.recipe.id);
            // console.log("from custom ratings", JSON.stringify(detailedRecipe));
        })
    }
    // display 0
    private value = 0;

    // TODO: Xx
    addRating() {
        /**
         *  add to this.recipe.ratings
         *  let newObj = Object.assign(this.recipe.ratings, {});
         *  this.recipeService.update_recipe(this.recipe.id, updatedRecipes)
         */
        // let newObj = Object.assign(this.recipe.ratings, {});
        var arr = this.recipe.ratings;
        arr.push(this.starValue.nativeElement.value);
        this.recipe.ratings = arr;
        this.recipeService.update_recipe(this.recipe.id, this.recipe);
    }

    back(){
        this.routerExtensions.back();
    }

}