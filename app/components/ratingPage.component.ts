import {Component, ViewChild, ElementRef} from "@angular/core";
import {FirebaseUserService} from "../services/firebaseUser.service";

@Component({
    selector: "rating-recipe",
    moduleId: module.id,
    templateUrl: "./ratingPage.component.html",
    styleUrls: ['./ratingPage.component.css'],
})

export class RatingRecipeComponent {
    private food_pic = '~/res/kk.jpg';
    //changes how many levels
    //doesn't change star number though
    private max = 5;
    private value = 1;
    @ViewChild('starValue') starValue: ElementRef;

    constructor() {

    }
    //this is just a method showing that we can keep track of rating value to upload to db
    tap() {
        //this.list_picker.nativeElement.show();
        //this.stack.nativeElement.visibility = "collapsed";
        // console.log(this.starValue.nativeElement.value);
        // // console.log(this.value);
        // console.log("hahahha");
    }


}