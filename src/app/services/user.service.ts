import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }
  createUser(data:any):Observable<any>{
    let urlService = environment.url_base + "creaUsuario"
    return this._http.post(urlService, data)
  } 

  readAllUsers():Observable<any>{
    let urlService = environment.url_base+ "usuarios";
    return this._http.get(urlService)
  }
  deleteUser(id:number):Observable<any>{
    let urlService = environment.url_base+ "eliminaUsuario/"+ id;
    return  this._http.get(urlService)
  }
  // Pendiente reviar API parar editar
  editUser(data: any):Observable<any>{
    let urlService = environment.url_base+ "editaUsuario/"+ data.id;
    return  this._http.get(urlService, data)
  }
}
