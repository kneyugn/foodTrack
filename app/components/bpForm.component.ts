import { Component, ViewChild, ElementRef, OnInit} from "@angular/core";
import {RouterExtensions} from "nativescript-angular";
import { TextView } from "ui/text-view";
import { TextField } from "ui/text-field";
import { ScrollView } from "ui/scroll-view";
import { StackLayout } from "ui/layouts/stack-layout";
import { isAndroid } from "platform";
import {FirebaseUserService} from "../services/firebaseUser.service";

@Component({
    selector: "bp-form",
    moduleId: module.id,
    templateUrl: "./bpForm.component.html",
    styleUrls: ['./css/bpForm.css']
})
export class BPFormComponent {
    private usr_pic = '~/res/profilepic.jpg';
    private systolic = null;
    private diastolic = null;
    private message = null;
    private systolicStatus = null;
    private diastolicStatus = null;
    private bpValues = [];

    @ViewChild('scroller') scroll_view: ElementRef;
    @ViewChild('input') text_field: ElementRef;
    @ViewChild('stackLayout') stack: ElementRef;
    scrollLayout: ScrollView;
    textField: TextField;
    stack_layout: StackLayout;

    constructor(private fbUser: FirebaseUserService) {
        this.fbUser.user$.subscribe((userObj) => {
            if (userObj.bp_values) {
                userObj.bp_values.forEach(element => {
                    this.bpValues.push(element);
                });
            }
        });
    }

    ngOnInit() {

    }

    textfield_click(args) {
        this.scrollLayout.scrollToVerticalOffset(this.stack_layout.getLocationRelativeTo(this.textField).y - 50, true);
        console.log("scrolled");
    }

    saveSystolic(args) {
        let textview: TextView = <TextView>args.object;
        this.systolic = textview.text;
        if (parseInt(this.systolic) < 120) {
            this.systolicStatus = 'normal';
        } else if (parseInt(this.systolic) >= 120 && parseInt(this.systolic) <= 139) {
            this.systolicStatus = 'at risk';
        } else {
            this.systolicStatus = 'high';
        }
        if (isAndroid) {
            textview.android.clearFocus();
        }
        this.message = null;
    }

    saveDiastolic(args) {
        let textview: TextView = <TextView>args.object;
        this.diastolic = textview.text;
        if (parseInt(this.diastolic) < 80) {
            this.diastolicStatus = 'normal';
        } else if (parseInt(this.diastolic) >= 80 && parseInt(this.diastolic) <= 89) {
            this.diastolicStatus = 'at risk';
        } else {
            this.diastolicStatus = 'high';
        }
        if (isAndroid) {
            textview.android.clearFocus();
        }
        this.message = null;
    }

    saveBP() {
        if (this.diastolic == null || this.systolic === null) {
            this.message = "Please enter both diastolic and systolic numbers.";
            return;
        }
        var timestamp = new Date(Date.now());
        var result = (timestamp.getMonth() + 1) + '/'
                        + timestamp.getDate() + '/'
                        + timestamp.getFullYear() + " "
                        + timestamp.getHours() + ":"
                        + timestamp.getMinutes();
        this.bpValues.push([this.systolic, this.diastolic, result]);
        this.fbUser.update_user({bp_values: this.bpValues});
    }
}