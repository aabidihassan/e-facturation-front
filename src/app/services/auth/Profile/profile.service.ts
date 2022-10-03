import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Utilisateur } from 'src/app/models/Utilisateur/utilisateur';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

    private url : string = environment.baseUrl+"accounts/"

  constructor(private http : HttpClient) { }

  public profile():Observable<any>{
    return this.http.get(this.url+"profile");
  }

  public logo(user : Utilisateur):Observable<any>{
    return this.http.get(this.url + "logo/" + user.entreprise.logo, {
        reportProgress: true,
      observe: 'events',
      responseType: 'blob' as 'json'
    })
  }
}
