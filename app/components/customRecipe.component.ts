import { Component, ViewChild, ElementRef } from "@angular/core";
import { FirebaseUserService } from "../services/firebaseUser.service";
import { prompt, PromptResult, inputType } from "ui/dialogs";

@Component({
    selector: "custom-recipe",
    moduleId: module.id,
    templateUrl: "./customRecipe.component.html",
    styleUrls: ['./css/customRecipe.css', './css/icons.css'],
})

export class CustomRecipeComponent {
    private recipe = [];

    public edit_icon = String.fromCharCode(0xe905);
    public dropdown_icon = String.fromCharCode(0xea43);

    @ViewChild("ingField") ing_field: ElementRef;
    @ViewChild("dirField") dir_field: ElementRef;
    @ViewChild("tagField") tag_field: ElementRef;


    private directions = [{ text: "Add Direction" }]; 
    private ingredients = [{ text: "Enter ingredient here"}]; 
    private health_tag = [{text: "Add Health Tag"}];

    constructor(private fbUser: FirebaseUserService) {
        this.fbUser.user$.subscribe((userObj) => {
            console.log("subsribe");
        });
        this.recipe = [
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
        ];
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
            console.log("Adding, " + result.text);
            
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
            console.log("Adding, " + result.text);

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
            console.log("Adding, " + result.text);

        });
    }

}