import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import {Router} from '@angular/router'
import { NotificationService } from 'src/app/services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private _loginSerive : LoginService, private _route: Router, private _notification: NotificationService ) { }

  ngOnInit(): void {
  }
  cerrarSesion(){
    this._loginSerive.logOut();
    this._route.navigate(['/login']);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true,
      background: '#4e73de',
      iconColor: '#fff',
      color:"#fff",
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'info',
      title: 'Ha cerrado sesión '
    })
  
  }
  // seccionCursos(){
  //   this._route.navigate(['/cursos']);
  // }
  // seccionActualzar(){
  //   this._route.navigate(['/mis-datos']);
  // }

}
