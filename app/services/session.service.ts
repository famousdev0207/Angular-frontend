/**
 * Created by Paulo Roberto on 14/10/2016.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class SessionService {
  private _status:boolean;

  isLoggedIn() {
    return this._status = false;
  }

  setInitSession(parm:boolean){
    this._status = parm;
  }

  constructor () {
    console.log("New SessionService");
  }
}
