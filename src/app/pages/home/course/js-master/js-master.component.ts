import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-js-master',
  templateUrl: './js-master.component.html',
  styleUrls: ['./js-master.component.css']
})
export class JsMasterComponent implements OnInit {

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
