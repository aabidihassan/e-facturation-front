import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Produit } from 'src/app/models/Produit/produit';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

    private url : string = environment.baseUrl + "produits/";

    constructor(private http : HttpClient) { }

    public save(formData : FormData):Observable<any>{
      return this.http.post(this.url, formData);
    }

    public delete(id:string):Observable<any>{
      return this.http.get(this.url+id);
    }

    public logo(produit : Produit):Observable<any>{
        return this.http.get(this.url + "photo/" + produit.photo, {
            reportProgress: true,
          observe: 'events',
          responseType: 'blob' as 'json'
        })
      }
}
