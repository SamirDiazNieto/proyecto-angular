import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.css']
})
export class AngularComponent implements OnInit {

  infoCourse: any
  finalizoCurso: any
  constructor(private _router: Router) { 
    if (this._router.getCurrentNavigation()?.extras.state === undefined) {
      this._router.navigate(['cursos'])
    }else{
      this.infoCourse = this._router.getCurrentNavigation()?.extras?.state?.informacionCurso;
      console.log(this.infoCourse);
    }
  }

  ngOnInit(): void {
    this.finalizoCurso = this.infoCourse.fecha +(this.infoCourse.semanas*7)
    this.finalizoCurso = "18/01/22"
  }

}
