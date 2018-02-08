import {Component} from "@angular/core";

@Component({
    selector: "user-profile",
    moduleId: module.id,
    templateUrl: "./userProfile.component.html",
    styleUrls: ['./userProfile.component.css'],
})

export class UserProfileComponent {
    private usr_pic = '~/res/profilepic.jpg';
    private user = [];
    private conditions = [
        {text: "Hypertension / High Blood Pressure"},
        {text: "Diabetes"}
    ];

    private goals = [
        {text: "Max Sodium: 100"},
        {text: "Max Calories: 200"},
        {text: "Min Calories: 0"},
        {text: "Max Carbs: 0"},
        {text: "Min Carbs: 0"},
        {text: "Max Protein: 100"},
        {text: "Min Carbs: 200"},
    ];

    private userInfo = {
        age: 29,
        name: "Jane Doe",
        username: "JDHealthy"
    };

    constructor() {
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

}