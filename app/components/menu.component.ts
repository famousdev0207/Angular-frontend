import { Component, OnInit} from '@angular/core';

import { SessionService } from '../services/index';

@Component({
    selector: 'my-menu',
    templateUrl: './app/templates/menu.html'
})
export class MenuComponent {
  public isLoggedMenu:boolean = false;

  constructor(
    private sessionService:SessionService
  ) {
      this.isLoggedMenu = Boolean(this.sessionService.isLoggedIn());
      console.log("Menu Session: "+this.isLoggedMenu);
  }

}
