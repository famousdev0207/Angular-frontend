import { Component, OnInit} from '@angular/core';
import { SessionService } from '../services/session.service';

import { User } from '../models/index';
import { UserService } from '../services/index';

@Component({
    selector: 'my-header',
    templateUrl: './app/templates/header.html'
})

export class HeaderComponent implements OnInit {
    private sessionService: SessionService;
    private title:string = 'Tour of Heroes';
    private subtitle:string = 'Windstorm';
    private isLogger = false;
    currentUser: User;
    users: User[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    this.sessionService = new SessionService();

    if(this.sessionService.isLoggedIn()){
      this.isLogger = true;
      this.loadAllUsers();
    }

    /*ngOnInit() {
        //this.loadAllUsers();
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }*/

}
