import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private _http: HttpClient) { }
  register(data:any):Observable<any>{
    let urlService = environment.url_base + "creaUsuario"
    return this._http.post(urlService, data)
  } 
}
