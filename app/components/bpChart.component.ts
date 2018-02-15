import {Component, OnInit } from "@angular/core";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import {FirebaseUserService} from "../services/firebaseUser.service";


@Component({
    selector: "bp-chart",
    moduleId: module.id,
    templateUrl: "./bpChart.component.html"
})

export class BPChartComponent implements OnInit {

    private bpValues = new ObservableArray([
        { Name: 1, High: 30, Low: 12, Sales: 0, Margin: 0 },
        { Name: 2, High: 135, Low: 124, Sales: 0, Margin: 0 },
        { Name: 3, High: 50, Low: 29, Sales: 0, Margin: 0 },
        { Name: 4, High: 50, Low: 29, Sales: 0, Margin: 0 },
        { Name: 5, High: 50, Low: 29, Sales: 0, Margin: 0 },
        { Name: 6, High: 50, Low: 29, Sales: 0, Margin: 0 },
        { Name: 7, High: 50, Low: 29, Sales: 0, Margin: 0 },
    ]);

    constructor(private fbUser: FirebaseUserService) {
    }

    ngOnInit() {
        this.fbUser.user$.subscribe((userObj) => {
            let newObj = JSON.parse(JSON.stringify(userObj));
            if (newObj.bp_values) {
                console.log("new data");
                let newV = newObj.bp_values.map((item, index) => {
                    return {Time: item[2], High: parseInt(item[0]), Low: parseInt(item[1])};
                });
                this.bpValues = new ObservableArray([...newV]);

            }
        });
    }

    generate(time) {
        if (time === 1) {
            this.fbUser.generate1Month();
        } else if (time === 3) {
            this.fbUser.generate3Month();
        } else if (time === 2) {
            this.fbUser.generate2Weeks();
        } else {
            this.fbUser.generateAllData();
        }
    }

}
