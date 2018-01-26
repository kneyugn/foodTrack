import {Component} from "@angular/core";
import {EventData} from "tns-core-modules/data/observable";
import {SpoonacularService} from "../services/spoonacular.service";

@Component({
    selector: "landing-page",
    moduleId: module.id,
    templateUrl: "./landingPage.component.html",
    styleUrls: ['./landingPage.component.css']
})
export class LandingPageComponent {
    private ingredients = ['potatoes', 'chicken'];
    private recipes = [
        {image: 'https://spoonacular.com/recipeImages/821481-312x231.jpg'},
        {image: 'https://spoonacular.com/recipeImages/288582-312x231.jpeg'},
        {image: 'https://spoonacular.com/recipeImages/930855-312x231.jpg'},
        {image: 'https://spoonacular.com/recipeImages/543736-312x231.jpg'}
        ];

    constructor(private spoonacular: SpoonacularService) {
        // this.getRecipesByIngredients();
        // this.spoonacular.recipes$.subscribe((data) => {
        //     this.recipes = data;
        //     this.recipes.forEach((item) => {
        //         console.log(JSON.stringify(item))
        //     });
        // });
    }

    getRecipesByIngredients() {
        let maxRecipes = '4';
        let limitLicense = 'false';
        let ranking = '1';
        let fillIngredients = 'true';
        let ingredients = this.ingredients.toString();
        var clientParams = `fillIngredients=${fillIngredients}&ingredients=${ingredients}&limitLicense=${limitLicense}&number=${maxRecipes}&ranking=${ranking}`;
        this.spoonacular.getRecipesByIngredients(clientParams);
    }
}