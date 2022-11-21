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
                            { label: ' Les Factures', icon: 'pi pi-fw bi bi-clipboard2-check', routerLink: ['/factures'] }
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
                        { label: ' Les Factures', icon: 'pi pi-fw bi bi-clipboard2-check', routerLink: ['/factures'] }
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
                    label: 'Services',
                    items: [
                        { label: 'List Services', icon: 'pi pi-fw pi-slack', routerLink: ['/services'] }
                    ]
                },
                {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                routerLink: ['/pages'],
                items: [
                    {
                        label: 'Landing',
                        icon: 'pi pi-fw pi-globe',
                        routerLink: ['/landing']
                    },
                    {
                        label: 'Auth',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'Login',
                                icon: 'pi pi-fw pi-sign-in',
                                routerLink: ['/auth/login']
                            },
                            {
                                label: 'Error',
                                icon: 'pi pi-fw pi-times-circle',
                                routerLink: ['/auth/error']
                            },
                            {
                                label: 'Access Denied',
                                icon: 'pi pi-fw pi-lock',
                                routerLink: ['/auth/access']
                            }
                        ]
                    },
                    {
                        label: 'Crud',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/pages/crud']
                    },
                    {
                        label: 'Timeline',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/pages/timeline']
                    },
                    {
                        label: 'Not Found',
                        icon: 'pi pi-fw pi-exclamation-circle',
                        routerLink: ['/pages/notfound']
                    },
                    {
                        label: 'Empty',
                        icon: 'pi pi-fw pi-circle-off',
                        routerLink: ['/pages/empty']
                    },
                ]
            },
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
                        { label: ' Les Factures', icon: 'pi pi-fw bi bi-clipboard2-check', routerLink: ['/factures'] }
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
                    label: 'Produits/Services',
                    items: [
                        { label: 'List Produits', icon: 'pi pi-fw pi-shopping-bag', routerLink: ['/produits'] },
                        { label: 'List Services', icon: 'pi pi-fw pi-slack', routerLink: ['/services'] }
                    ]
                }
            ];
            break;
            }



        })


    }
}
