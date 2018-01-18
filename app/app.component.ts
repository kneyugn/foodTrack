import { Component } from "@angular/core";
import {EventData} from "tns-core-modules/data/observable";
import {SpoonacularService} from "./services/spoonacular.service";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {
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

    giveAutoComplete() {
        /**
         * TODO: give autocomplete input to user
         */
    }

    getUserInput() {
        /**
         * TODO: get the user's input
         */
    }

    getRecipes(event: EventData) {
        /**
         *  TODO: create a UI to retrieve the user's list of ingredients
         */
        let maxRecipes = '5';
        let limitLicense = 'false';
        let ranking = '1';
        let ingredients = "flour, beans";
        var clientParams = `ingredients=${ingredients}&limitLicense=${limitLicense}&number=${maxRecipes}&ranking=${ranking}`;
        this.spoonacular.getRecipes(clientParams);
    }
}
