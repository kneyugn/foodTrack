import {Component, ViewChild, ElementRef} from "@angular/core";
import {FirebaseUserService} from "../services/firebaseUser.service";
import { Console } from "@angular/core/src/console";
import { TextView } from "ui/text-view";
@Component({
    selector: "comment-recipe",
    moduleId: module.id,
    templateUrl: "./commentPage.component.html",
    styleUrls: ['./commentPage.component.css'],
})

export class CommentingRecipeComponent {
    private backButton = "visible";
    private scButton = "collapsed";
    private usercomment: string = "";
    private name = "Angela England";
    private comment = "I love this recipe, I think this is a really really really amazing recipe!! Would love to see more recipes liek this one.";
    // comment

    constructor() {
        //  this.saveButton.nativeElement.visibility = "visible";
    }

    // click to show save/cancel buttons
    showButtons() {
        // this.backButton.visibility = "collapsed";
        this.backButton = "collapsed";
        this.scButton = "visible";
        // console.log("Hello, world!");
    }

    public onReturn(args) {
        let textField = <TextView>args.object;

        console.log("onReturn");
        this.usercomment = textField.text;
        textField.dismissSoftInput();
    }



}