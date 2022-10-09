import { Component, OnInit } from '@angular/core';
import { Utilisateur } from 'src/app/models/Utilisateur/utilisateur';
import { ProfileService } from 'src/app/services/auth/Profile/profile.service';

@Component({
  selector: 'app-info-contact',
  templateUrl: './info-contact.component.html',
  styleUrls: ['./info-contact.component.scss']
})
export class InfoContactComponent implements OnInit {


  user !: Utilisateur;


  constructor( private profileService : ProfileService) { }

  ngOnInit() {

    this.profileService.profile().subscribe(data=>{
      this.user = data;
  })

  }
}
