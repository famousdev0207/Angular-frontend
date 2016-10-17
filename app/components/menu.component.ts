import { Component, OnInit} from '@angular/core';

import { SessionService } from '../services/index';

@Component({
    selector: 'my-menu',
    templateUrl: './app/templates/menu.html'
})
export class MenuComponent {
  private isLogged: boolean = false;

  constructor(
    private sessionService:SessionService
  ) {
      this.isLogged = this.sessionService.isLoggedIn();
      console.log("Menu Session: "+this.isLogged);
  }

}
