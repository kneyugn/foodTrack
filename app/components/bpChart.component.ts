import {Component, OnInit } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import {FirebaseUserService} from "../services/firebaseUser.service";


@Component({
    selector: "bp-chart",
    moduleId: module.id,
    templateUrl: "./bpChart.component.html"
})

export class BPChartComponent implements OnInit {
    private showBar = true;

    private bpValues = new ObservableArray([
        { Name: 1, High: 30, Low: 12, Sales: 0, Margin: 0 },
        { Name: 2, High: 135, Low: 124, Sales: 0, Margin: 0 },
        { Name: 3, High: 50, Low: 29, Sales: 0, Margin: 0 },
        { Name: 4, High: 50, Low: 29, Sales: 0, Margin: 0 },
        { Name: 5, High: 50, Low: 29, Sales: 0, Margin: 0 },
        { Name: 6, High: 50, Low: 29, Sales: 0, Margin: 0 },
        { Name: 7, High: 50, Low: 29, Sales: 0, Margin: 0 },
    ]);

    private BPCopy = [];

    constructor(private fbUser: FirebaseUserService) {
    }

    ngOnInit() {
        this.fbUser.user$.subscribe((userObj) => {
            let newObj = JSON.parse(JSON.stringify(userObj));
            if (newObj.bp_values) {
                let newV = newObj.bp_values.map((item, index) => {
                    return {Time: new Date(item[2]), High: parseInt(item[0]), Low: parseInt(item[1])};
                });
                this.BPCopy = newV;
                this.bpValues = new ObservableArray(this.BPCopy.slice(newV.length - (7)));

            }
        });
    }

    generate(time) {
        if (time === 1) {
            this.showBar = false;
            this.bpValues = new ObservableArray(this.BPCopy.slice(this.BPCopy.length - 30));
        } else if (time === 3) {
            this.showBar = false;
            this.bpValues = new ObservableArray(this.BPCopy.slice(this.BPCopy.length - (30 * 3)));
        } else if (time === 2) {
            this.showBar = true;
            this.bpValues = new ObservableArray(this.BPCopy.slice(this.BPCopy.length - (7)));
        } else {
            this.showBar = false;
            this.bpValues = new ObservableArray([...this.BPCopy]);
        }
    }

}
