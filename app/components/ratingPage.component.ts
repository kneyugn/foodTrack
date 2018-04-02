import {Component, ViewChild, ElementRef, OnInit} from "@angular/core";
import {FirebaseUserService} from "../services/firebaseUser.service";
import {FirebaseRecipeService} from "../services/firebaseRecipe.service";
import { RouterExtensions } from "nativescript-angular/router/router-extensions";
import { registerElement } from 'nativescript-angular/element-registry';

@Component({
    selector: "rating-recipe",
    moduleId: module.id,
    templateUrl: "./ratingPage.component.html",
    styleUrls: ['./ratingPage.component.css'],
})

export class RatingRecipeComponent {
    private food_pic;
    private max = 5;
    private value = 0;
    private recipe;
    @ViewChild('starValue') starValue: ElementRef;

    constructor(private recipeService: FirebaseRecipeService,
                private routerExtensions: RouterExtensions) {
        this.recipeService.recipe$.subscribe((detailedRecipe) => {
            this.recipe = detailedRecipe;
            this.food_pic = this.recipe.image;
        })
    }

    addRating() {
        let arr = this.recipe.ratings;
        arr.push(this.starValue.nativeElement.value);
        this.recipe.ratings = arr;
        this.recipeService.update_recipe(this.recipe.id, this.recipe);
    }

    back(){
        this.routerExtensions.back();
    }

}