import { Component, OnInit} from "@angular/core";
import {FirebaseRecipeService} from "../services/firebaseRecipe.service";
import {RouterExtensions} from "nativescript-angular";
import {ViewChild, ElementRef} from "@angular/core";

@Component({
    selector: "recipe-details",
    moduleId: module.id,
    templateUrl: "./recipeDetails.component.html",
    styleUrls: ['./recipeDetails.component.css'],
})

export class RecipeDetailsComponent implements OnInit {
    private recipe;
    private value = 5;
    @ViewChild('starValue') starValue: ElementRef;
    constructor(private recipeService: FirebaseRecipeService, private routerExtensions: RouterExtensions) {
        this.recipeService.recipe$.subscribe((detailedRecipe) => {
            this.recipe = detailedRecipe;
            console.log("from recipes", JSON.stringify(detailedRecipe));
        })
        
    }
    ngOnInit() {
        this.calculateAvg();
    }

    // TODO: update this function after john? fixes the id problem
    calculateAvg() {
        var ratings = this.recipe.ratings;
        var sum =ratings.reduce(function(a, b) { return a + b; });
        console.log(sum + 5);
        console.log("nnnn");
        var avg = sum / ratings.length;
        this.unchange(avg);
        
    }


    unchange(avg) {
        this.value = avg;
        this.starValue.nativeElement.value = avg;
        // console.log(this.starValue.nativeElement.value);

    }
}