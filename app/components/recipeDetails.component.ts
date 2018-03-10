import { Component, OnInit, ChangeDetectionStrategy} from "@angular/core";
import {FirebaseRecipeService} from "../services/firebaseRecipe.service";
import {RouterExtensions} from "nativescript-angular";
import {ViewChild, ElementRef} from "@angular/core";
import { SegmentedBar, SegmentedBarItem } from "ui/segmented-bar";

@Component({
    selector: "recipe-details",
    moduleId: module.id,
    templateUrl: "./recipeDetails.component.html",
    styleUrls: ['./recipeDetails.component.css', "./css/icons.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class RecipeDetailsComponent implements OnInit {
    private recipe;
    private recipe_name;
    private food_pic;
    private value = 3;
    private max = 3;
    private myItems: Array<SegmentedBarItem>;
    private segSelectedIndex: number = 0;
    private ingredients=[];
    private directions=[];

    @ViewChild('starValue') starValue: ElementRef;
    constructor(private recipeService: FirebaseRecipeService, private routerExtensions: RouterExtensions) {
        this.recipeService.recipe$.subscribe((detailedRecipe) => {
            this.recipe = detailedRecipe;
            // console.log("from recipes", JSON.stringify(detailedRecipe));
        })

        this.myItems = [];
        const item1 = new SegmentedBarItem();
        item1.title = "Ingredients";
        this.myItems.push(item1);
        const item2 = new SegmentedBarItem();
        item2.title = "Directions";
        this.myItems.push(item2);
    }
    ngOnInit() {
        this.initName();
        this.displayPic();
        // this.calculateAvg();
        this.initIngredients();
        this.initDirections();
    }

    initName() {
        this.recipe_name = this.recipe.title;
    }

    displayPic() {
        this.food_pic = this.recipe.image;
        // console.log(this.food_pic)

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

    onSelectedIndexChange(args) {
        let segmetedBar = <SegmentedBar>args.object;
        this.segSelectedIndex = segmetedBar.selectedIndex;
    }

    initIngredients() {
        this.ingredients = this.recipe.extendedIngredients;
    }

    initDirections() {
        var directions = this.recipe.cooking_directions;
        for (let direction of directions) {
            this.directions.push(direction.replace(/['"]+/g, ''));
        }
    }
}