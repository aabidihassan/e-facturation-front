import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router : Router){}

    canActivate() {
      if(this.isLoggedIn()) return true;
      this.router.navigate(['auth/login'])
      return false;
    }

    isLoggedIn(){
      return localStorage.getItem("token")!=null;
    }

}
