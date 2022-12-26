import { NgModule } from '@angular/core';
import {
    CommonModule,
    DatePipe,
    HashLocationStrategy,
    LocationStrategy,
} from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';

import { CheckboxModule } from 'primeng/checkbox';
import { ModelefactureComponent } from './demo/components/modelefacture/modelefacture.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MediaDemoRoutingModule } from './demo/components/uikit/media/mediademo-routing.module';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ClientsComponent } from './demo/components/clients&fornisseurs/clients/clients.component';
import { FournisseursComponent } from './demo/components/clients&fornisseurs/fournisseurs/fournisseurs.component';
import { ProduitsComponent } from './demo/components/produits&services/produits/produits.component';
import { ServicesComponent } from './demo/components/produits&services/services/services.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TableModule } from 'primeng/table';
import { FactureComponent } from './demo/components/devisfacture/facture/facture/facture.component';
import { CreationComponent } from './demo/components/devisfacture/facture/creation/creation.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MenubarModule } from 'primeng/menubar';
import { ChipsModule } from 'primeng/chips';
import { CalendarModule } from 'primeng/calendar';
import { InputMaskModule } from 'primeng/inputmask';
import { MultiSelectModule } from 'primeng/multiselect';
import { DataViewModule } from 'primeng/dataview';
import { PasswordModule } from 'primeng/password';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { AuthRoutingModule } from './demo/components/auth/auth-routing.module';
import { FormlayoutRoutingModule } from './demo/components/uikit/formlayout/formlayout-routing.module';
import { CKEditorModule } from 'ng2-ckeditor';
import { ProfilComponent } from './demo/components/profil/profil.component';
import { InfoGeneralComponent } from './demo/components/profil/info-general/info-general.component';
import { InfoContactComponent } from './demo/components/profil/info-contact/info-contact.component';
import { MotPasseComponent } from './demo/components/profil/mot-passe/mot-passe.component';
import { TableDemoRoutingModule } from './demo/components/uikit/table/tabledemo-routing.module';
import { SliderModule } from 'primeng/slider';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { LoginRoutingModule } from './demo/components/auth/login/login-routing.module';
import { AdminComponent } from './demo/components/Admin/admin/admin.component';

@NgModule({
    declarations: [
        AppComponent,
        NotfoundComponent,
        ModelefactureComponent,
        ClientsComponent,
        FournisseursComponent,
        ProduitsComponent,
        ServicesComponent,
        FactureComponent,
        CreationComponent,
        ProfilComponent,
        InfoGeneralComponent,
        InfoContactComponent,
        MotPasseComponent,
        AdminComponent,
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        CheckboxModule,
        PdfViewerModule,
        CommonModule,
        MediaDemoRoutingModule,
        ButtonModule,
        ImageModule,
        GalleriaModule,
        BrowserModule,
        BrowserAnimationsModule,
        DialogModule,
        ButtonModule,
        CarouselModule,
        FormsModule,
        InputTextModule,
        InputTextareaModule,
        DropdownModule,
        ColorPickerModule,
        ConfirmDialogModule,
        ConfirmPopupModule,
        HttpClientModule,
        ColorPickerModule,
        ConfirmDialogModule,
        ToastModule,
        ToolbarModule,
        FileUploadModule,
        TableModule,
        RatingModule,
        RadioButtonModule,
        InputNumberModule,
        OverlayPanelModule,
        OverlayPanelModule,
        MenubarModule,
        AutoCompleteModule,
        ChipsModule,
        CalendarModule,
        InputMaskModule,
        MultiSelectModule,
        ReactiveFormsModule,
        DataViewModule,
        HttpClientModule,
        CKEditorModule,
        PasswordModule,
        CascadeSelectModule,
        DialogModule,
        AuthRoutingModule,
        FormlayoutRoutingModule,
        ConfirmPopupModule,
        TableDemoRoutingModule,
        SliderModule,
        ToggleButtonModule,
        RippleModule,
        LoginRoutingModule,
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        ProductService,
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        DatePipe,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
