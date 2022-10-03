import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Utilisateur } from '../models/Utilisateur/utilisateur';
import { ProfileService } from '../services/auth/Profile/profile.service';
import { LayoutService } from "./service/app.layout.service";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit{

    items!: MenuItem[];

    user !: Utilisateur;

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    imageurl : SafeUrl | null = null;

    constructor(public layoutService: LayoutService, private router : Router, private profileService : ProfileService, private sanitizer: DomSanitizer) { }

    ngOnInit(){
        this.profileService.profile().subscribe(data=>{
            this.user = data;
            this.profileService.logo(this.user).subscribe(dt=>{
                this.user.entreprise.file = new Blob([dt.body!],
                    { type: `${dt.headers.get('Content-Type')};charset=utf-8`}),
                    dt.headers.get('File-Name')

                const unsafeImg = URL.createObjectURL(this.user.entreprise.file);
                this.imageurl = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
            },err=>{
                alert("Erroor");
            })
            localStorage.setItem("user", JSON.stringify(this.user));
        })
    }

    logout(){
        localStorage.clear();
        this.router.navigate(['auth/login'])
    }
}
