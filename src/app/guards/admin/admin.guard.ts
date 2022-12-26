import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { Token } from 'src/app/models/auth/token/token';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

    constructor(private router : Router){}

    canActivate() {
      if(this.isLoggedIn()){
        if(!this.isAdmin()) this.router.navigate(['auth/access']);
        return true;
      }
      this.router.navigate(['auth/login']);
      return false;
    }

    isAdmin(){
        return Token.getRole() == 'ADMIN';
    }

    isLoggedIn(){
      return localStorage.getItem("token")!=null;
    }

}
