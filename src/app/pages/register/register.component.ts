import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterDto } from 'src/app/models/register-dto';
import { RegisterService } from 'src/app/services/register.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  formRegister: any;
  objRegister: any ;
  emailFormat = '^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-])+.)+([a-zA-Z0-9]{2,4})+$';
  passFormat = '^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$&*]).*$';
  salarioFormat = '^(?=.{4,}$)(?=.*[0-9]).*$';

  constructor(private _service: RegisterService, private route: Router,private _serviceLogin: LoginService, ) {}

  ngOnInit(): void {
    this.formRegister = new FormGroup({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.emailFormat),
        ])
      ),
      nombre: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
      fechaNacimiento: new FormControl(
        '',
        Validators.compose([Validators.required])
      ),
      sueldo: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.salarioFormat),
        ])
      ),
      password: new FormControl(
        '',
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
    this.formRegister.get('email').disable();
    this.formRegister.get('nombre').disable();
    this.formRegister.get('fechaNacimiento').disable();
    this.formRegister.get('sueldo').disable();
    this.formRegister.get('password').disable();
    this.objRegister = new RegisterDto(
      this.formRegister.get('email').value,
      this.formRegister.get('nombre').value,
      this.formRegister.get('fechaNacimiento').value,
      this.formRegister.get('sueldo').value,
      this.formRegister.get('password').value
    );
    console.log(this.objRegister);
    this._service.register(this.objRegister).subscribe((information: any) => {
      this.formRegister.get('email').enable();
      this.formRegister.get('password').enable();
      this.formRegister.get('fechaNacimiento').enable();
      this.formRegister.get('sueldo').enable();
      this.formRegister.get('password').enable();
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
          title: 'No se pudo Registrar',
        });
      } else {
        this.formRegister.reset();

        this._serviceLogin.saveUser(this.objRegister);
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
          title: 'Registro Exitoso',
        });

        this.route.navigate(['/']);
      }
    });
  }
}
