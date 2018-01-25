import {Component} from "@angular/core";
import {EventData} from "tns-core-modules/data/observable";
import {SpoonacularService} from "../services/spoonacular.service";

@Component({
    selector: "landing-page",
    moduleId: module.id,
    templateUrl: "./landingPage.component.html"
})
export class LandingPageComponent {
    private ingredients = [];
    private autoComplete: any;

    constructor(private spoonacular: SpoonacularService) {
        this.spoonacular.recipes$.subscribe((data) => {
            this.ingredients = data;
        });
        this.spoonacular.autoIngredients$.subscribe((data) => {
            this.autoComplete = data;
        });
    }

    getUserInput() {
        /**
         * TODO: get the user's input
         */
    }

    filterRecipe() {

    }

    getRecipes(event: EventData) {
        let searchQuery = 'chicken';
        let number = '10'; // # of recipe to return
        let instructions_required ='true';
        let diet = "" // possible values: pescetarian, lacto vegetarian, ovo vegetarian, vegan, and vegetarian
        let limitLicense = 'false';
        var clientParams = `instructionsRequired=${instructions_required}&limitLicense=${limitLicense}&number=${number}&query=${searchQuery}`;
        this.spoonacular.getRecipe(clientParams);
    }

    getRecipesByIngredients(event: EventData) {
        /**
         *  TODO: create a UI to retrieve the user's list of ingredients
         */
        let maxRecipes = '2';
        let limitLicense = 'false';
        let ranking = '1';
        let fillIngredients = 'true';
        let ingredients = "flour, beans";
        var clientParams = `fillIngredients=${fillIngredients}&ingredients=${ingredients}&limitLicense=${limitLicense}&number=${maxRecipes}&ranking=${ranking}`;
        this.spoonacular.getRecipesByIngredients(clientParams);
    }
}