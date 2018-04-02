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
    private bookmark = String.fromCharCode(0xe9d2);
    private food_pic;
    private value = 5;
    private max = 5;
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
        this.calculateAvg();
        this.initName();
        this.displayPic();
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

    calculateAvg() {
        var ratings = this.recipe.ratings;
        var sum: number = 0;
        for (let rating of ratings) {
            sum += rating;
        }
        var avg = sum / ratings.length;
        this.unchange(this.round(avg, 0));
        console.log(this.round(avg, 0));
    }

    unchange(avg) {
        this.value = avg;
        this.starValue.nativeElement.value = avg;
        // console.log(this.starValue.nativeElement.value);

    }

    // https://gist.github.com/Bloggerschmidt/37d29cd2b58548b6020f65b5bb3e706e
    round(number, precision) {
        var factor = Math.pow(10, precision);
        var tempNumber = number * factor;
        var roundedTempNumber = Math.round(tempNumber);
        return roundedTempNumber / factor;
    };

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