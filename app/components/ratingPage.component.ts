import {Component} from "@angular/core";
import {FirebaseUserService} from "../services/firebaseUser.service";

@Component({
    selector: "rating-recipe",
    moduleId: module.id,
    templateUrl: "./ratingPage.component.html",
    styleUrls: ['./ratingPage.component.css'],
})

export class RatingRecipeComponent {
    private food_pic = '~/res/kk.jpg';

    constructor() {

    }
}