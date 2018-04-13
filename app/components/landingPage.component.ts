import {Component, OnInit} from "@angular/core";
import {SpoonacularService} from "../services/spoonacular.service";
import {SearchBar} from "tns-core-modules/ui/search-bar";
import {RouterExtensions} from "nativescript-angular";
import * as platform from "tns-core-modules/platform";
import { FirebaseUserService } from "../services/firebaseUser.service";
import { FirebaseRecipeService } from "../services/firebaseRecipe.service";
import {FirebaseAuthService} from "../services/firebaseAuth.service";
import { ScrollView, ScrollEventData } from 'tns-core-modules/ui/scroll-view';
import { View } from 'tns-core-modules/ui/core/view';
const firebase = require("nativescript-plugin-firebase");

@Component({
    selector: "landing-page",
    moduleId: module.id,
    templateUrl: "./landingPage.component.html",
    styleUrls: ['./landingPage.component.css']
})

export class LandingPageComponent implements OnInit {
    private ingredients = ['potatoes', 'chicken'];
    private bpScores = null;
    private firstName = null;
    private sScore = null;
    private dScore = null;
    private recipes = [
        {image: "https://spoonacular.com/recipeImages/964239-556x370.jpg", id: 964239},
        {image: "https://spoonacular.com/recipeImages/482574-556x370.jpg", id: 482574},
        {image: 'https://spoonacular.com/recipeImages/930855-312x231.jpg'},
        {image: 'https://spoonacular.com/recipeImages/543736-312x231.jpg'}
        ];

    constructor(private spoonacular: SpoonacularService,
                private routerExtensions: RouterExtensions,
                private fbUser: FirebaseUserService,
                private firebaseRecipe: FirebaseRecipeService) {
    }

    ngOnInit() {
        this.fbUser.user$.subscribe((userObj) => {
            if (userObj && userObj.bp_values) {
                this.bpScores = userObj.bp_values;
                this.sScore = parseInt(this.bpScores[this.bpScores.length - 1][0]);
                this.dScore = parseInt(this.bpScores[this.bpScores.length - 1][1]);
            }
            if (userObj) {
                this.firstName = userObj.first;
            }
        });
    }

    getSStatus() {
        if (parseInt(this.sScore) < 120) {
            return 'normal';
        } else if (this.sScore >= 120 && this.sScore <= 139) {
            return 'at-risk';
        } else {
            return'high';
        }
    }

    getDStatus() {
        if (parseInt(this.dScore) < 80) {
            return 'normal';
        } else if (this.dScore >= 80 && this.dScore <= 89) {
            return 'at-risk';
        } else {
            return 'high';
        }
    }

    //Gets rid of the keyboard when load page
    onLoad(args) {
        let searchbar: SearchBar = <SearchBar>args.object;
        if (platform.isAndroid) {
            setTimeout(function () {
                searchbar.dismissSoftInput();
            }, 500);
        }
    }

    getDetails(recipe) {
        this.firebaseRecipe.getDetails(recipe);
    }

    getRecipesByIngredients() {
        let maxRecipes = '4';
        let limitLicense = 'false';
        let ranking = '1';
        let fillIngredients = 'true';
        let ingredients = this.ingredients.toString();
        let clientParams = `fillIngredients=${fillIngredients}&ingredients=${ingredients}&limitLicense=${limitLicense}&number=${maxRecipes}&ranking=${ranking}`;
        this.spoonacular.getRecipesByIngredients(clientParams);
    }

    searchRecipes(args) {
        let number = 4;
        let searchBar = <SearchBar>args.object;
        let searchBarText = searchBar.text;
        let clientParams = `query=${searchBarText}&number=${number}`;
        this.spoonacular.getRecipe(clientParams);
        searchBar.text = '';
    }

    onScroll(event: ScrollEventData, scrollView: ScrollView, topView: View) {
        if (scrollView.verticalOffset < 250) {
            const offset = scrollView.verticalOffset / 2;
            if (scrollView.ios) {
                topView.animate({ translate: { x: 0, y: offset } }).then(() => { }, () => { });
            } else {
                topView.translateY = Math.floor(offset);
            }
        }
    }
}