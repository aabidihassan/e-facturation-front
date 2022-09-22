import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FormlayoutRoutingModule } from '../uikit/formlayout/formlayout-routing.module';


@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,
        DialogModule,
        DropdownModule,
        
        FormsModule,
        InputTextModule,
        InputTextareaModule,
        ButtonModule,
        FormlayoutRoutingModule,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
    declarations: [
    ]
})
export class AuthModule { }

