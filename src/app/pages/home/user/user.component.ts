import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/services/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

   usuarios: any = Array<any>();
   usuariosCopia: any = Array<any>();
   formUser:any;
  constructor(private _service:UserService, private _router:Router) { }

  ngOnInit(): void {
    this.obtieneUsuarios();
    this.formUser = new FormGroup({
      nombre: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl('', Validators.required),
      sueldo: new FormControl('', Validators.required),
      contrasena: new FormControl(''),
      id: new FormControl(''),
    });


  }

  obtieneUsuarios(){
    this._service.readAllUsers().subscribe(data=>{
      this.usuarios = data;
      this.usuariosCopia = data;
      console.log(data)
      localStorage.setItem("usuarios", data.length)
    })
  }

  filtrarUsuarios(nombre:any){
    this.usuariosCopia= this.usuarios.filter((x:any) => x.nombre.includes(nombre.target.value) || x.correo.includes(nombre.target.value) || x.fechaNacimiento.includes(nombre.target.value) || x.sueldo.includes(nombre.target.value)  );
  }

  agregarUsuario(){ 
    
    const {nombre, correo, fechaNacimiento, sueldo} = this.formUser.value;
    this._service.createUser({nombre, correo, fechaNacimiento, sueldo}).subscribe(data =>{

      if (data) {
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
          title: `Usuario ${nombre} fue creado con Exito Exitoso`
        })
        this.obtieneUsuarios();
      }else{
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
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
          title: 'Usuario no Creado'
        })
      }
    })
  }
  limpiarForm(){
    this.formUser.reset()
    // this.formUser.get("id").setValue("")
    // this.formUser.get("nombre").setValue("")
    // this.formUser.get("contrasena").setValue("")
    // this.formUser.get("sueldo").setValue("")
    // this.formUser.get("correo").setValue("")
    // this.formUser.get("fechaNacimiento").setValue("")
  }

  eliminarUsuario(nombre:any, id:number){
    Swal.fire({
      icon: 'warning',
      iconColor:'#ff3060',
      html:`<h3>¿Estas seguro de eliminar al usuario <strong>${nombre}</strong>?</h3>`,
      showDenyButton: true,
      confirmButtonColor: '#03cf9f',
      confirmButtonText: 'Eliminar',
      denyButtonText: `No Eliminar`,
      denyButtonColor: `#ff3060`,
      


    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this._service.deleteUser(id).subscribe(data =>{

          if (data) {
            // Swal.fire('Eliminado!', 'El usuario se elimino correctamente', 'success')
            Swal.fire({
              icon: 'info',
              iconColor:'#03cf9f',
              title:`ELIMINADO`,
              html:`El usuario <b>${nombre}</b>  se elimino correctamente `,
              confirmButtonColor: '#03cf9f',
              confirmButtonText: 'Ok',
          
              
            })
            
            this.obtieneUsuarios();
          } else {
            // Swal.fire('Error', 'Ha ocurrido un error interno','error')
            Swal.fire({
              icon: 'error',
              iconColor:'#ff3060',
              title:`Ha ocurrido un error interno`,
              confirmButtonColor: '#ff3060',
              confirmButtonText: 'Ok',
          
              
            })
          }
        })
      } else if (result.isDenied) {
        Swal.fire('Error', 'El usuario No se elimino','error')
        Swal.fire({
          icon: 'info',
          iconColor:'#ff3060',
          title:'ERROR',
          html:`El usuario <b>${nombre}</b> NO se elimino `,
          confirmButtonColor: '#ff3060',
          confirmButtonText: 'Ok',
      
          
        })

      }
    })
  }
  editarUsuario(usuario:any){
    this.formUser.get("nombre").setValue(usuario.nombre)
    this.formUser.get("id").setValue(usuario.id)
    this.formUser.get("contrasena").setValue(usuario.contrasena)
    this.formUser.get("sueldo").setValue(usuario.sueldo)
    this.formUser.get("correo").setValue(usuario.correo)
    this.formUser.get("fechaNacimiento").setValue(usuario.fechaNacimiento)
    
  }
  actualizarUsuario(){
    // pendiente api
      const {id,nombre, correo, fechaNacimiento, sueldo} = this.formUser.value;
      // this._service.editUser({id, nombre, correo, fechaNacimiento, sueldo}).subscribe(data =>{
  
      //   if (data) {
      //     // this._notification.showSuccess("Usuario creado con exito","")
      //     const Toast = Swal.mixin({
      //       toast: true,
      //       position: 'top-end',
      //       showConfirmButton: false,
      //       timer: 1500,
      //       timerProgressBar: true,
      //       background: '#03df9f',
      //       iconColor: '#fff',
      //       color:"#fff",
      //       didOpen: (toast) => {
      //         toast.addEventListener('mouseenter', Swal.stopTimer)
      //         toast.addEventListener('mouseleave', Swal.resumeTimer)
      //       }
      //     })
          
      //     Toast.fire({
      //       icon: 'success',
      //       title: 'Usuario Modificado con Exito Exitoso'
      //     })
      //     this.obtieneUsuarios();
      //   }else{
      //     // this._notification.showError("Error Interno","")
      //     const Toast = Swal.mixin({
      //       toast: true,
      //       position: 'top-end',
      //       showConfirmButton: false,
      //       timer: 1500,
      //       timerProgressBar: true,
      //       background: '#ff3060',
      //       iconColor: '#fff',
      //       color:"#fff",
      //       didOpen: (toast) => {
      //         toast.addEventListener('mouseenter', Swal.stopTimer)
      //         toast.addEventListener('mouseleave', Swal.resumeTimer)
      //       }
      //     })
      //     Toast.fire({
      //       icon: 'error',
      //       title: 'Usuario no Modificado'
      //     })
      //   }
      // })
  }
}

