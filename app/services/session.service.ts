/**
 * Created by Paulo Roberto on 14/10/2016.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class SessionService {
  private _status:boolean;

  isLoggedIn() {
    return this._status;
  }

  setInitSession(){
    this._status = true;
  }

  constructor () {
    this._status = false;
    console.log("New SessionService");
  }
}
