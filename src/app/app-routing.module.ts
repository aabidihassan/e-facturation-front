import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { ModelefactureComponent } from './demo/components/modelefacture/modelefacture.component';
import { ClientsComponent } from './demo/components/clients&fornisseurs/clients/clients.component';
import { FournisseursComponent } from './demo/components/clients&fornisseurs/fournisseurs/fournisseurs.component';
import { ProduitsComponent } from './demo/components/produits&services/produits/produits.component';
import { ServicesComponent } from './demo/components/produits&services/services/services.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { FactureComponent } from './demo/components/devisfacture/facture/facture/facture.component';
import { CreationComponent } from './demo/components/devisfacture/facture/creation/creation.component';
import { ProfilComponent } from './demo/components/profil/profil.component';
import { InfoGeneralComponent } from './demo/components/profil/info-general/info-general.component';
import { InfoContactComponent } from './demo/components/profil/info-contact/info-contact.component';
import { MotPasseComponent } from './demo/components/profil/mot-passe/mot-passe.component';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [
                    { path: '', loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UikitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'documentation', loadChildren: () => import('./demo/components/documentation/documentation.module').then(m => m.DocumentationModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) },
                    { path: 'modeles', component: ModelefactureComponent },
                    { path: 'clients', component: ClientsComponent },
                    { path: 'fournisseurs', component: FournisseursComponent },
                    { path: 'produits', component: ProduitsComponent },
                    { path: 'services', component: ServicesComponent },
                    { path: 'factures', children:[
                        { path: '', component: FactureComponent },
                        { path: 'creation', component: CreationComponent }
                    ] },
                    {  path: 'profil', component: ProfilComponent,
                    children: [
                        { path: '', component: InfoGeneralComponent },
                        { path: 'general', component: InfoGeneralComponent },
                        { path: 'contact', component: InfoContactComponent },
                        { path: 'mot-de-passe', component: MotPasseComponent }

                    ]}
                ],canActivate:[AuthGuard],canActivateChild:[AuthGuard]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },

            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
