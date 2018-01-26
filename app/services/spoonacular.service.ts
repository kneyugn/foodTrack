import { Injectable } from "@angular/core";
import {Observable} from 'rxjs/Rx'
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/mergeMap";
import "rxjs/add/operator/merge";
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
    private getRecipeByIngredientURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients";
    private getRecipesURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search";

    private recipesRet: any;

    constructor(private http: HttpClient, private routerExtensions: RouterExtensions) {
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
        //     {title: 't1', readyInMinutes: 1, id: '1', image: 'https://spoonacular.com/recipeImages/821481-312x231.jpg'},
        //     {title: 't2', readyInMinutes: 2, id: '1', image: 'https://spoonacular.com/recipeImages/288582-312x231.jpeg'},
        //     {title: 't3', readyInMinutes: 3, id: '1', image: 'https://spoonacular.com/recipeImages/930855-312x231.jpg'},
        //     {title: 't4', readyInMinutes: 4, id: '1', image: 'https://spoonacular.com/recipeImages/543736-312x231.jpg'},
        //     {title: 't4', readyInMinutes: 5, id: '1', image: 'https://spoonacular.com/recipeImages/543736-312x231.jpg'},
        //     {title: 't4', readyInMinutes: 6, id: '1', image: 'https://spoonacular.com/recipeImages/543736-312x231.jpg'},
        //     {title: 't4', readyInMinutes: 7, id: '1', image: 'https://spoonacular.com/recipeImages/543736-312x231.jpg'},
        //     {title: 't4', readyInMinutes: 8, id: '1', image: 'https://spoonacular.com/recipeImages/543736-312x231.jpg'},
        //     {title: 't4', readyInMinutes: 9, id: '1', image: 'https://spoonacular.com/recipeImages/543736-312x231.jpg'},
        // ];
        // this.searchResults_.next(testResults);

        this.http.get(this.getRecipesURL, { params: params, headers: headers })
            .map(res => res['results'])
            .mergeMap((recipes) => {
                return Observable.forkJoin(
                    recipes.map((recipe) => {
                        let headersNew = new HttpHeaders().set("X-Mashape-Key", "").set("Accept", "application/json");
                        return this.http.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipe['id'] + "/information?", { headers: headersNew })
                            .map((detailedRecipe) => {
                                return detailedRecipe;
                            })
                    })
                )
        }).subscribe(result => {
            console.log("Get Request by Keyword");
            // for (var recipe in data_arr) {
            //     var recipe_json = JSON.stringify(data_arr[recipe]);
            //     let curr_recipe = JSON.parse(recipe_json);
            //     console.log(curr_recipe.title);
            // }
            // console.log(this.recipesRet);
            this.routerExtensions.navigate(['recipesResults']);
            this.searchResults_.next(result);
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
        this.http.get(this.getRecipeByIngredientURL, { params: params, headers : headers })
            .map((res: any[]) => res)
            .mergeMap((recipes) => {
                return Observable.forkJoin(
                    recipes.map((recipe) => {
                        let headersNew = new HttpHeaders().set("X-Mashape-Key", "").set("Accept", "application/json");
                        return this.http.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipe['id'] + "/information?", { headers: headersNew })
                            .map((detailedRecipe) => {
                                return detailedRecipe;
                            })
                    })
                )
            })
            .subscribe(result => {
            console.log("Get Request by Ingredient");
            this.routerExtensions.navigate(['recipesResults']);
            this.searchResults_.next(result);

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
}
