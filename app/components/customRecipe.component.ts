import { Component, ViewChild, ElementRef, ChangeDetectorRef, OnInit } from "@angular/core";
import { FirebaseRecipeService } from "../services/firebaseRecipe.service";
import { prompt, PromptResult, inputType } from "ui/dialogs";
import { ObservableArray } from "tns-core-modules/data/observable-array"
import { TextField } from "ui/text-field";
import { FirebaseUserService } from "../services/firebaseUser.service";
import * as imagepicker from "nativescript-imagepicker";
import { Observable } from "tns-core-modules/ui/page/page";
const firebase = require("nativescript-plugin-firebase");
var fs = require("file-system");
import * as dialogs from "ui/dialogs";

@Component({
    selector: "custom-recipe",
    moduleId: module.id,
    templateUrl: "./customRecipe.component.html",
    styleUrls: ['./css/customRecipe.css', './css/icons.css'],
})

export class CustomRecipeComponent implements OnInit{

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
    @ViewChild("name") recipe_name: ElementRef;


    private directions = [{ title: "Direction",  text: "Add Direction" }]; 
    private ingredients = [{ title: "Ingredient", text: "Add Ingredient"}]; 
    private health_tag = [{ title: "Tag", text: "Add Health Tag"}];

    private curr_ingredient = "";
    private curr_direction = "";
    private curr_tag = "";
    public img_src = new Observable();
    @ViewChild('picture') picture: ElementRef;

