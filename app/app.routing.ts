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
import { CustomRecipeComponent } from "./components/customRecipe.component";
import { FoodCardComponent} from "./components/foodCard.component";
import { RatingRecipeComponent} from "./components/ratingPage.component";
import { CommentingRecipeComponent} from "./components/commentPage.component";
import {RecipesListComponent} from "./components/recipesList.component";
import {RecipeDetailsComponent} from "./components/recipeDetails.component";
import {AddToRecipeListComponent} from "./components/addToRecipeList.component";
import {NotificationsComponent} from "./components/notifications.component";
import {LoginComponent} from "./components/login.component";
import {AuthGuard} from "./services/auth-guard.service";

const routes: Routes = [
    { path: "", redirectTo: "/login", pathMatch: "full" },
    { path: "login", component: LoginComponent },
    { path: "landing", component: LandingPageComponent, canActivate: [AuthGuard]},
    { path: "recipesResults", component: RecipesResultsComponent, canActivate: [AuthGuard] },
    { path: "recipesForm", component: RecipesGenerateFormComponent, canActivate: [AuthGuard] },
    { path: "bpChart", component: BPChartComponent, canActivate: [AuthGuard] },
    { path: "bpForm", component: BPFormComponent, canActivate: [AuthGuard] },
    { path: "healthInfo", component: HealthInfoComponent, canActivate: [AuthGuard]},
    { path: "userProfile", component: UserProfileComponent, canActivate: [AuthGuard] },
    { path: "foodCard", component: FoodCardComponent, canActivate: [AuthGuard] },
    { path: "ratingRecipe", component: RatingRecipeComponent, canActivate: [AuthGuard] },
    { path: "medicalHistory", component: MedicalHistoryComponent, canActivate: [AuthGuard] },
    { path: "recipesList", component: RecipesListComponent, canActivate: [AuthGuard] },
    { path: "customRecipe", component: CustomRecipeComponent, canActivate: [AuthGuard]},
    { path: "commentingRecipe", component: CommentingRecipeComponent, canActivate: [AuthGuard] },
    { path: "recipeDetails", component: RecipeDetailsComponent, canActivate: [AuthGuard] },
    { path: "addToRecipeLists", component: AddToRecipeListComponent , canActivate: [AuthGuard]},
    { path: "notifications", component: NotificationsComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }