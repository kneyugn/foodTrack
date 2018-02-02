import {Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, NgModule} from "@angular/core";
import { Page } from "tns-core-modules/ui/page";
import {EventData, Observable} from "tns-core-modules/data/observable";
import {SpoonacularService} from "../services/spoonacular.service";
import {SearchBar} from "tns-core-modules/ui/search-bar";
import {RouterExtensions} from "nativescript-angular";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-pro-ui/sidedrawer/angular";
import { RadSideDrawer, SideDrawerLocation, DrawerTransitionBase, FadeTransition, ReverseSlideOutTransition} from 'nativescript-pro-ui/sidedrawer';
import { AccordionModule } from "nativescript-accordion/angular";
import { ObservableArray } from "tns-core-modules/data/observable-array";
import * as htmlViewModule from "tns-core-modules/ui/html-view";
import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";
import { SIDEDRAWER_DIRECTIVES } from 'nativescript-pro-ui/sidedrawer/angular';


@NgModule({
    imports: [
        NativeScriptUISideDrawerModule
    ]
    })

@Component({
    selector: "user-profile",
    moduleId: module.id,
    templateUrl: "./userProfile.component.html",
    styleUrls: ['./userProfile.component.css'],
})


export class UserProfileComponent implements AfterViewInit, OnInit {
    private currentLocation: SideDrawerLocation;
    private secondcurrentLocation: SideDrawerLocation;
    private show = 'collapsed';
    private show2 = 'collapsed';
    // private sideDrawerTransition: DrawerTransitionBase;
    // public currentTransition: string;
    private usr_pic = [
        {image: '~/res/usr_image.jpg'}];
    constructor(private _changeDetectionRef: ChangeDetectorRef) {
    }

    @ViewChild('drawerComponent') public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;
    //this is for the second button
    @ViewChild('seconddrawerComponent') public seconddrawerComponent: RadSideDrawerComponent;
    private seconddrawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this.seconddrawer = this.seconddrawerComponent.sideDrawer;
        //doesn't work somehow
        // this.sideDrawerTransition = new ReverseSlideOutTransition();
        this._changeDetectionRef.detectChanges();
    }
    ngOnInit() {
        this.currentLocation = SideDrawerLocation.Left;
        this.secondcurrentLocation = SideDrawerLocation.Left;
    }


    public openDrawer() {
        this.show = 'visible';
        this.drawer.showDrawer();
    }
    public openSecondDrawer() {
        this.show2 = 'visible';
        this.seconddrawer.showDrawer();
    }

    public onCloseDrawerTap() {
       this.drawer.closeDrawer();
       this.show = 'collapsed';
    }
    public onSecondCloseDrawerTap() {
        this.seconddrawer.closeDrawer();
        this.show2 = 'collapsed';
     }
    
}