import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Facture } from 'src/app/models/Facture/facture';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

    private url : string = environment.baseUrl + "factures/"

  constructor(private http : HttpClient) { }

  public save(facture : Facture):Observable<any>{
    return this.http.post(this.url, facture);
  }

  public getFacturesByEntreprise():Observable<any>{
    return this.http.get(this.url);
  }
}
