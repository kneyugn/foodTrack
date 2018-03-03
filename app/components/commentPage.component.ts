import {Component, ViewChild, ElementRef} from "@angular/core";
import {FirebaseUserService} from "../services/firebaseUser.service";
@Component({
    selector: "comment-recipe",
    moduleId: module.id,
    templateUrl: "./commentPage.component.html",
    styleUrls: ['./commentPage.component.css'],
})

export class CommentingRecipeComponent {
    private name = "Angela England";
    private comment = "I love this recipe, I think this is a really really really amazing recipe!! Would love to see more recipes liek this one. love this recipe, I think this is a really really really amazing recipe!! Would love to see more recipes liek this one.";
    // comment

    constructor() {
    }



}