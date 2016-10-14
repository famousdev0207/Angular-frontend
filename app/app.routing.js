"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('./components/login/login.component');
var home_component_1 = require('./components/home/home.component');
var index_1 = require('./guards/index');
var appRoutes = [
    { path: '', component: home_component_1.HomeComponent, canActivate: [index_1.AuthGuard] },
    { path: 'login', component: login_component_1.LoginComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map