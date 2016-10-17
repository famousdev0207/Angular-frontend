import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

import { SessionService } from './session.service';

@Injectable()
export class AuthenticationService {
    constructor(
      private http: Http,
      private sessionService: SessionService
    ) { }

    login(username, password) {
        return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    this.sessionService.setInitSession(true);
                    this.sessionService.setSession('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        this.sessionService.removeSession('currentUser');
        this.sessionService.setInitSession(false);
    }
}
