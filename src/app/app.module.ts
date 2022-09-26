import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
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
import { FormsModule } from '@angular/forms';
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


@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, ModelefactureComponent, ClientsComponent, FournisseursComponent, ProduitsComponent, ServicesComponent
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
        ToolbarModule,FileUploadModule,TableModule,RatingModule,RadioButtonModule,InputNumberModule,
        OverlayPanelModule,
        ConfirmPopupModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService,
        {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
