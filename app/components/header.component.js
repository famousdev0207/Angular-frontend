"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var session_service_1 = require('../services/session.service');
var index_1 = require('../services/index');
var HeaderComponent = (function () {
    function HeaderComponent(userService) {
        this.userService = userService;
        this.title = 'Tour of Heroes';
        this.subtitle = 'Windstorm';
        this.isLogger = false;
        this.users = [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }
    HeaderComponent = __decorate([
        core_1.Component({
            selector: 'my-header',
            templateUrl: './app/templates/header.html'
        }), 
        __metadata('design:paramtypes', [index_1.UserService])
    ], HeaderComponent);
    return HeaderComponent;
}());
exports.HeaderComponent = HeaderComponent;
this.sessionService = new session_service_1.SessionService();
if (this.sessionService.isLoggedIn()) {
    this.isLogger = true;
    this.loadAllUsers();
}
//# sourceMappingURL=header.component.js.map