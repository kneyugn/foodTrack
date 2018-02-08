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

    public glyphs = new Array<{ icon: string, code: string }>();

    constructor() {
        for (let charCode = 0xe903; charCode <= 0xeaea; charCode++) {
            let glyph = {
                icon: String.fromCharCode(charCode),
                code: charCode.toString(16)
            };
            this.glyphs.push(glyph);
        }

        this.user = [
            {
                title: "My Medical History",
                items: this.conditions,
            },
            {
                title: "My Medical Goals",
                items: this.conditions,
            }
        ]
    }

}