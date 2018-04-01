import {Component, ViewChild, ElementRef} from "@angular/core";
import {FirebaseUserService} from "../services/firebaseUser.service";
import { Console } from "@angular/core/src/console";
import { TextView } from "ui/text-view";
import { TextField } from "ui/text-field";
import {FirebaseRecipeService} from "../services/firebaseRecipe.service"; 
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { RouterExtensions } from "nativescript-angular/router/router-extensions";
@Component({
    selector: "comment-recipe",
    moduleId: module.id,
    templateUrl: "./commentPage.component.html",
    styleUrls: ['./commentPage.component.css', "./css/icons.css"],
})

export class CommentingRecipeComponent implements OnInit {
    //initially, back button is visible and save/cancel buttons are collapsed until the user commented sth
    private backButton = "visible";
    private scButton = "collapsed";
    private deleteButton = "collapsed";

    public trash_can = String.fromCharCode(0xea0d);

    // user input- text view
    public tvtext = "";

    private usercomment: string = "";
    private name = "Angela England";
    private comment = "I love this recipe, I think this is a really really really amazing recipe!! Would love to see more recipes liek this one.";

    private recipe; 
    private food_pic;
    private user;
    private user_name:string;

    // private commentList = [];
    private commentList: {userID:string, comment:string, userName:string}[] = [];

    constructor(private recipeService: FirebaseRecipeService, private userService: FirebaseUserService, private routerExtensions: RouterExtensions) { 
        this.recipeService.recipe$.subscribe((detailedRecipe) => { 
            this.recipe = detailedRecipe;
        });
        this.userService.user$.subscribe((user) => {
            this.user_name = user.first;
        });
        this.user = userService.get_userID();
    } 

    ngOnInit() {
        
        if (this.recipe.comments == null) {
            this.recipe.comments = [];
        } else {
            this.commentList = this.recipe.comments;
        }
        this.displayPic();
    }

    displayPic() {
        this.food_pic = this.recipe.image;
    }

    // click to show save/cancel buttons
    showButtons() {
        // this.backButton.visibility = "collapsed";
        this.backButton = "collapsed";
        this.scButton = "visible";
        // console.log("Hello, world!");
    }
    // hide save/cancel buttons and show back button
    hideButtons() {
        this.backButton = "visible";
        this.scButton = "collapsed";
    }

    isUser(id) {
        if (id == this.user) {
            // console.log("true");
            return true;
        } else {
            // console.log("false");
            return false;
        }

    }

    public onReturn(args) {
        let textField = <TextField>args.object;

        this.usercomment = textField.text;
        textField.dismissSoftInput();
    }
    // TODO Xx 
    addComments() { 
        // console.log(this.tvtext);
        var commentObj = {userID: this.user, comment: this.tvtext, userName: this.user_name}; 
        this.commentList.push(commentObj);
        this.recipe.comments = this.commentList;
        this.recipeService.update_recipe(this.recipe.id, this.recipe);
        /** 
         *  add to this.recipes.comments 
         *  let updatedRecipes = Object.assign(this.recipes, {}) 
         *  this.recipeService.update_recipe(this.recipe.id, updatedRecipes) 
         */ 

    } 

    back(){
        this.routerExtensions.back();
    }
 
    // TODO Xx 
    removeComments(comment) { 
        this.commentList.forEach( (item, index) => {
            if(item === comment) this.commentList.splice(index,1);
          });
        this.recipe.comments = this.commentList;
        this.recipeService.update_recipe(this.recipe.id, this.recipe);
        /** 
         *  remove from this.recipes.comments 
         *  let updatedRecipes = Object.assign(this.recipes, {}) 
         *  this.recipeService.update_recipe(this.recipe.id, updatedRecipes) 
         */ 
    } 


}