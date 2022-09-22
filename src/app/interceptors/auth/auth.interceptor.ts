import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/services/auth/login/login.service';
import { Router } from '@angular/router';
import { Token } from 'src/app/models/auth/token/token';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    token : Token = new Token();

    constructor(private auth : LoginService, private router : Router) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      this.token = JSON.parse(localStorage.getItem("token") || '{}');
      let req = request;
      if(((JSON.parse(atob(this.token.accesstoken.split('.')[1]))).exp)-(Math.floor((new Date).getTime() / 1000)) >0){
          req = request.clone({
              setHeaders:{
                  Authorization : 'Bearer '+this.token.accesstoken
              }
          })
      }else{
          if(((JSON.parse(atob(this.token.refreshtoken.split('.')[1]))).exp)-(Math.floor((new Date).getTime() / 1000)) >0){
              this.auth.refreshtoken(this.token.refreshtoken).subscribe(data=>{
              this.token = data;
              localStorage.setItem("token", JSON.stringify(this.token));
              },err=>{
                  alert("Error, please try again")
              })
              req = request.clone({
                  setHeaders:{
                      Authorization : 'Bearer '+this.token.accesstoken
                  }
              })
          }
          else{
              localStorage.clear();
              this.router.navigate(['/']);
          }
      }
      return next.handle(req);
    }
}
