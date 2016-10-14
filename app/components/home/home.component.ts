/**
 * Created by Paulo Roberto on 09/10/2016.
 */
 import { Component, OnInit } from '@angular/core';

 import { User } from '../../models/index';
 import { UserService } from '../../services/index';

 @Component({
     moduleId: module.id,
     templateUrl: '../../views/home.html'
 })

 export class HomeComponent implements OnInit {
     currentUser: User;
     users: User[] = [];

     constructor(private userService: UserService) {
         this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
     }

     ngOnInit() {
         this.loadAllUsers();
     }

     deleteUser(id) {
         this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
     }

     private loadAllUsers() {
         this.userService.getAll().subscribe(users => { this.users = users; });
     }
 }
