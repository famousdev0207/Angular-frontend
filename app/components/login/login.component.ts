import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, AuthenticationService, UserService, SessionService } from '../../services/index';

@Component({
    moduleId: module.id,
    templateUrl: '../../views/login.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    usuario: any = {};
    loading = false;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService,
        private sessionService: SessionService
    ) {
        this.register();
    }

    ngOnInit() {
        // reset login status
        this.authenticationService.logout();

    }

    register() {
        this.usuario.username = "nagpaulo";
        this.usuario.password = "123456";
        this.usuario.firstName = "Paulo";
        this.usuario.lastName = "Mesquita";
        this.userService.create(this.usuario);
    }

    login() {
        this.loading = true;
        this.authenticationService.login(this.model.username, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate(['/']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
