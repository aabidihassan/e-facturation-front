import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaDemoRoutingModule } from '../uikit/media/mediademo-routing.module';
import { ButtonModule } from 'primeng/button';
import { ImageModule } from 'primeng/image';
import { GalleriaModule } from 'primeng/galleria';
import { CarouselModule } from 'primeng/carousel';
import { ModelefactureComponent } from './modelefacture.component';
import { ToolbarModule } from 'primeng/toolbar';
import {DialogModule, Dialog} from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { ChipsModule } from 'primeng/chips';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { CascadeSelectModule } from 'primeng/cascadeselect';
import { MultiSelectModule } from 'primeng/multiselect';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { FormlayoutRoutingModule } from '../uikit/formlayout/formlayout-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [ModelefactureComponent],
  imports: [
    CommonModule,
        MediaDemoRoutingModule,
        ImageModule,
        GalleriaModule,
        CarouselModule,
        ToolbarModule,
        ButtonModule,
        CheckboxModule,
        InputTextModule,
        FormsModule,
        PasswordModule,
        DialogModule,
        DropdownModule,
        AutoCompleteModule,FileUploadModule,
        CalendarModule,ChipsModule,InputMaskModule,InputNumberModule,CascadeSelectModule,MultiSelectModule,InputTextareaModule,
        Dialog,
        AuthRoutingModule,
        FormlayoutRoutingModule,
        BrowserModule, 
              BrowserAnimationsModule, 
            DialogModule, 
            ButtonModule
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ModelefactureModule { }
