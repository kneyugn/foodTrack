import { Component } from "@angular/core";
import {FirebaseRecipeService} from "../services/firebaseRecipe.service";

@Component({
    selector: "recipe-details",
    moduleId: module.id,
    templateUrl: "./recipeDetails.component.html",
    styleUrls: ['./recipeDetails.component.css'],
})

export class RecipeDetailsComponent {
    private recipes = null;
    constructor(private recipeService: FirebaseRecipeService) {
        this.recipeService.recipe$.subscribe((detailedRecipe) => {
            console.log("from recipes", JSON.stringify(detailedRecipe));
        })
    }
}