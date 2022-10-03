import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ModelefactureModule } from 'src/app/demo/components/modelefacture/modelefacture.module';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModeleService {

    private url : string = environment.baseUrl+"modeles/";

  constructor(private http : HttpClient) { }

  public save(modele : ModelefactureModule):Observable<any>{
    return this.http.post(this.url, modele);
  }

  public download(path : string):Observable<any>{
    return this.http.get(this.url + path, {
        reportProgress: true,
        observe: 'events',
        responseType: 'blob'
    });
  }

  public delete(id:number):Observable<any>{
    return this.http.get(this.url + id);
  }
}
