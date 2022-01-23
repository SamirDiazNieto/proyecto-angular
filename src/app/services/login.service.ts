import { Injectable } from '@angular/core';
import {HttpClient}from '@angular/common/http'
import { Observable } from 'rxjs';
import { LoginDto } from '../models/login-dto';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private _http: HttpClient) { }
  get userStorage(): any {
    return localStorage.getItem('user')? true:false;
  }
  loginUser(data:LoginDto): Observable<any>{
    let urlServices = environment.url_base + 'usuario';
    return this._http.post(urlServices, data);
  }
  saveUser(data: any):void{
    localStorage.setItem('user', JSON.stringify(data));
  }
  logOut():void{
    localStorage.removeItem('user');
  }
}
