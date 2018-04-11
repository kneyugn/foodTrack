import {Component} from "@angular/core";
import { TextField } from "ui/text-field";
import {SpoonacularService} from "../services/spoonacular.service";
import {RouterExtensions} from "nativescript-angular";

@Component({
    selector: "recipe-form",
    moduleId: module.id,
    templateUrl: "./recipesGenerateForm.component.html",
    styleUrls: ["./recipesGenerateForm.component.css"],
})
export class RecipesGenerateFormComponent {

    private ingredients: string[] = [];
    private listName: string = "";
    private inputBox: any = null;

    constructor(private spoonacular: SpoonacularService, private routerExtensions: RouterExtensions) {
        this.spoonacular.recipes$.subscribe((data) => {
            // console.log(data);
            this.routerExtensions.navigate(["/recipesResults"]);
        });
    }

    onTextChange(args) {
        let textField = <TextField>args.object;
        this.listName = textField.text;
        this.inputBox = textField;
    }

    saveResponse() {
        if(this.listName != "") {
            this.ingredients.push(this.listName);
            this.inputBox.text = "";
        }
    }

    removeIngr(i: number) {
        this.ingredients.splice(i, 1);
    }

    getRecipesByIngredients() {
        let maxRecipes = '10';
        let limitLicense = 'false';
        let ranking = '1';
        let fillIngredients = 'true';
        let ingredients = this.ingredients.toString();
        var clientParams = `fillIngredients=${fillIngredients}&ingredients=${ingredients}&limitLicense=${limitLicense}&number=${maxRecipes}&ranking=${ranking}`;
        this.spoonacular.getRecipesByIngredients(clientParams);
    }
}