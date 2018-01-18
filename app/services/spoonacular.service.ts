import { Injectable } from "@angular/core";
import {fromObject, Observable} from "tns-core-modules/data/observable";
import { Subject } from 'rxjs/Subject';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
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

    private header = new HttpHeaders();
    private getRecipesURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=flour";
    private getAutoCompleteURL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/ingredients/autocomplete";

    private recipesRet: any;

    constructor(private http: HttpClient) {
        /**
         * configurations for API
         */
        this.header.append("Accept", "application/json");
        this.header.append("X-Mashape-Key", "");  // NOTE: need your own API

        this.recipes$.subscribe((recipes) => {
            this.recipesRet = recipes;
        });
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
        this.http.get(this.getRecipesURL, { params: params }).subscribe((result) => {
            console.log(result);
            this.recipes_.next(result);
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
