"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('./components/login/login.component');
var appRoutes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: '', component: login_component_1.LoginComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map