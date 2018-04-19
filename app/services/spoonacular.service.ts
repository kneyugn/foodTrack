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
const firebase = require("nativescript-plugin-firebase");

@Injectable()
export class SpoonacularService {
    private recipes_= new Subject<any>();
    public recipes$ = this.recipes_.asObservable();

    private searchResults_ = new BehaviorSubject<any>({});
    public  searchResults$ = this.searchResults_.asObservable();

    private autoIngredients_ = new Subject<any>();
    public autoIngredients$ = this.autoIngredients_.asObservable();

    private recipeDirection_ = new Subject<any>();
    public recipeDirection$ = this.recipeDirection_.asObservable();

    public header = new HttpHeaders();
    private getRecipeByIngredientURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients";
    private getRecipesURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search";

    private recipesRet: any;

    constructor(private http: HttpClient, private routerExtensions: RouterExtensions) {
    }

    /*
     * Parses a recipe instructions to array format
     *   Usage:
     *   this.spoonacular.parseDirection(479101);
     *   this.spoonacular.recipeDirection$.subscribe((data) => {
     *       console.log(JSON.stringify(data));
     *   });
     */ 
    parseDirection(recipe_id) {
        var directions_arr = new Array<string>();
        let headers = new HttpHeaders().set("X-Mashape-Key", "").set("Accept", "application/json");
        this.http.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipe_id + "/information?", { headers: headers }).subscribe(result => {
            var instructions = result["analyzedInstructions"][0]["steps"];
            instructions.forEach(element => {
                var dir = JSON.stringify(element.step);
                directions_arr.push(dir);
            });
            this.recipeDirection_.next(directions_arr);
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
        this.http.get(this.getRecipesURL, { params: params, headers: headers })
            .map(res => res['results'])
            .mergeMap((recipes) => {
                return Observable.forkJoin(
                    recipes.map((recipe) => {
                        let headersNew = new HttpHeaders().set("X-Mashape-Key", "").set("Accept", "application/json");
                        return this.http.get("https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/" + recipe['id'] + "/information?", { headers: headersNew })
                            .map((detailedRecipe) => {
                                let newObj = {
                                    'ratings' : [0],
                                    'avg_rating' : 0,
                                    'health_tag' : [],
                                    'calories' : 0,
                                    'sodium' : 0,
                                    'cooking_directions' : [],
                                    'comments': [],
                                };
                                let final_recipe_obj = Object.assign(newObj, detailedRecipe);
                                return final_recipe_obj;
                            })
                    })
                )
        }).subscribe(result => {
            this.routerExtensions.navigate(['/recipesResults']);
            this.searchResults_.next(result);
            result.forEach((item) => {
                firebase.setValue('/recipes/' + item['id'], item);
            });
        }, (err: HttpErrorResponse) => {
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
                                let newObj = {
                                    'ratings' : [0],
                                    'avg_rating' : 0,
                                    'health_tag' : [],
                                    'calories' : 0,
                                    'sodium' : 0,
                                    'cooking_directions' : [],
                                    'comments': [],
                                };
                                let final_recipe_obj = Object.assign(newObj, detailedRecipe);
                                return final_recipe_obj;
                            })
                    })
                )
            })
            .subscribe(result => {
                result.forEach((item) => {
                    firebase.setValue('/recipes/' + item['id'], item);
                });
                this.routerExtensions.navigate(['/recipesResults']);
                this.searchResults_.next(result);
        }, (err: HttpErrorResponse) => {
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

    sendFromFirebase(data) {
        this.searchResults_.next(data);
        this.routerExtensions.navigate(['/recipesResults']);
    }
}
