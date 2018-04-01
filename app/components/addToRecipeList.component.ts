import { Component } from "@angular/core";
import {FirebaseRecipeService} from "../services/firebaseRecipe.service";
import {RouterExtensions} from "nativescript-angular";
import {FirebaseUserService} from "../services/firebaseUser.service";

@Component({
    selector: "add-to-recipe-list",
    moduleId: module.id,
    templateUrl: "./addToRecipeList.component.html",
    styleUrls: ['./addToRecipeList.component.css', './css/icons.css'],
})

export class AddToRecipeListComponent {
    private recipesList = null;
    private currentUser: any;
    private recipeID: number;
    public icons = {};

    constructor(private userService: FirebaseUserService, private recipeService: FirebaseRecipeService, private routerExtensions: RouterExtensions) {
        this.userService.user$.subscribe((result) => {
            this.recipesList = [];
            this.currentUser = result;
            this.currentUser.recipe_list.forEach((item) => {
                this.recipesList.push(item);
            })
        });
        this.recipeService.recipe$.subscribe((detailedRecipe) => {
            this.recipeID = detailedRecipe.id;
        })
        this.icons = {
            check: String.fromCharCode(0xea10)
        };
    }

    public onItemTap(args) {
        console.log("------------------------ ItemTapped: " + args.index);
    }

    isInList(arr) {
        if (!arr || arr === null || arr.length <= 0) {
            return false;
        }
        return arr.filter((data) => { return data === this.recipeID}).length > 0;
    }

    addItem(index: number) {
        if (this.recipesList[index].recipes.filter((data) => data === this.recipeID).length <= 0) {
            this.recipesList[index].recipes.push(this.recipeID);
        } else {
            this.recipesList[index].recipes = this.recipesList[index].recipes.filter((data) => data !== this.recipeID);
        }
        this.userService.update_user_V2(Object.assign(this.currentUser, {recipe_list: this.recipesList}));
        // this.routerExtensions.navigate(["/recipeDetails"]);
    }
}