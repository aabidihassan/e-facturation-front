import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Utilisateur } from 'src/app/models/Utilisateur/utilisateur';
import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/demo/service/country.service';
import { LoginService } from 'src/app/services/auth/login/login.service';
import { Token } from 'src/app/models/auth/token/token';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/auth/Profile/profile.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .p-password input {
            width: 100%;
            padding:1rem;
        }

        :host ::ng-deep .pi-eye{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        :host ::ng-deep .pi-eye-slash{
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit{

    user !: Utilisateur;

    token : Token = new Token();

    constructor(public layoutService: LayoutService, private profileService : ProfileService ,private router : Router, private loginService : LoginService) { }

    ngOnInit() {

        if(localStorage.getItem("token")!=null){
            this.router.navigate(['/'])
        }

        this.user = new Utilisateur();
        this.user.entreprise.taxe = 20;


    }

    login(){
        this.loginService.login(this.user).subscribe(data=>{
            this.token = data;
            localStorage.setItem("token", JSON.stringify(this.token))
            this.profileService.profile().subscribe(data=>{
                localStorage.setItem("user", JSON.stringify(data));
            })
            if(Token.getRole()=='USER') this.router.navigate(['/'])
            else this.router.navigate(['/admin'])
        },err=>{
            alert("Le Nom d'utilisateur ou Mot de passe est incorrect")
        })
    }


}
