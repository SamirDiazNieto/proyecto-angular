import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  constructor(private _http: HttpClient) { }
  
  createCourse(data:any):Observable<any>{
    let urlService = environment.url_base + "crearCurso"
    return this._http.post(urlService, data)
  } 

  readAllCourses():Observable<any>{
    let urlService = environment.url_base+ "cursos";
    return this._http.get(urlService)
  }
  deleteCourse(id:number):Observable<any>{
    let urlService = environment.url_base+ "eliminacurso/"+ id;
    return  this._http.get(urlService)
  }
  // Pendiente reviar API parar editar
  editCourse(data: any, id:number):Observable<any>{
    let urlService = environment.url_base+ "editacurso/"+ id;
    return  this._http.get(urlService, data)
  }
}
