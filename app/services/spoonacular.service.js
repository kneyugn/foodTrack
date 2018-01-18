"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var http_1 = require("@angular/common/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
var SpoonacularService = (function () {
    function SpoonacularService(http) {
        this.http = http;
        this.recipes_ = new Subject_1.Subject();
        this.recipes$ = this.recipes_.asObservable();
        this.header = new http_1.HttpHeaders();
        this.url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?ingredients=flour";
        this.header.append("Accept", "application/json");
        this.header.append("X-Mashape-Key", "oUwkKIwQFZmshuUqHm4SdExR2EW5p1yYS0AjsnWUW31xPjTA9A");
    }
    SpoonacularService.prototype.getRecipes = function () {
        var _this = this;
        var maxRecipes = '5';
        var limitLicense = 'false';
        var ranking = '1';
        var ingredients = "flour, beans";
        var x = { name: '' };
        var params = new http_1.HttpParams();
        this.http.get(this.url, { params: params }).subscribe(function (result) {
            console.log(result);
            _this.recipes_.next(result);
        });
    };
    SpoonacularService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient])
    ], SpoonacularService);
    return SpoonacularService;
}());
exports.SpoonacularService = SpoonacularService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3Bvb25hY3VsYXIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNwb29uYWN1bGFyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkM7QUFFM0Msd0NBQXVDO0FBQ3ZDLDZDQUF5RjtBQUN6RixpQ0FBK0I7QUFDL0IsZ0NBQThCO0FBRzlCO0lBT0ksNEJBQW9CLElBQWdCO1FBQWhCLFNBQUksR0FBSixJQUFJLENBQVk7UUFMNUIsYUFBUSxHQUFFLElBQUksaUJBQU8sRUFBTyxDQUFDO1FBQzlCLGFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLFdBQU0sR0FBRyxJQUFJLGtCQUFXLEVBQUUsQ0FBQztRQUMzQixRQUFHLEdBQUcsd0dBQXdHLENBQUM7UUFHbkgsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLGtCQUFrQixDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFLG9EQUFvRCxDQUFDLENBQUM7SUFDOUYsQ0FBQztJQUVELHVDQUFVLEdBQVY7UUFBQSxpQkFXQztRQVZHLElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQztRQUNyQixJQUFJLFlBQVksR0FBRyxPQUFPLENBQUM7UUFDM0IsSUFBSSxPQUFPLEdBQUcsR0FBRyxDQUFDO1FBQ2xCLElBQUksV0FBVyxHQUFHLGNBQWMsQ0FBQztRQUNqQyxJQUFJLENBQUMsR0FBRyxFQUFDLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQztRQUNuQixJQUFNLE1BQU0sR0FBRyxJQUFJLGlCQUFVLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUMsTUFBTTtZQUN6RCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3BCLEtBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQXZCUSxrQkFBa0I7UUFEOUIsaUJBQVUsRUFBRTt5Q0FRaUIsaUJBQVU7T0FQM0Isa0JBQWtCLENBMkI5QjtJQUFELHlCQUFDO0NBQUEsQUEzQkQsSUEyQkM7QUEzQlksZ0RBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XHJcbmltcG9ydCB7IE9ic2VydmFibGUsIGZyb21PYmplY3QsIGZyb21PYmplY3RSZWN1cnNpdmUgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9kYXRhL29ic2VydmFibGVcIjtcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XHJcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzLCBIdHRwUmVzcG9uc2UsIEh0dHBQYXJhbXMgfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcclxuaW1wb3J0IFwicnhqcy9hZGQvb3BlcmF0b3IvbWFwXCI7XHJcbmltcG9ydCBcInJ4anMvYWRkL29wZXJhdG9yL2RvXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTcG9vbmFjdWxhclNlcnZpY2Uge1xyXG5cclxuICAgIHByaXZhdGUgcmVjaXBlc189IG5ldyBTdWJqZWN0PGFueT4oKTtcclxuICAgIHB1YmxpYyByZWNpcGVzJCA9IHRoaXMucmVjaXBlc18uYXNPYnNlcnZhYmxlKCk7XHJcbiAgICBwcml2YXRlIGhlYWRlciA9IG5ldyBIdHRwSGVhZGVycygpO1xyXG4gICAgcHJpdmF0ZSB1cmwgPSBcImh0dHBzOi8vc3Bvb25hY3VsYXItcmVjaXBlLWZvb2QtbnV0cml0aW9uLXYxLnAubWFzaGFwZS5jb20vcmVjaXBlcy9maW5kQnlJbmdyZWRpZW50cz9pbmdyZWRpZW50cz1mbG91clwiO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaHR0cDogSHR0cENsaWVudCkge1xyXG4gICAgICAgIHRoaXMuaGVhZGVyLmFwcGVuZChcIkFjY2VwdFwiLCBcImFwcGxpY2F0aW9uL2pzb25cIik7XHJcbiAgICAgICAgdGhpcy5oZWFkZXIuYXBwZW5kKFwiWC1NYXNoYXBlLUtleVwiLCBcIm9Vd2tLSXdRRlptc2h1VXFIbTRTZEV4UjJFVzVwMXlZUzBBanNuV1VXMzF4UGpUQTlBXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJlY2lwZXMoKSB7XHJcbiAgICAgICAgbGV0IG1heFJlY2lwZXMgPSAnNSc7XHJcbiAgICAgICAgbGV0IGxpbWl0TGljZW5zZSA9ICdmYWxzZSc7XHJcbiAgICAgICAgbGV0IHJhbmtpbmcgPSAnMSc7XHJcbiAgICAgICAgbGV0IGluZ3JlZGllbnRzID0gXCJmbG91ciwgYmVhbnNcIjtcclxuICAgICAgICBsZXQgeCA9IHtuYW1lOiAnJ307XHJcbiAgICAgICAgY29uc3QgcGFyYW1zID0gbmV3IEh0dHBQYXJhbXMoKTtcclxuICAgICAgICB0aGlzLmh0dHAuZ2V0KHRoaXMudXJsLCB7IHBhcmFtczogcGFyYW1zIH0pLnN1YnNjcmliZSgocmVzdWx0KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdCk7XHJcbiAgICAgICAgICAgIHRoaXMucmVjaXBlc18ubmV4dChyZXN1bHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGdldCByZWNpcGVzXHJcbiAgICAvLyBmaWx0ZXIgcmVjaXBlc1xyXG59XHJcbiJdfQ==