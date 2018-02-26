import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FirebaseUserService } from "../services/firebaseUser.service";

@Component({
    selector: "custom-recipe",
    moduleId: module.id,
    templateUrl: "./customRecipe.component.html",
    styleUrls: ['./css/customRecipe.css', './css/icons.css'],
})

export class CustomRecipeComponent implements OnInit {
    private recipe = [];

    public edit_icon = String.fromCharCode(0xe905);
    public dropdown_icon = String.fromCharCode(0xea43);

    @ViewChild("field") field: ElementRef;

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

    textFieldFocus() {
        console.log("Focused");
        this.field.nativeElement.focus();
    }

    addHealthTag() {
        alert("Adding Health Tag");
    }

    ngOnInit() {
        console.log(this.recipe);
    }
}