import { Component } from "@angular/core";

@Component({
    selector: "icon-test",
    moduleId: module.id,
    templateUrl: "./icon_test.component.html",
    styleUrls: ["./css/icons.css"]
    // Change icons.css for right size
})

export class BPChartComponent {
    // font/Reference.html has the character encoding for icons
    // pass in Line 12 to Line 2 in icon_test.html label to set the icon text
    public icon_id = String.fromCharCode(0xe903);
    constructor() {
    }
}
