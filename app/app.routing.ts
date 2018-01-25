import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import {LandingPageComponent} from "./components/landingPage.component";
import {RecipesResultsComponent} from "./components/recipesResults.component";

const routes: Routes = [
    // { path: "", redirectTo: "/landing", pathMatch: "full" },
    { path: "", component: LandingPageComponent },
    { path: "recipesResults", component: RecipesResultsComponent },
    // { path: "item/:id", component: ItemDetailComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }