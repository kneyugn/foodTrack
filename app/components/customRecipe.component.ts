import { Component, ViewChild, ElementRef } from "@angular/core";
import { FirebaseUserService } from "../services/firebaseUser.service";
import { prompt, PromptResult, inputType } from "ui/dialogs";
import { ObservableArray } from "tns-core-modules/data/observable-array"
import { TextField } from "ui/text-field";

@Component({
    selector: "custom-recipe",
    moduleId: module.id,
    templateUrl: "./customRecipe.component.html",
    styleUrls: ['./css/customRecipe.css', './css/icons.css'],
})

export class CustomRecipeComponent {

    private ingredInput: string = "Enter Ingredients";
    private healthTagInput: string = "Enter Health Tags";
    private directionInput: string = "Enter Directions";


    private recipe: ObservableArray<{}>;

    public edit_icon = String.fromCharCode(0xe905);
    public dropdown_icon = String.fromCharCode(0xea43);

    @ViewChild("ingField") ing_field: ElementRef;
    @ViewChild("dirField") dir_field: ElementRef;
    @ViewChild("tagField") tag_field: ElementRef;
    @ViewChild("accord") accord: ElementRef;

    private directions = [{ title: "Direction",  text: "Add Direction" }]; 
    private ingredients = [{ title: "Ingredient", text: "Enter ingredient here"}]; 
    private health_tag = [{ title: "Tag", text: "Add Health Tag"}];

    private curr_ingredient = "";

    constructor(private fbUser: FirebaseUserService) {
        this.fbUser.user$.subscribe((userObj) => {
            console.log("subsribe");
        });
        this.recipe = new ObservableArray([
            {
                title: "Ingredients",
                items: this.ingredients,
            },
            {
                title: "Directions",
                items: this.directions,
            },
            {
                title: "Health Tag",
                items: this.health_tag,
            }
        ]);
    }

    onSaveIngredients(args) {
        let textField = <TextField>args.object;
        this.ingredInput = textField.text;
    }

    onSaveDirections(args) {
        let textField = <TextField>args.object;
        this.directionInput = textField.text;
    }

    onSaveHealthTags(args) {
        let textField = <TextField>args.object;
        this.healthTagInput = textField.text;
    }


    displayIngredient() {
        let options = {
            title: "Enter in Ingredient",
            defaultText: "Here",
            inputType: inputType.text,
            okButtonText: "Submit",
            cancelButtonText: "Cancel"
        };

        prompt(options).then((result: PromptResult) => {
            this.ingredients[0].text = result.text;
            this.updateRecipe({title: "Ingredient", items: this.ingredients}, 0);
            this.ing_field.nativeElement.text = result.text;
            this.curr_ingredient = result.text;
        });
    }

    displayDirection() {
        let options = {
            title: "Enter in Direction",
            defaultText: "Here",
            inputType: inputType.text,
            okButtonText: "Submit",
            cancelButtonText: "Cancel"
        };

        prompt(options).then((result: PromptResult) => {
            this.directions[0].text = result.text;
            var ingre = this.recipe.shift();
            this.recipe.splice(0, 1);
            this.recipe.unshift({ title: "Directions", items: this.directions });
            this.recipe.unshift(ingre);
            this.accord.nativeElement.selectedIndex = 1;
            this.dir_field.nativeElement.text = result.text;
        });
    }

    displayTag() {
        let options = {
            title: "Enter in Health Tag",
            defaultText: "Here",
            inputType: inputType.text,
            okButtonText: "Submit",
            cancelButtonText: "Cancel"
        };

        prompt(options).then((result: PromptResult) => {
            this.health_tag[0].text = result.text;
            this.recipe.reverse();
            this.recipe.splice(0, 1);
            this.recipe.unshift({ title: "Health Tag", items: this.health_tag });
            this.recipe.reverse();
            this.accord.nativeElement.selectedIndex = 2;
            this.tag_field.nativeElement.text = result.text;
        });
    }

    updateRecipe(data, index) {
        if (index == 0) {
            this.recipe.splice(0, 1);
            this.recipe.unshift(data);
        } else if (index == 1) {
            var ingre = this.recipe.shift();
            this.recipe.splice(0, 1);
            this.recipe.unshift(data);
            this.recipe.unshift(ingre);
        } else {
            this.recipe.reverse();
            this.recipe.splice(0, 1);
            this.recipe.unshift(data);
            this.recipe.reverse();
        }
        this.accord.nativeElement.selectedIndex = index;
    }

    addIngredient() {
        this.ingredients.push({ title: "Ingredient-item", text: this.curr_ingredient});
        this.updateRecipe({ title: "Ingredient", items: this.ingredients }, 0);
    }

    addTag() {
        this.accord.nativeElement.selectedIndex = 2;
        this.health_tag.push({ title: "Tag-item", text: this.tag_field.nativeElement.text});
        this.updateRecipe({ title: "Health Tag", items: this.health_tag}, 2);
    }

    addDirection() {
        this.accord.nativeElement.selectedIndex = 1;
        this.directions.push({ title: "Direction-item", text: this.dir_field.nativeElement.text});
        this.updateRecipe({ title: "Direction", items: this.directions}, 1);
    }
}