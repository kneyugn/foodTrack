import { Component, ViewChild, ElementRef } from "@angular/core";
import { FirebaseUserService } from "../services/firebaseUser.service";
import { prompt, PromptResult, inputType } from "ui/dialogs";
import { ObservableArray } from "tns-core-modules/data/observable-array"

@Component({
    selector: "custom-recipe",
    moduleId: module.id,
    templateUrl: "./customRecipe.component.html",
    styleUrls: ['./css/customRecipe.css', './css/icons.css'],
})

export class CustomRecipeComponent {
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
            this.recipe.splice(0, 1);
            this.recipe.unshift({ title: "Ingredients", items:this.ingredients });
            this.accord.nativeElement.selectedIndex = 0;

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
        });
    }

    addIngredient() {
        console.log("Add Ingredient Complete");
    }

    addTag() {
        console.log("Add Tag Complete");
    }

    addDirection() {
        console.log("Direction Tag Complete");
    }
}