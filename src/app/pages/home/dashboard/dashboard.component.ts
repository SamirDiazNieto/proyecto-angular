import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public nombreUser: string = 'Usuario';
  public profesionUser: string = 'Sr / Sra';
  public data: any;
  public companeiros: string = ""
  public cursos: string = ""
  public insignias: number = 0
  constructor() {}

  ngOnInit(): void {
    this.data =JSON.parse(localStorage.getItem('user')|| '{}')
    this.data.profesion
    this.nombreUser = !this.data.nombre? 'Usuario' : this.data.nombre;
    this.data.profesion = this.data.profesion===1? 'Desarrollador': 'Ingeniero'
    this.profesionUser = !this.data.profesion? 'Sr / Sra' : this.data.profesion;
    this.companeiros = localStorage.getItem('usuarios') || '0'
    this.cursos = localStorage.getItem('cursos') || '0'
    this.insignias = parseInt(this.cursos) -1
  }

}
