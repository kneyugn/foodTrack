import {Component, OnInit} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";

@Component({
    selector: "user-profile",
    moduleId: module.id,
    templateUrl: "./userProfile.component.html",
    styleUrls: ['./userProfile.component.css', './css/icons.css'],
})

export class UserProfileComponent implements OnInit {
    private usr_pic = '~/res/profilepic.jpg';
    private user = [];

    private mockFbConditions = [
        "Hypertension / High Blood Pressure",
        "Diabetes"
    ];
    private mockFBGoals = [
        "Max Sodium: 100",
        "Max Calories: 200",
        "Min Calories: 0",
        "Max Carbs: 0",
        "Min Carbs: 0",
        "Max Protein: 100",
        "Min Carbs: 200",
    ];

    private conditions = [{text: "Edit", link: "/medicalHistory"}];
    private goals = [{text: "Edit", link: "/healthInfo"}];
    private userInfo = {
        age: 29,
        name: "Jane Doe",
        username: "JDHealthy"
    };

    private icons;

    constructor(private routerExtensions: RouterExtensions) {
        this.mockFbConditions.forEach((item) => {
            this.conditions.unshift({text: item, link: ""});
        });
        this.mockFBGoals.forEach((item) => {
            this.goals.unshift({text: item, ink: ""});
        });

        this.user = [
            {
                title: "My Medical History",
                items: this.conditions,
            },
            {
                title: "My Medical Goals",
                items: this.goals,
            }
        ]
    }

    ngOnInit() {
        this.icons = {
            chart: String.fromCharCode(0xe903)
        };
    }

    // navigateTo(routeStr) {
    //     this.routerExtensions.navigate([routeStr]);
    // }

}