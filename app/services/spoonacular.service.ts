import { Injectable } from "@angular/core";
import {fromObject, Observable} from "tns-core-modules/data/observable";
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import * as ts from "typescript/lib/tsserverlibrary";
import fromString = ts.ScriptSnapshot.fromString;
import {RouterExtensions} from "nativescript-angular";

@Injectable()
export class SpoonacularService {
    private recipes_= new Subject<any>();
    public recipes$ = this.recipes_.asObservable();

    private searchResults_ = new BehaviorSubject<any>({});
    public  searchResults$ = this.searchResults_.asObservable();

    private autoIngredients_ = new Subject<any>();
    public autoIngredients$ = this.autoIngredients_.asObservable();

    public header = new HttpHeaders();
    private recipe_id = 0;
    private getRecipeByIngredientURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients";
    private getRecipesURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search";
    private getAutoCompleteURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/autocomplete";
    private getRecipeInformationURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + this.recipe_id + "/information";

    private recipesRet: any;

    constructor(private http: HttpClient, private routerExtensions: RouterExtensions) {
        /**
         * configurations for API - Do this within method
         */
        //this.header.set("X-Mashape-Key", "");  // NOTE: need your own API
        //this.header.set("Accept", "application/json");
        this.recipes$.subscribe((recipes) => {
            this.recipesRet = recipes;
        });
    }

    getAutoComplete(intolerances, queryStr) {
        // FUTURE IMPLEMENTATION
        var reqParam = `intolerances=${intolerances}&query=${queryStr}`;
        const params = new HttpParams(
            {fromString: reqParam}
        );
        this.http.get(this.getAutoCompleteURL, { params: params }).subscribe((result) => {
            this.autoIngredients_.next(result);
        });
    }

    getRecipe(clientParams) {
        /**
         *  This function calls spoonacular api to get Recipes by search term
         */
        let headers = new HttpHeaders().set("X-Mashape-Key", "").set("Accept", "application/json");
        const params = new HttpParams(
            { fromString: clientParams }
        );

        /***
         *  FOR TESTING
         */
        // let testResults = [
        //     {title: 't1', readyInMinutes: 45, id: '1', image: 'https://spoonacular.com/recipeImages/821481-312x231.jpg'},
        //     {title: 't2', readyInMinutes: 12, id: '1', image: 'https://spoonacular.com/recipeImages/288582-312x231.jpeg'},
        //     {title: 't3', readyInMinutes: 24, id: '1', image: 'https://spoonacular.com/recipeImages/930855-312x231.jpg'},
        //     {title: 't4', readyInMinutes: 35, id: '1', image: 'https://spoonacular.com/recipeImages/543736-312x231.jpg'},
        //     {title: 't4', readyInMinutes: 35, id: '1', image: 'https://spoonacular.com/recipeImages/543736-312x231.jpg'},
        //     {title: 't4', readyInMinutes: 35, id: '1', image: 'https://spoonacular.com/recipeImages/543736-312x231.jpg'},
        //     {title: 't4', readyInMinutes: 35, id: '1', image: 'https://spoonacular.com/recipeImages/543736-312x231.jpg'},
        //     {title: 't4', readyInMinutes: 35, id: '1', image: 'https://spoonacular.com/recipeImages/543736-312x231.jpg'},
        //     {title: 't4', readyInMinutes: 35, id: '1', image: 'https://spoonacular.com/recipeImages/543736-312x231.jpg'},
        // ];
        // this.searchResults_.next(testResults);

        this.http.get(this.getRecipesURL, { params: params, headers: headers }).subscribe(result => {
            // Print out all recipe titles received
            console.log("Get Request by Keyword");
            var data_arr = result["results"];

            // for (var recipe in data_arr) {
            //     var recipe_json = JSON.stringify(data_arr[recipe]);
            //     let curr_recipe = JSON.parse(recipe_json);
            //     console.log(curr_recipe.title);
            // }
            // console.log(this.recipesRet);
            // this.routerExtensions.navigate(['recipesResults']);
            this.searchResults_.next(data_arr);
        }, (err: HttpErrorResponse) => {
            // Error Handling
            if (err.error instanceof Error) {
                console.log('An error occurred:', err.error.message);
            } else {
                console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                console.log(err.headers.get("Accept"));
                for (var property in err.error) {
                    console.log(property + "=" + err.error[property]);
                }
            }
        });
    }

    getRecipesByIngredients(clientParams) {
        /**tns
         *  This function calls spoonacular api to get Recipes by ingredients
         */
        const params = new HttpParams(
            {fromString: clientParams});
        let headers = new HttpHeaders().set("X-Mashape-Key", "").set("Accept", "application/json");
        this.http.get(this.getRecipeByIngredientURL, { params: params, headers : headers }).subscribe(result => {
            this.recipes_.next(result);
            console.log("Get Request by Ingredient");
            //console.log(this.recipesRet);

        }, (err: HttpErrorResponse) => {
            // Error Handling
            if (err.error instanceof Error) {
                console.log('An error occurred:', err.error.message);
            } else {
                console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
                console.log(err.headers.get("Accept"));
                for (var property in err.error) {
                    console.log(property + "=" + err.error[property]);
                }
            }
        });
    }

    filterRecipes() {
        /**
         * TODO: filter recipes by salt content, vegetarian, etc
         */
        // this.recipesRet = this.recipesRet.filter((item) => item[param] != null)
        for (var ret in this.recipesRet) {
            console.log(JSON.stringify(this.recipesRet[ret]));
        }
        /* JSON categories
            id , title, image, ingredients -> missedIngredients, usedIngredients, unusedIngredients
            for (var recipe in result) {
                var recipe_json = JSON.stringify(result[recipe]);
                let curr_recipe = JSON.parse(recipe_json);
                console.log(curr_recipe.title);
            }
        */
    }

    sortRecipes(param, num) {
        this.recipesRet.sort((a, b) => {
            return num === -1 ? a[param] - b[param] : b[param] - a[param];
        });
        this.recipes_.next(this.recipesRet);
    }
}
