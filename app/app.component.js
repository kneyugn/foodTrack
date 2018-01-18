"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var spoonacular_service_1 = require("./services/spoonacular.service");
var AppComponent = (function () {
    function AppComponent(spoonacular) {
        this.spoonacular = spoonacular;
        this.spoonacular.recipes$.subscribe(function (data) {
            console.log("data");
        });
    }
    AppComponent.prototype.getRecipes = function (event) {
        this.spoonacular.getRecipes();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "ns-app",
            templateUrl: "app.component.html",
        }),
        __metadata("design:paramtypes", [spoonacular_service_1.SpoonacularService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMEM7QUFFMUMsc0VBQWtFO0FBT2xFO0lBQ0ksc0JBQW9CLFdBQStCO1FBQS9CLGdCQUFXLEdBQVgsV0FBVyxDQUFvQjtRQUMvQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsVUFBQyxJQUFJO1lBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBQ0QsaUNBQVUsR0FBVixVQUFXLEtBQWdCO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDbEMsQ0FBQztJQVJRLFlBQVk7UUFMeEIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSxvQkFBb0I7U0FDcEMsQ0FBQzt5Q0FHbUMsd0NBQWtCO09BRDFDLFlBQVksQ0FTeEI7SUFBRCxtQkFBQztDQUFBLEFBVEQsSUFTQztBQVRZLG9DQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7RXZlbnREYXRhfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcbmltcG9ydCB7U3Bvb25hY3VsYXJTZXJ2aWNlfSBmcm9tIFwiLi9zZXJ2aWNlcy9zcG9vbmFjdWxhci5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWFwcFwiLFxuICAgIHRlbXBsYXRlVXJsOiBcImFwcC5jb21wb25lbnQuaHRtbFwiLFxufSlcblxuZXhwb3J0IGNsYXNzIEFwcENvbXBvbmVudCB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBzcG9vbmFjdWxhcjogU3Bvb25hY3VsYXJTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMuc3Bvb25hY3VsYXIucmVjaXBlcyQuc3Vic2NyaWJlKChkYXRhKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImRhdGFcIik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBnZXRSZWNpcGVzKGV2ZW50OiBFdmVudERhdGEpIHtcbiAgICAgICAgdGhpcy5zcG9vbmFjdWxhci5nZXRSZWNpcGVzKCk7XG4gICAgfVxufVxuIl19