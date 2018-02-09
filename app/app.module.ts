import {NativeScriptHttpClientModule} from "nativescript-angular/http-client";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import {LandingPageComponent} from "./components/landingPage.component";
import {RecipesResultsComponent} from "./components/recipesResults.component";
import {RecipesGenerateFormComponent} from "./components/recipesGenerateForm.component";
import {BPFormComponent} from "./components/bpForm.component";
import {BPChartComponent} from "./components/bpChart.component";
import {HealthInfoComponent} from "./components/healthInfo.component";
import {UserProfileComponent} from "./components/userProfile.component";
import { AccordionModule } from "nativescript-accordion/angular";
import { MedicalHistoryComponent } from "./components/medicalHistory.component";
import { NativeScriptUIDataFormModule } from "nativescript-pro-ui/dataform/angular";
import { NativeScriptFormsModule } from "nativescript-angular/forms";

import { SpoonacularService } from "./services/spoonacular.service";
import { FirebaseRecipeService } from "./services/firebaseRecipe.service";
import { FirebaseUserService } from "./services/firebaseUser.service";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

const firebase = require("nativescript-plugin-firebase");

firebase.init({
    // Optionally pass in properties for database, authentication and cloud messaging,
    // see their respective docs.
}).then(
    instance => {
        console.log("firebase.init done");
    },
    error => {
        console.log(`firebase.init error: ${error}`);
    }
    );

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptHttpClientModule,
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptUIDataFormModule,
        NativeScriptFormsModule,
        AccordionModule
    ],
    declarations: [
        AppComponent,
        LandingPageComponent,
        RecipesResultsComponent,
        RecipesGenerateFormComponent,
        BPFormComponent,
        BPChartComponent,
        HealthInfoComponent,
        UserProfileComponent,
        MedicalHistoryComponent,
    ],
    providers: [
        SpoonacularService,
        FirebaseRecipeService,
        FirebaseUserService,
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})

/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
