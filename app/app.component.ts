import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectionStrategy } from "@angular/core";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActionItem } from "ui/action-bar";
import { RadSideDrawerComponent, SideDrawerType } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import {RouterExtensions} from "nativescript-angular";
import {FirebaseUserService} from "./services/firebaseUser.service";
import { FirebaseAuthService } from "./services/firebaseAuth.service";
import { Observable } from "tns-core-modules/ui/page/page";
import {FirebaseRecipeService} from "./services/firebaseRecipe.service";

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html",
    styleUrls: ["components/css/icons.css", "/app.css"],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class AppComponent implements AfterViewInit, OnInit {
    private _mainContentText: string;
    private search = String.fromCharCode(0xe986);
    private fork = String.fromCharCode(0xe9a3);
    private person = String.fromCharCode(0xe971);
    private bookMark = String.fromCharCode(0xe9d2);
    private logOut = String.fromCharCode(0xea14);
    public usr_pic_url = new Observable();
    public loginStatus = false;


    constructor(private routerExtensions: RouterExtensions,
                private fbAuth: FirebaseAuthService,
                private fbUser: FirebaseUserService) {
    }

    ngOnInit() {
        this.fbUser.user$.subscribe((userObj) => {
            if (userObj) {
                this.usr_pic_url.set("src", userObj.profile_pic);
            }
        });
        this.fbAuth.loginStatus$.subscribe((status) => {
            console.log(status);
            this.loginStatus = status;
        });
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        //this._changeDetectionRef.detectChanges();
    }

    get mainContentText() {
        return this._mainContentText;
    }

    set mainContentText(value: string) {
        this._mainContentText = value;
    }

    public openDrawer() {
        this.drawer.showDrawer();
    }

    public onCloseDrawerTap() {
        this.drawer.closeDrawer();
    }

    logout() {
        this.drawer.closeDrawer();
        this.fbAuth.logout();
    }

    goBack() {
        this.routerExtensions.back();
    }

    goHome() {
        this.routerExtensions.navigate(['/landing']);
    }

    goToNotifications() {
        this.routerExtensions.navigate(['/notifications']);
    }
}