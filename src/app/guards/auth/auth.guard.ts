import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Token } from 'src/app/models/auth/token/token';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private router : Router){}

    canActivate() {
      if(this.isLoggedIn()) return true;
      this.router.navigate(['auth/login'])
      return false;
    }

    canActivateChild() {
        if(this.getRole() == 'USER') return true;
        this.router.navigate(['auth/access'])
        return false;
    }

    isLoggedIn(){
      return localStorage.getItem("token")!=null;
    }

    getRole(){
        const token : Token = JSON.parse(localStorage.getItem("token")!);
        return Token.getDecodedAccessToken(token.accesstoken).roles[0];
    }

}
