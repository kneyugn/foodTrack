import {Component} from "@angular/core";
import {EventData} from "tns-core-modules/data/observable";
import {SpoonacularService} from "../services/spoonacular.service";
import {SearchBar} from "tns-core-modules/ui/search-bar";
import {RouterExtensions} from "nativescript-angular";

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

    constructor(private spoonacular: SpoonacularService, private routerExtensions: RouterExtensions) {
        // this.getRecipesByIngredients();
        // this.spoonacular.recipes$.subscribe((data) => {
        //     this.recipes = data;
        //     this.recipes.forEach((item) => {
        //         console.log(JSON.stringify(item))
        //     });
        // });
        this.spoonacular.searchResults$.subscribe((data) => {
            if (Object.keys(data).length !== 0 && data.constructor !== Object) {
                console.log(JSON.stringify(data));
                this.routerExtensions.navigate(['recipesResults']);
            }
        })
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

    searchRecipes(args) {
        // // todo: get the intolerances from client profile
        // // todo: get diet from user profile
        let number = 10;
        let searchBar = <SearchBar>args.object;
        let searchBarText = searchBar.text;
        let clientParams = `query=${searchBarText}&number=${number}`;
        this.spoonacular.getRecipe(clientParams);
        searchBar.text = '';
        // this.routerExtensions.navigate(['recipesResults']);
    }

}