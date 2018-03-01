import { Component } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";
registerElement("FilterableListpicker", () => require("nativescript-filterable-listpicker").FilterableListpicker);
registerElement('StarRating', () => require('nativescript-star-ratings').StarRating);

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent {
    constructor() {
    }

}
