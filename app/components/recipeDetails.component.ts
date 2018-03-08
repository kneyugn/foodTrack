import { Component } from "@angular/core";
import {FirebaseRecipeService} from "../services/firebaseRecipe.service";
import {RouterExtensions} from "nativescript-angular";

@Component({
    selector: "recipe-details",
    moduleId: module.id,
    templateUrl: "./recipeDetails.component.html",
    styleUrls: ['./recipeDetails.component.css'],
})

export class RecipeDetailsComponent {
    private recipes = null;
    constructor(private recipeService: FirebaseRecipeService, private routerExtensions: RouterExtensions) {
        this.recipeService.recipe$.subscribe((detailedRecipe) => {
            console.log("from recipes", JSON.stringify(detailedRecipe));
        })
    }
}