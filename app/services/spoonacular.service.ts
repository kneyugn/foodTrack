import { Injectable } from "@angular/core";
import {fromObject, Observable} from "tns-core-modules/data/observable";
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders, HttpParams,HttpErrorResponse } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import * as ts from "typescript/lib/tsserverlibrary";
import fromString = ts.ScriptSnapshot.fromString;

@Injectable()
export class SpoonacularService {
    private recipes_= new Subject<any>();
    public recipes$ = this.recipes_.asObservable();

    private autoIngredients_ = new Subject<any>();
    public autoIngredients$ = this.autoIngredients_.asObservable();

    public header = new HttpHeaders();
    private getRecipesURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients";
    private getAutoCompleteURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/autocomplete";

    private recipesRet: any;

    constructor(private http: HttpClient) {
        /**
         * configurations for API
         */
        this.header.set("X-Mashape-Key", "b3k8JoveF4mshGEU6P3Te6bbwB5hp1PLqkIjsnrQboitWybr3e");  // NOTE: need your own API
        this.header.set("Accept", "application/json");
        //console.log(this.header.get("Accept"));
        this.recipes$.subscribe((recipes) => {
            this.recipesRet = recipes;
        });
    }

    ngOnInit() {
        this.header.set("X-Mashape-Key", "b3k8JoveF4mshGEU6P3Te6bbwB5hp1PLqkIjsnrQboitWybr3e");  // NOTE: need your own API
        this.header.set("Accept", "application/json");
        console.log(this.header.get("Accept"));
    }

    getAutoComplete(intolerances, queryStr) {
        var reqParam = `intolerances=${intolerances}&query=${queryStr}`;
        const params = new HttpParams(
            {fromString: reqParam}
        );
        this.http.get(this.getAutoCompleteURL, { params: params }).subscribe((result) => {
            this.autoIngredients_.next(result);
        });
    }

    getRecipes(clientParams) {
        /**
         *  This function calls spoonacular api
         */
        const params = new HttpParams(
            {fromString: clientParams}
        );
        let headers = new HttpHeaders().set("X-Mashape-Key", "b3k8JoveF4mshGEU6P3Te6bbwB5hp1PLqkIjsnrQboitWybr3e").set("Accept", "application/json");;  // NOTE: need your own API
        console.log("params " + params);
        //console.log(headers.get("X-Mashape-Key"));
        this.http.get(this.getRecipesURL, { params: params, headers : this.header, observe : "response" }).subscribe(result => {
            console.log(result);
            this.recipes_.next(result);
            console.log(result.headers.get("X-Mashape-Key"));
        }, (err: HttpErrorResponse) => {
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.log('An error occurred:', err.error.message);
            } else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
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
    }

    sortRecipes(param, num) {
        this.recipesRet.sort((a, b) => {
            return num === -1 ? a[param] - b[param] : b[param] - a[param];
        });
        this.recipes_.next(this.recipesRet);
    }
}
