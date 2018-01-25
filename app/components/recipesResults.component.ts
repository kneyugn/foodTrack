import {Component} from "@angular/core";
import {SpoonacularService} from "../services/spoonacular.service";

@Component({
    selector: "recipe-results",
    moduleId: module.id,
    templateUrl: "./recipeResults.component.html"
})
export class RecipesResultsComponent {
    /**
     * Alex, please look at the API call response body as an example to
     */
    private ingredients = [];

    constructor(private spoonacular: SpoonacularService) {
        // this.spoonacular.recipes$.subscribe((data) => {
        //     this.ingredients = data;
        // });
    }
}