    constructor(private fbRecipe: FirebaseRecipeService, private fbUser: FirebaseUserService, private _changeDetectionRef: ChangeDetectorRef) {       
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
                title: "Tag",
                items: this.health_tag,
            }
        ]);
        this.img_src.set("src", "~/res/image_placeholder.png");
    }

    ngOnInit() {
        this.picture.nativeElement.backgroundPosition = "center";
        this.picture.nativeElement.backgroundRepeat = "no-repeat";
        this.picture.nativeElement.backgroundImage = this.img_src["src"];
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

    // displayIngredient() {
    //     let options = {
    //         title: "Enter in Ingredient",
    //         defaultText: "Here",
    //         inputType: inputType.text,
    //         okButtonText: "Submit",
    //         cancelButtonText: "Cancel"
    //     };

    //     prompt(options).then((result: PromptResult) => {
    //         this.ingredients[0].text = result.text;
    //         this.updateRecipe({title: "Ingredient", items: this.ingredients}, 0);
    //         this.ing_field.nativeElement.text = result.text;
    //         this.curr_ingredient = result.text;
    //     });
    // }

    updateIngredient(args) {
        let textField = <TextField>args.object;

        // this.ingredients[0].text = textField.text;
        // this.updateRecipe({title: "Ingredient", items: this.ingredients}, 0);
        // this.ing_field.nativeElement.text = textField.text;
        this.curr_ingredient = textField.text;
    }

    // displayDirection() {
    //     let options = {
    //         title: "Enter in Direction",
    //         defaultText: "Here",
    //         inputType: inputType.text,
    //         okButtonText: "Submit",
    //         cancelButtonText: "Cancel"
    //     };

    //     prompt(options).then((result: PromptResult) => {
    //         this.directions[0].text = result.text;
    //         var ingre = this.recipe.shift();
    //         this.recipe.splice(0, 1);
    //         this.recipe.unshift({ title: "Directions", items: this.directions });
    //         this.recipe.unshift(ingre);
    //         this.accord.nativeElement.selectedIndex = 1;
    //         this.dir_field.nativeElement.text = result.text;
    //     });
    // }

    updateDirection(args) {
        let textField = <TextField>args.object;

        // this.directions[0].text = textField.text;
        // var ingre = this.recipe.shift();
        // this.recipe.splice(0, 1);
        // this.recipe.unshift({ title: "Directions", items: this.directions });
        // this.recipe.unshift(ingre);
        // this.accord.nativeElement.selectedIndex = 1;
        // this.dir_field.nativeElement.text = textField.text;

        this.curr_direction = textField.text;
    }

    // displayTag() {
    //     let options = {
    //         title: "Enter in Health Tag",
    //         defaultText: "Here",
    //         inputType: inputType.text,
    //         okButtonText: "Submit",
    //         cancelButtonText: "Cancel"
    //     };

    //     prompt(options).then((result: PromptResult) => {
    //         this.health_tag[0].text = result.text;
    //         this.recipe.reverse();
    //         this.recipe.splice(0, 1);
    //         this.recipe.unshift({ title: "Health Tag", items: this.health_tag });
    //         this.recipe.reverse();
    //         this.accord.nativeElement.selectedIndex = 2;
    //         this.tag_field.nativeElement.text = result.text;
    //     });
    // }

    updateTag(args) {
        let textField = <TextField>args.object;

        // this.health_tag[0].text = result.text;
        // this.recipe.reverse();
        // this.recipe.splice(0, 1);
        // this.recipe.unshift({ title: "Health Tag", items: this.health_tag });
        // this.recipe.reverse();
        // this.accord.nativeElement.selectedIndex = 2;
        // this.tag_field.nativeElement.text = result.text;

        this.curr_tag = textField.text;
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
            // this.recipe.reverse();
            this.recipe.splice(0, 1);
            this.recipe.unshift(data);
            // this.recipe.reverse();
            
            // var ingre = this.recipe.shift();
            // var dir = this.recipe.shift();
            // this.recipe.splice(0, 1);
            // this.recipe.unshift(data);
            // this.recipe.unshift(dir);
            // this.recipe.unshift(ingre);
        }
        this.accord.nativeElement.selectedIndex = index;
    }

    addIngredient() {
        this.ingredients.push({ title: "Ingredient-item", text: this.curr_ingredient});
        this.updateRecipe({ title: "Ingredient", items: this.ingredients }, 0);
        this.curr_ingredient = "";
    }

    addTag() {
        // this.accord.nativeElement.selectedIndex = 2;
        this.health_tag.push({ title: "Tag-item", text: this.curr_tag});
        this.updateRecipe({ title: "Tag", items: this.curr_tag}, 2);
        this.curr_tag = "";
    }

    addDirection() {
        // this.accord.nativeElement.selectedIndex = 1;
        this.directions.push({ title: "Direction-item", text: this.curr_direction});
        this.updateRecipe({ title: "Direction", items: this.directions}, 1);
        this.curr_direction = ""
    }

    getImage() {
        let _that = this;
        let context = imagepicker.create({
            mode: "single"
        });
        context.authorize().then(function () {
                return context.present();
            }).then(function (selection) {
                _that.img_src.set("src", selection[0]["_android"]);
                _that.picture.nativeElement.backgroundImage = selection[0]["_android"];
            }).catch(function (e) {
                // process error
            });
    }

    async save() {
        var tags = []; var dir = []; var ing = [];
        let _that = this;
        let firebase_recipe = this.fbRecipe;
        this.health_tag.forEach(element => {
            if (element.title == "Tag-item") {
                tags.push(element.text);
            }
        });
        this.ingredients.forEach(element => {
            if (element.title == "Ingredient-item") {
                ing.push(element.text);
            }
        });
        this.directions.forEach(element => {
            if (element.title == "Direction-item") {
                dir.push(element.text);
            }
        });
        var recipeName = this.recipe_name.nativeElement.text;
        firebase.uploadFile({
            remoteFullPath: recipeName + '.jpg', // Using name of recipe as image name(unique)
            localFile: fs.File.fromPath(this.img_src["src"]),
        }).then(
            function (uploadedFile) {
                _that.uploadRecipeImage(recipeName, tags, ing, dir);
                // Clear every field
                _that.clear();
                // Info dialog box shows recipe is saved
                dialogs.alert({
                    title: "Recipe Confirmation",
                    message: "Your Custom Recipe has been saved",
                    okButtonText: "OK"
                }).then(() => {
                    console.log("Dialog closed!");
                });

            },
            function (error) {
                console.log("File upload error: " + error);
            }
        );
    }

    uploadRecipeImage(recipeName, tags, dir, ing) {
        let _that = this;
        firebase.getDownloadUrl({
            remoteFullPath: recipeName + '.jpg'
        }).then(
            function (url) {
                console.log("Remote URL: " + url);
                _that.fbRecipe.push_custom_recipe(recipeName, tags, dir, ing, url, _that.fbUser.get_userID());
            },
            function (error) {
                console.log("Error: " + error);
                _that.fbRecipe.push_custom_recipe(recipeName, tags, dir, ing, "~/res/image_placeholder.png", _that.fbUser.get_userID());
            }
        );
    }

    clear() {
        this.directions = [{ title: "Direction", text: "Add Direction" }];
        this.ingredients = [{ title: "Ingredient", text: "Add Ingredient" }];
        this.health_tag = [{ title: "Tag", text: "Add Health Tag" }];
        this.recipe_name.nativeElement.text = "";
    }
}