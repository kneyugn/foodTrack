import {Component} from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array";


@Component({
    selector: "bp-chart",
    moduleId: module.id,
    templateUrl: "./bpChart.component.html"
})

export class BPChartComponent {

    private bpValues = new ObservableArray([
        { Name: 1, High: 30, Low: 12, Sales: 0, Margin: 0 },
        { Name: 2, High: 135, Low: 124, Sales: 0, Margin: 0 },
        { Name: 3, High: 50, Low: 29, Sales: 0, Margin: 0 },
        { Name: 4, High: 50, Low: 29, Sales: 0, Margin: 0 },
        { Name: 5, High: 50, Low: 29, Sales: 0, Margin: 0 },
        { Name: 6, High: 50, Low: 29, Sales: 0, Margin: 0 },
        { Name: 7, High: 50, Low: 29, Sales: 0, Margin: 0 },
    ]);

    constructor() {
    }
}
