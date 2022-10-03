import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { Utilisateur } from '../models/Utilisateur/utilisateur';
import { ProfileService } from '../services/auth/Profile/profile.service';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    user !: Utilisateur;

    constructor(public layoutService: LayoutService, private profileService : ProfileService) { }

    ngOnInit() {

        this.profileService.profile().subscribe(data=>{
            this.user = data;
            localStorage.setItem("user", JSON.stringify(this.user));



            switch(this.user.entreprise.categorie.nom_categorie){
                case "PRODUITS" : this.model = [
                    {
                        label: 'Home',
                        items: [
                            { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                        ]
                    },
                    {
                        label: 'Modeles Facture',
                        items: [
                            { label: 'Vos Modeles de Facture', icon: 'pi pi-fw bi bi-file-earmark-post-fill', routerLink: ['/modeles'] }
                        ]
                    },
                    {
                        label: ' Les Factures',
                        items: [
                            { label: ' Les Devis', icon: 'pi pi-fw bi bi-clipboard2', routerLink: ['/'] },
                            { label: ' Les Factures', icon: 'pi pi-fw bi bi-clipboard2-check', routerLink: ['/'] }
                        ]
                    },

                    {
                        label: 'Clients & Fornisseure',
                        items: [
                            { label: 'Vos Clients', icon: 'pi pi-fw pi-users', routerLink: ['/clients'] },
                            { label: 'Vos Fournisseurs', icon: 'pi pi-fw pi-users', routerLink: ['/fournisseurs'] }
                        ]
                    },
                    {
                        label: 'Produits',
                        items: [
                            { label: 'List Produits', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/produits'] },
                            { label: 'List Service', icon: 'pi pi-fw pi-slack', routerLink: ['/services'] }
                        ]
                    }
                ];
                break;

            case "SERVICES" : this.model = [
                {
                    label: 'Home',
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                    ]
                },
                {
                    label: 'Modeles Facture',
                    items: [
                        { label: 'Vos Modeles de Facture', icon: 'pi pi-fw bi bi-file-earmark-post-fill', routerLink: ['/modeles'] }
                    ]
                },
                {
                    label: ' Les Factures',
                    items: [
                        { label: ' Les Devis', icon: 'pi pi-fw bi bi-clipboard2', routerLink: ['/'] },
                        { label: ' Les Factures', icon: 'pi pi-fw bi bi-clipboard2-check', routerLink: ['/'] }
                    ]
                },

                {
                    label: 'Clients & Fornisseure',
                    items: [
                        { label: 'Vos Clients', icon: 'pi pi-fw pi-users', routerLink: ['/clients'] },
                        { label: 'Vos Fournisseurs', icon: 'pi pi-fw pi-users', routerLink: ['/fournisseurs'] }
                    ]
                },
                {
                    label: 'Produits',
                    items: [
                        { label: 'List Produits', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/produits'] },
                        { label: 'List Service', icon: 'pi pi-fw pi-slack', routerLink: ['/services'] }
                    ]
                }
            ];
            break;
            case "PRODUITS & SERVICES" : this.model = [
                {
                    label: 'Home',
                    items: [
                        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                    ]
                },
                {
                    label: 'Modeles Facture',
                    items: [
                        { label: 'Vos Modeles de Facture', icon: 'pi pi-fw bi bi-file-earmark-post-fill', routerLink: ['/modeles'] }
                    ]
                },
                {
                    label: ' Les Factures',
                    items: [
                        { label: ' Les Devis', icon: 'pi pi-fw bi bi-clipboard2', routerLink: ['/'] },
                        { label: ' Les Factures', icon: 'pi pi-fw bi bi-clipboard2-check', routerLink: ['/'] }
                    ]
                },

                {
                    label: 'Clients & Fornisseure',
                    items: [
                        { label: 'Vos Clients', icon: 'pi pi-fw pi-users', routerLink: ['/clients'] },
                        { label: 'Vos Fournisseurs', icon: 'pi pi-fw pi-users', routerLink: ['/fournisseurs'] }
                    ]
                },
                {
                    label: 'Produits',
                    items: [
                        { label: 'List Produits', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/produits'] },
                        { label: 'List Service', icon: 'pi pi-fw pi-slack', routerLink: ['/services'] }
                    ]
                }
            ];
            break;
            }



        })


    }
}
