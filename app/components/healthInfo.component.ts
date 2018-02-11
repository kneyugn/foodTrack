import {Component} from "@angular/core";
import { Slider } from 'ui/slider';
import {FirebaseUserService} from "../services/firebaseUser.service";

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

    constructor(private fbUser: FirebaseUserService) {
    }

    save() {
        this.minCalories = this.maxCalories - this.minCalories;
        this.minSodium = this.maxSodium - this.minSodium;
        this.minProtein = this.maxProtein - this.minProtein;
        this.minCarbs = this.maxCarbs - this.minCarbs;
        this.fbUser.update_user(
            {health_goals: {minCalories: this.minCalories,
                maxCalories: this.maxCalories,
                minSodium: this.minSodium,
                maxSodium: this.maxSodium,
                minProtein: this.minProtein,
                maxProtein: this.maxProtein,
                minCarbs: this.minCarbs,
                maxCarbs: this.maxCarbs}});
    }
}
