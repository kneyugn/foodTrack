import {Component} from "@angular/core";
import {EventData} from "tns-core-modules/data/observable";
import {SpoonacularService} from "../services/spoonacular.service";
import {SearchBar} from "tns-core-modules/ui/search-bar";
import {RouterExtensions} from "nativescript-angular";

@Component({
    selector: "user-profile",
    moduleId: module.id,
    templateUrl: "./userProfile.component.html",
    styleUrls: ['./userProfile.component.css']
})
export class UserProfileComponent {
    // although there is only one pic for now. i still make this a list
    // so later on the user may save multiple pictures
    private usr_pic = [
        {image: '~/res/usr_image.jpg'}];

    constructor() {
        
    }

    
}