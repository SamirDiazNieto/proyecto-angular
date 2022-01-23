import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UpdateDto } from 'src/app/models/update-dto';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.css']
})
export class ActualizarComponent implements OnInit {

  formUpdateUser: any;
   objUpdate: any ;
  emailFormat = '^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$';
  passFormat = '^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*]).*$';
  salarioFormat = '^(?=.{4,}$)(?=.*[0-9]).*$';

  constructor(private route: Router,private _serviceLogin: LoginService, private _serviceUser: UserService ) { }

  ngOnInit(): void {
    const {nombre, correo, fechaNacimiento, sueldo, contrasena} = JSON.parse(localStorage.getItem('user') || '0')
     this.formUpdateUser = new FormGroup({
       email: new FormControl(
         `${correo}`,
         Validators.compose([
           Validators.required,
           Validators.pattern(this.emailFormat),
         ])
       ),
       nombre: new FormControl(
        `${nombre}` ,
         Validators.compose([Validators.required, Validators.minLength(6)])
       ),
       fechaNacimiento: new FormControl(
        `${fechaNacimiento}`,
         Validators.compose([Validators.required])
       ),
       sueldo: new FormControl(
        `${sueldo}`,
         Validators.compose([
           Validators.required,
           Validators.pattern(this.salarioFormat),
         ])
       ),
       password: new FormControl(
        `${contrasena}`,
         Validators.compose([
           Validators.required,
           Validators.minLength(8),
           Validators.maxLength(10),
           Validators.pattern(this.passFormat),
         ])
       ),
     });
  }

   onSubmit() {
     this.formUpdateUser.get('email').disable();
     this.formUpdateUser.get('nombre').disable();
     this.formUpdateUser.get('fechaNacimiento').disable();
     this.formUpdateUser.get('sueldo').disable();
     this.formUpdateUser.get('password').disable();
     this.objUpdate = new UpdateDto(
       this.formUpdateUser.get('email').value,
       this.formUpdateUser.get('nombre').value,
       this.formUpdateUser.get('fechaNacimiento').value,
       this.formUpdateUser.get('sueldo').value,
       this.formUpdateUser.get('password').value
     );
     console.log(this.objUpdate);
     this._serviceUser.editUser(this.objUpdate).subscribe((information: any) => {
       this.formUpdateUser.get('email').enable();
       this.formUpdateUser.get('password').enable();
       this.formUpdateUser.get('fechaNacimiento').enable();
       this.formUpdateUser.get('sueldo').enable();
       this.formUpdateUser.get('password').enable();
       console.log(information);
       if (information.id == 0) {
         const Toast = Swal.mixin({
           toast: true,
           position: 'top-end',
           showConfirmButton: false,
           timer: 3000,
           timerProgressBar: true,
           background: '#ff3060',
           iconColor: '#fff',
           color: '#fff',
           didOpen: (toast) => {
             toast.addEventListener('mouseenter', Swal.stopTimer);
             toast.addEventListener('mouseleave', Swal.resumeTimer);
           },
         });
         Toast.fire({
           icon: 'error',
           title: 'No se pudo Actualizar tu usuarios',
         });
       } else {
         this.formUpdateUser.reset();
         this._serviceLogin.saveUser(this.objUpdate);
         const Toast = Swal.mixin({
           toast: true,
           position: 'top-end',
           showConfirmButton: false,
           timer: 1500,
           timerProgressBar: true,
           background: '#03df9f',
           iconColor: '#fff',
           color: '#fff',
           didOpen: (toast) => {
             toast.addEventListener('mouseenter', Swal.stopTimer);
             toast.addEventListener('mouseleave', Swal.resumeTimer);
           },
         });

         Toast.fire({
           icon: 'success',
           title: 'Actualización Exitoso',
         });

         this.route.navigate(['/']);
       }
     });
   }

}
