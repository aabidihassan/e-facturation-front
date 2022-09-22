import { Product } from 'src/app/demo/api/product';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Utilisateur } from 'src/app/models/Utilisateur/utilisateur';
import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/demo/service/country.service';
import { Entreprise } from 'src/app/models/Entreprise/entreprise';
import { LoginService } from 'src/app/services/auth/login/login.service';
import { Token } from 'src/app/models/auth/token/token';
import { Router } from '@angular/router';


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

    selectedMulti: any;


    statuses = [
        { nom_categorie: 'PRODUITS & SERVICES'},
        { nom_categorie: 'PRODUITS' },
        { nom_categorie: 'SERVICE'}
    ];

    user !: Utilisateur;
    productDialog : boolean = false;
    submitted :boolean= false;

    products: Product[] = [];

    product: Product = {};

    valCheck: string[] = ['remember'];

    password!: string;

    countries: any[] = [];

    token : Token = new Token();

    constructor(public layoutService: LayoutService, private router : Router ,private countryService: CountryService, private loginService : LoginService) { }

    ngOnInit() {

        if(localStorage.getItem("token")!=null){
            this.router.navigate(['/'])
        }

        this.user = new Utilisateur();
        this.countryService.getCountries().then(countries => {
            this.countries = countries;
        });

    }

    openNew() {
        this.product = {};
        this.submitted = false;
        this.productDialog = true;
    }
    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
    }
    register() {
        this.submitted = true;
        this.loginService.register(this.user).subscribe(data=>{
            alert("Votre compte est bien cree")
            this.login();
        },err=>{
            alert("Erroooor")
        })
    }

    login(){
        this.loginService.login(this.user).subscribe(data=>{
            this.token = data;
            localStorage.setItem("token", JSON.stringify(this.token))
            this.router.navigate(['/'])
        },err=>{
            alert("Le Nom d'utilisateur ou Mot de passe est incorrect")
        })
    }


}
