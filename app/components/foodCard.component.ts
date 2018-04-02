import {Component} from "@angular/core";
import {FirebaseUserService} from "../services/firebaseUser.service";

@Component({
    selector: "food-card",
    moduleId: module.id,
    templateUrl: "./foodCard.component.html",
    styleUrls: ['./foodCard.component.css'],
})

export class FoodCardComponent {
    private food_pic = '';
    constructor() {
    }
}