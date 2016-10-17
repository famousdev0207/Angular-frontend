/**
 * Created by Paulo Roberto on 14/10/2016.
 */
import {Injectable} from '@angular/core';

@Injectable()
export class SessionService {

  constructor () {
    console.log("New SessionService: "+this.isLoggedIn());
  }

  isLoggedIn() {
    return localStorage.getItem('initSession');
  }

  setInitSession(parm:boolean){
    localStorage.setItem('initSession', parm);
  }

  setSession(name:string,obj:object){
    localStorage.setItem(name,obj);
  }

  getSession(name:string){
    return localStorage.getItem(name);
  }

  removeSession(name:string){
    localStorage.removeItem(name);
  }
}
