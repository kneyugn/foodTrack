import {Component} from "@angular/core";
import { TextField } from "ui/text-field";

@Component({
    selector: "recipes-list",
    moduleId: module.id,
    templateUrl: "./recipesList.component.html",
    styleUrls: ['./recipesList.component.css']
})

export class RecipesListComponent {

    private recipeLists: {title:string}[] = [{title:"Fine Dining"}, {title:"Quick Dishes"}];
    private listName: string = "";

    constructor() {
    }    

    addList(args: any) {
        let textField = <TextField>args.object;
        if(textField.text != "") {
            this.recipeLists.push({title:textField.text});
        }
        textField.text = "";
    }

    onTextChange(args) {
        let textField = <TextField>args.object;
        this.listName = textField.text;
    }

    saveResponse(args) {
        if(this.listName != "") {
            this.recipeLists.push({title:this.listName});
        }
    }
}