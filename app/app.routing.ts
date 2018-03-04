import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import {LandingPageComponent} from "./components/landingPage.component";
import {RecipesResultsComponent} from "./components/recipesResults.component";
import {RecipesGenerateFormComponent} from "./components/recipesGenerateForm.component";
import {BPChartComponent} from "./components/bpChart.component";
import {BPFormComponent} from "./components/bpForm.component";
import {HealthInfoComponent} from "./components/healthInfo.component";
import {UserProfileComponent} from "./components/userProfile.component";
import { MedicalHistoryComponent} from "./components/medicalHistory.component";
import { FoodCardComponent} from "./components/foodCard.component";
import { RatingRecipeComponent} from "./components/ratingPage.component";
import { CommentingRecipeComponent} from "./components/commentPage.component";

const routes: Routes = [
    { path: "", component: LandingPageComponent },
    { path: "recipesResults", component: RecipesResultsComponent },
    { path: "recipesForm", component: RecipesGenerateFormComponent },
    { path: "bpChart", component: BPChartComponent },
    { path: "bpForm", component: BPFormComponent },
    { path: "healthInfo", component: HealthInfoComponent },
    { path: "userProfile", component: UserProfileComponent },
    { path: "foodCard", component: FoodCardComponent },
    { path: "ratingRecipe", component: RatingRecipeComponent },
    { path: "medicalHistory", component: MedicalHistoryComponent },
    { path: "commentingRecipe", component: CommentingRecipeComponent },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }