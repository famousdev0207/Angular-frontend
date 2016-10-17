import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { SessionService } from '../services/session.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
      private router: Router
      private sessionService: SessionService
    ) { }

    canActivate() {
        if (this.sessionService.getSession('currentUser')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login']);
        return false;
    }
}
