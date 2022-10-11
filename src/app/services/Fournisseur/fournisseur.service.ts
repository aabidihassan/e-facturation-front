import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Fournisseur } from 'src/app/models/Fournisseur/fournisseur';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

    private url : string = environment.baseUrl + "fournisseurs/";

    constructor(private http : HttpClient) { }

    public save(fournisseur : Fournisseur):Observable<any>{
      return this.http.post(this.url, fournisseur);
    }

    public delete(id:number):Observable<any>{
      return this.http.get(this.url+id);
    }
}
