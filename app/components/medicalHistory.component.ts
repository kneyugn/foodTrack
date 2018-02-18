import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FilterableListpicker } from 'nativescript-filterable-listpicker';
import { FirebaseUserService } from "../services/firebaseUser.service";
import { ObservableArray } from "data/observable-array/observable-array";

@Component({
    moduleId: module.id,
    selector: "medical-history",
    templateUrl: "medicalHistory.component.html",
    styleUrls: ['./medicalHistory.component.css']
})
export class MedicalHistoryComponent {
    //Medical Conditions
    public all_conditions_list: string[] = ["Heart Disease", "Diabetes", "High Blood Pressure", "High Cholesterol", "Liver Disease", "Food Allergy"];
    private curr_conditions: string[] = [];
    public condition = "Search Medical Condition ...";
    public add_condition = "Search medical condition ...";
    
    @ViewChild('conditionListPicker') list_picker: ElementRef;
    @ViewChild('stack') stack: ElementRef;

    constructor(private fbUser: FirebaseUserService) {
        this.fbUser.user$.subscribe((userObj) => {
            if (userObj.medical_history) {
                userObj.medical_history.forEach((item) => {
                    this.curr_conditions.push(item);
                    const index = this.all_conditions_list.indexOf(item);
                    this.all_conditions_list.splice(index, 1);
                });
            }
        });
    }

    showPicker() {
        this.list_picker.nativeElement.show();
        this.stack.nativeElement.visibility = "collapsed";
    }

    removeCondition(i: number) {
        var removed_condition = this.curr_conditions[i];
        //this.all_conditions_list.push(removed_condition);
        this.curr_conditions.splice(i, 1);
    }

    addMedicalCondition(args) {
        if (this.add_condition == "Search medical condition ...") {
            return;
        }
        if (this.curr_conditions.indexOf(this.add_condition) != -1) {
            alert("Already have this condition");
            this.add_condition = "Search medical condition ...";
            return;
        }
        this.curr_conditions.push(this.add_condition);
        this.add_condition = "Search medical condition ..."
    }

    save(args) {
        this.fbUser.update_user(
            {
                medical_history: this.curr_conditions
            });
    }

    cancelFilterableList() {
        // this gets called if the user cancels the modal. 
        console.log("Cancelled");
        this.stack.nativeElement.visibility = "visible";

    }

    itemTapped(args) {
        this.add_condition = args.selectedItem;
        this.stack.nativeElement.visibility="visible";
    }
}