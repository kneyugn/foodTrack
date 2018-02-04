import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FilterableListpicker } from 'nativescript-filterable-listpicker';
import { Label } from 'tns-core-modules/ui/label';
import { Button } from 'ui/button';
import { ProxyViewContainer } from 'ui/proxy-view-container';
import { AfterViewInit } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
    moduleId: module.id,
    selector: "medical-history",
    templateUrl: "medicalHistory.component.html",
    styleUrls: ['./medicalHistory.component.css']
})
export class MedicalHistoryComponent {
    //Medical Conditions
    private all_conditions_list: string[] = ["Heart Disease", "Diabetes", "High Blood Pressure", "High Cholesterol",
         "Liver Disease", "Food Allergy"];
    private curr_conditions: string[] = [];
    public condition = "Search Medical Condition ...";
    public add_condition = "Search medical condition ...";
    
    @ViewChild('conditionListPicker') list_picker: ElementRef;

    constructor() {
        // Firebase call to load conditions
        this.curr_conditions.push("High Blood Pressure");
        this.curr_conditions.push("Food Allergy");
    }

    showPicker() {
        this.list_picker.nativeElement.show();
    }

    removeCondition(i: number) {
        this.curr_conditions.splice(i, 1);
    }

    addMedicalCondition(args) {
        this.curr_conditions.push(this.add_condition);
        this.add_condition = "Search medical condition ..."
    }

    cancelFilterableList() {
        // this gets called if the user cancels the modal. 
        console.log("Cancelled");
    }

    itemTapped(args) {
        this.add_condition = args.selectedItem;
    }
}