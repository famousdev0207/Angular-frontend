import { Component} from '@angular/core';

import { User } from '../../models/index';
import { UserService, SessionService } from '../services/index';

@Component({
    selector: 'my-header',
    templateUrl: './app/templates/header.html'
})

export class HeaderComponent implements OnInit {
    private title:string = 'Tour of Heroes';
    private subtitle:string = 'Windstorm';
    private currentUser: User;
    private users: User[] = [];
    private isLogged: boolean = false;
    private dataLastAcess: date;

    constructor(
      private userService: UserService,
      private sessionService:SessionService
    ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.isLogged = this.sessionService.isLoggedIn();
        this.dataLastAcess = new Date().toLocaleDateString(); 
        console.log(this.isLogged);
    }

    ngOnInit() {
      this.loadAllUsers();
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

}
