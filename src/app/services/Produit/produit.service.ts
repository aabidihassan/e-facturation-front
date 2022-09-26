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

    public save(produit : Produit):Observable<any>{
      return this.http.post(this.url, produit);
    }

    public delete(id:number):Observable<any>{
      return this.http.delete(this.url+id);
    }
}
