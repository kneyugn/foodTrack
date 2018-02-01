import { Component, OnInit } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "medical-history",
    templateUrl: "medicalHistory.component.html",
})
export class MedicalHistoryComponent {
    private _person: Person;

    constructor() {
        this._person = new Person("John", 23, "john@company.com", "New York", "5th Avenue", 11);
        console.log(this._person);
    }

    get person(): Person {
        return this._person;
    }
}

export class Person {
    public name: string;
    public age: number;
    public email: string;
    public city: string;
    public street: string;
    public streetNumber: number;

    constructor(name: string, age: number, email: string, city: string, street: string, streetNumber: number) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.city = city;
        this.street = street;
        this.streetNumber = streetNumber;
    }
}