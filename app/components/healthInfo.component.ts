import {Component} from "@angular/core";
import { Slider } from 'ui/slider';

@Component({
    selector: "health-info",
    moduleId: module.id,
    templateUrl: "./healthInfo.component.html"
})
export class HealthInfoComponent {

    private minSodium = 500;
    private maxSodium = 1500;
    private minCalories = 1800;
    private maxCalories = 2500;
    private minCarbs = 150;
    private maxCarbs = 400;
    private minProtein = 230;
    private maxProtein = 690;

    constructor() {
    }

    save() {
        this.minCalories = this.maxCalories - this.minCalories;
        this.minSodium = this.maxSodium - this.minCalories;
        this.minProtein = this.maxProtein - this.minCalories;
        this.minCarbs = this.maxCarbs - this.minCarbs;

        // push info to firebase
    }
}
