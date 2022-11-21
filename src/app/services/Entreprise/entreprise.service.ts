import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {

    private url : string = environment.baseUrl+"entreprises/";

    constructor(private http : HttpClient) { }

    public getAll():Observable<any>{
        return this.http.get(this.url);
    }

    public getById(id:number):Observable<any>{
        return this.http.get(this.url+id);
    }
}
