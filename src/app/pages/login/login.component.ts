import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/models/login-dto';
import { LoginService } from 'src/app/services/login.service';
import { NotificationService } from 'src/app/services/notification.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formLogin: any;
  objLogin: any = new LoginDto('', '');
  emailFormat = '^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$';

  
  constructor(
    private _service: LoginService,
    private route: Router,
    private _notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.formLogin = new FormGroup({
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(this.emailFormat),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(10),
        ])
      ),
    });
  }

  onSubmit() {
    this.formLogin.get('email').disable();
    this.formLogin.get('password').disable();

    this.objLogin = new LoginDto(
      this.formLogin.get('email').value,
      this.formLogin.get('password').value
    );

    this._service.loginUser(this.objLogin).subscribe((information: any) => {
      
      this.formLogin.get('email').enable();
      this.formLogin.get('password').enable();


      if (information.id == 0) {

        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          background: '#ff3060',
          iconColor: '#fff',
          color:"#fff",
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        Toast.fire({
          icon: 'error',
          title: 'Datos Errados'
        })

      } else {

        this.formLogin.reset();
        console.log(information);
        information ={...information,...this.objLogin};
        this._service.saveUser(information);
        this.route.navigate(['/']);
        
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          background: '#03df9f',
          iconColor: '#fff',
          color:"#fff",
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        })
        
        Toast.fire({
          icon: 'success',
          title: 'Ingreso Exitoso'
        })

      }
    });
  }

}
