import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/models/Client/client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

    private url : string = environment.baseUrl + "clients/";

  constructor(private http : HttpClient) { }

  public save(client : Client):Observable<any>{
    return this.http.post(this.url, client);
  }

  public delete(id:number):Observable<any>{
    return this.http.delete(this.url+id);
  }
}
