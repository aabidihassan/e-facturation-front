import { Product } from 'src/app/demo/api/product';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Utilisateur } from 'src/app/models/Utilisateur/utilisateur';
import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/demo/service/country.service';
import { Entreprise } from 'src/app/models/Entreprise/entreprise';
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

    selectedMulti: any;


    statuses = [
        { nom_categorie: 'PRODUITS & SERVICES'},
        { nom_categorie: 'PRODUITS' },
        { nom_categorie: 'SERVICES'}
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

    userAuth : Utilisateur = new Utilisateur();

    formData : FormData = new FormData();

    selectedFiles?: FileList;

    repeted !: string;

    constructor(public layoutService: LayoutService, private profileService : ProfileService ,private router : Router ,private countryService: CountryService, private loginService : LoginService) { }

    ngOnInit() {

        if(localStorage.getItem("token")!=null){
            this.router.navigate(['/'])
        }

        this.user = new Utilisateur();
        this.user.entreprise.taxe = 20;
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
    selectFile(event: any): void {
        this.selectedFiles = event.target.files;
    }
    register() {
        this.submitted = true;
        const file: File | null = this.selectedFiles?.item(0)!;
        this.formData.append("file", file);
        this.formData.append("user", JSON.stringify(this.user));
        this.loginService.register(this.formData).subscribe(data=>{
            alert("Votre compte est bien cree")
            this.login();
        },err=>{
            this.formData = new FormData();
            alert("Erroooor")
        })
    }

    login(){
        this.loginService.login(this.user).subscribe(data=>{
            this.token = data;
            localStorage.setItem("token", JSON.stringify(this.token))
            this.profileService.profile().subscribe(data=>{
                this.userAuth = data;
                localStorage.setItem("user", JSON.stringify(this.userAuth));
            })
            this.router.navigate(['/'])
        },err=>{
            alert("Le Nom d'utilisateur ou Mot de passe est incorrect")
        })
    }


}
