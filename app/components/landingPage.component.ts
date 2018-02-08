import {Component} from "@angular/core";
import {SpoonacularService} from "../services/spoonacular.service";
import {SearchBar} from "tns-core-modules/ui/search-bar";
import {RouterExtensions} from "nativescript-angular";
import * as platform from "tns-core-modules/platform";


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

        this.spoonacular.searchResults$.subscribe((data) => {
            if (Object.keys(data).length !== 0 && data.constructor !== Object) {
                console.log(JSON.stringify(data));
                this.routerExtensions.navigate(['recipesResults']);
            }
        })
    }

    //Gets rid of the keyboard when load page
    onLoad(args) {
        var searchbar: SearchBar = <SearchBar>args.object;
        if (platform.isAndroid) {
            setTimeout(function () {
                searchbar.dismissSoftInput();
            }, 100);
        }
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
        let number = 5;
        let searchBar = <SearchBar>args.object;
        let searchBarText = searchBar.text;
        let clientParams = `query=${searchBarText}&number=${number}`;
        this.spoonacular.getRecipe(clientParams);
        searchBar.text = '';
    }

}