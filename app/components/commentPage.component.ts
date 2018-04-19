import {Component, ViewChild, ElementRef} from "@angular/core";
import {FirebaseUserService} from "../services/firebaseUser.service";
import { Console } from "@angular/core/src/console";
import { TextView } from "ui/text-view";
import { TextField } from "ui/text-field";
import {FirebaseRecipeService} from "../services/firebaseRecipe.service"; 
import { OnInit } from "@angular/core/src/metadata/lifecycle_hooks";
import { RouterExtensions } from "nativescript-angular/router/router-extensions";
import { Observable } from "tns-core-modules/ui/page/page";
@Component({
    selector: "comment-recipe",
    moduleId: module.id,
    templateUrl: "./commentPage.component.html",
    styleUrls: ['./commentPage.component.css', "./css/icons.css"],
})

export class CommentingRecipeComponent implements OnInit {
    private backButton = "visible";
    private scButton = "collapsed";
    private deleteButton = "collapsed";

    public trash_can = String.fromCharCode(0xea0d);

    public tvtext = "";

    private usercomment: string = "";
    private name = "Angela England";
    private comment = "I love this recipe, I think this is a really really really amazing recipe!! Would love to see more recipes liek this one.";

    private recipe; 
    private food_pic;
    private user;
    private user_name:string;
    public usr_pic_url = new Observable();

    private commentList: {userID:string, comment:string, userName:string}[] = [];

    constructor(private recipeService: FirebaseRecipeService, private userService: FirebaseUserService, private routerExtensions: RouterExtensions, private fbUser: FirebaseUserService) { 
        this.recipeService.recipe$.subscribe((detailedRecipe) => { 
            this.recipe = detailedRecipe;
        });
        this.userService.user$.subscribe((user) => {
            this.user_name = user.first;
        });
        this.user = userService.get_userID();
    } 

    ngOnInit() {
        this.fbUser.user$.subscribe((userObj) => {
            if (userObj) {
                this.usr_pic_url.set("src", userObj.profile_pic);
            }
        });
        
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

    showButtons() {
        this.backButton = "collapsed";
        this.scButton = "visible";
    }

    hideButtons() {
        this.backButton = "visible";
        this.scButton = "collapsed";
    }

    isUser(id) {
        if (id == this.user) {
            return true;
        } else {
            return false;
        }

    }

    public onReturn(args) {
        let textField = <TextField>args.object;

        this.usercomment = textField.text;
        textField.dismissSoftInput();
    }

    addComments() {
        var commentObj = {userID: this.user, comment: this.tvtext, userName: this.user_name}; 
        this.commentList.push(commentObj);
        this.recipe.comments = this.commentList;
        this.recipeService.update_recipe(this.recipe.id, this.recipe);
    } 

    back(){
        this.routerExtensions.back();
    }

    removeComments(comment) { 
        this.commentList.forEach( (item, index) => {
            if(item === comment) this.commentList.splice(index,1);
          });
        this.recipe.comments = this.commentList;
        this.recipeService.update_recipe(this.recipe.id, this.recipe);
    } 


}