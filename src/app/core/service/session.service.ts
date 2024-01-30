import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  private tokenKey:string ='auth_token';

  constructor() { }

  setToken(token:string):void{
    sessionStorage.setItem(this.tokenKey,token);
   }
 
   getToken():string | null{
    return sessionStorage.getItem(this.tokenKey);
   }
 
   isLoggedIn():boolean{
     return sessionStorage.getItem(this.tokenKey) !=null
   }
   
   logOut():void{
     sessionStorage.removeItem(this.tokenKey);
   }
}
