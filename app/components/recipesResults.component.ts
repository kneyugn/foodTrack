import {Component, OnInit} from "@angular/core";
import {SpoonacularService} from "../services/spoonacular.service";
import { ListPicker } from "ui/list-picker";
import {FirebaseRecipeService} from "../services/firebaseRecipe.service";

@Component({
    selector: "recipe-results",
    moduleId: module.id,
    templateUrl: "./recipeResults.component.html"
})

export class RecipesResultsComponent {
    private premadeRecipes = [
        {title: 't1', readyInMinutes: 1, id: '1', image: 'https://spoonacular.com/recipeImages/821481-312x231.jpg'},
        {title: 't2', readyInMinutes: 2, id: '1', image: 'https://spoonacular.com/recipeImages/288582-312x231.jpeg'},
        {title: 't3', readyInMinutes: 3, id: '1', image: 'https://spoonacular.com/recipeImages/930855-312x231.jpg'},
        {title: 't4', readyInMinutes: 4, id: '1', image: 'https://spoonacular.com/recipeImages/543736-312x231.jpg'},
        {title: 't4', readyInMinutes: 5, id: '1', image: 'https://spoonacular.com/recipeImages/543736-312x231.jpg'},
        {title: 't4', readyInMinutes: 6, id: '1', image: 'https://spoonacular.com/recipeImages/543736-312x231.jpg'},
        {title: 't4', readyInMinutes: 7, id: '1', image: 'https://spoonacular.com/recipeImages/543736-312x231.jpg'},
        {title: 't4', readyInMinutes: 8, id: '1', image: 'https://spoonacular.com/recipeImages/543736-312x231.jpg'},
        {title: 't4', readyInMinutes: 9, id: '1', image: 'https://spoonacular.com/recipeImages/543736-312x231.jpg'},
    ];

    private unfilteredRecipes = [];

    private recipes = [];

    private selected: number = 0;
    private filteringOptions = ['No Filter', 'Very Healthy', "Vegan", 'Gluten Free'];

    constructor(private spoonacular: SpoonacularService,
                private recipeService: FirebaseRecipeService) {
        this.spoonacular.searchResults$.subscribe((data) => {
            if (Object.keys(data).length === 0 && data.constructor === Object) {
                this.recipes = this.premadeRecipes;
            } else {
                this.recipes = data;
                this.unfilteredRecipes = data;
            }
        });
    }

    getDetails(recipe) {
        this.recipeService.getDetails(recipe);
    }

    sortRecipes(param){
        this.recipes.sort((a, b) => {
            return a[param] < b[param] ? -1: 1;
        });
    }

    selectedIndexChanged(args) {
        let picker = <ListPicker>args.object;
        let index = picker.selectedIndex;
        if (index === 0) {
            this.recipes = this.unfilteredRecipes;
        } else if (index === 1) {
            this.recipes = this.unfilteredRecipes.filter((item) => {
                return item['veryHealthy'] === true;
            })
        } else if (index === 2) {
            this.recipes = this.unfilteredRecipes.filter((item) => {
                return item['vegan'] === true;
            })
        } else if (index === 3) {
            this.recipes = this.unfilteredRecipes.filter((item) => {
                return item['dairyFree'] === true;
            })
        } else {
            this.recipes = this.unfilteredRecipes.filter((item) => {
                return item['cheap'] === true;
            });
        }
        if (this.recipes.length <= 0) {
            this.recipes = this.unfilteredRecipes;
        }
    }
}