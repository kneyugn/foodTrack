import {Component} from "@angular/core";
import {FirebaseUserService} from "../services/firebaseUser.service";

@Component({
    selector: "user-profile",
    moduleId: module.id,
    templateUrl: "./userProfile.component.html",
    styleUrls: ['./userProfile.component.css', './css/icons.css'],
})

export class UserProfileComponent {
    private user = [];
    public icons = {};

    private updateBPBool = false;

    // TODO - Delete These
    // private mockFbConditions = [
    //     "Hypertension / High Blood Pressure",
    //     "Diabetes"
    // ];
    // private mockFBGoals = [
    //     "Max Sodium: 100",
    //     "Max Calories: 200",
    //     "Min Calories: 0",
    //     "Max Carbs: 0",
    //     "Min Carbs: 0",
    //     "Max Protein: 100",
    //     "Min Carbs: 200",
    // ];

    private conditions = [{text: "Edit", link: "/medicalHistory"}];
    private goals = [{text: "Edit", link: "/healthInfo"}];
    private userInfo = {
        name: "Jane Doe",
        username: "JDHealthy"
    };
    private bpScores = null;

    ngOnInit() {
    }

    constructor(private fbUser: FirebaseUserService) {
        this.fbUser.user$.subscribe((userObj) => {
            if (userObj && userObj.medical_history) {
                this.conditions = [{ text: "Edit", link: "/medicalHistory" }];
                userObj.medical_history.forEach((item) => {
                    this.conditions.unshift({text: item, link: ""});
                });
            }
            if (userObj && userObj.health_goals) {
                this.goals.unshift({text: "Maximum Protein: " + userObj.health_goals.minProtein + " grams", link: ""});
                this.goals.unshift({text: "Minimum Protein: " + userObj.health_goals.maxProtein + " grams", link: ""});
                this.goals.unshift({text: "Maximum Carbs: " + userObj.health_goals.minCarbs + " grams", link: ""});
                this.goals.unshift({text: "Minimum Carbs: " + userObj.health_goals.maxCarbs + " grams", link: ""});
                this.goals.unshift({text: "Maximum Calories: " + userObj.health_goals.minCalories, link: ""});
                this.goals.unshift({text: "Minimum Calories: " + userObj.health_goals.maxCalories, link: ""});
                this.goals.unshift({text: "Maximum Sodium: " + userObj.health_goals.minSodium + " milligram", link: ""});
                this.goals.unshift({text: "Minimum Sodium: " + userObj.health_goals.maxSodium + " milligram", link: ""});
            }

            if (userObj && userObj.bp_values) {
                this.bpScores = userObj.bp_values;
            }

        });

        this.icons = {
            chart: String.fromCharCode(0xe99d)
        };

        this.user = [
            {
                title: "My Medical History",
                items: this.conditions,
            },
            {
                title: "My Medical Goals",
                items: this.goals,
            }
        ];
    }

    ngOnInit() {

    }
}