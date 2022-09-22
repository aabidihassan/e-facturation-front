import { Product } from 'src/app/demo/api/product';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Utilisateur } from 'src/app/models/Utilisateur/utilisateur';
import { Component, OnInit } from '@angular/core';
import { CountryService } from 'src/app/demo/service/country.service';
import { Entreprise } from 'src/app/models/Entreprise/entreprise';


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
        { nom_categorie: 'Produits / Services'},
        { nom_categorie: 'Pvendre des produits' },
        { nom_categorie: 'Fournir des services'}
    ];
    
    user !: Utilisateur;
    productDialog : boolean = false;
    submitted :boolean= false;

    products: Product[] = [];

    product: Product = {};

    valCheck: string[] = ['remember'];

    password!: string;

    countries: any[] = [];

    constructor(public layoutService: LayoutService, private countryService: CountryService) { }

    ngOnInit() {
        this.user = new Utilisateur();
        console.log(this.user);
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
    saveProduct() {
        this.submitted = true;
    }
    
    


}
