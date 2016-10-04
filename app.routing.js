"use strict";
var router_1 = require('@angular/router');
var login_component_1 = require('./components/login.component');
var vacina_form_component_1 = require('./components/vacina-form.component');
var paciente_form_component_1 = require('./components/paciente-form.component');
var appRoutes = [
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'vacina', component: vacina_form_component_1.VacinaFormComponent },
    { path: 'paciente', component: paciente_form_component_1.PacienteFormComponent },
    { path: '', component: login_component_1.LoginComponent }
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map