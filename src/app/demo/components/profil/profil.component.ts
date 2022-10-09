import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { InfoContactComponent } from './info-contact/info-contact.component';
import { InfoGeneralComponent } from './info-general/info-general.component';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {

  tieredItems!: MenuItem[];

  constructor() { }

  

  ngOnInit() {

    // RouterModule.forRoot([
    //   {
    //       path: '', component: ProfilComponent,
    //       children: [
              
    //           { path: 'general', component: InfoGeneralComponent },
    //           { path: 'contact', component: InfoContactComponent }

    //       ],
    //     }]),

    this.tieredItems = [
      {
          label: 'info-Général',
          icon: 'pi pi-fw pi-cog',
          routerLink: 'general',
         
      },
      {
          label: 'info-Contact',
          icon: 'pi pi-fw pi-cog',
          routerLink: 'contact',
         
      },
      { separator: true },
      { separator: true },
      {
          label: 'Changer le Mot de Passe',
          icon: 'pi pi-fw pi-lock',
          routerLink:'mot-de-passe'
         
      },
      
    ];

  }

}

