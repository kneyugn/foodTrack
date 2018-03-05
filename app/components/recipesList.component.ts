import {Component} from "@angular/core";
import { TextField } from "ui/text-field";

@Component({
    selector: "recipes-list",
    moduleId: module.id,
    templateUrl: "./recipesList.component.html",
    styleUrls: ['./recipesList.component.css']
})

export class RecipesListComponent {

    private lists: string[] = [];

    constructor() {
    }    

    addList(args: any) {
        let textField = <TextField>args.object;
        this.lists.push(textField.text);
        textField.text = "";
    }
}