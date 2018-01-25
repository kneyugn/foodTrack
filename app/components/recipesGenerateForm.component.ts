import {Component} from "@angular/core";
import { TextField } from "ui/text-field";

@Component({
    selector: "recipe-form",
    moduleId: module.id,
    templateUrl: "./recipesGenerateForm.component.html",
    styleUrls: ["./recipesGenerateForm.component.css"],
})
export class RecipesGenerateFormComponent {

    private ingredients: string[] = [];

    constructor() {
    }

    addRecipes(args: any) {
        let textField = <TextField>args.object;
        this.ingredients.push(textField.text);
        textField.text = "";
    }

    removeIngr(i: number) {
        this.ingredients.splice(i, 1);
    }
}