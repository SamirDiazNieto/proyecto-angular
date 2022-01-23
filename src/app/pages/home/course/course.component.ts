import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  cursos: any = Array<any>();
  cursosCopia: any = Array<any>();
  formCourse:any;
  public datos = [ 
    { id: 1, nombre: "Desarrollo Web", descripcion: "Curso de HTML, CSS y JS", fecha:'1995-08-18T00:00:00' , semanas:3, url: 'desarrollo-web' }, 
    { id: 2, nombre: "JavaScript Master", descripcion: "Curso avanzado JS", fecha:"1997-08-18T00:00:00", semanas:3, url: 'js-master'  }, 
    { id: 3, nombre: "Angular", descripcion: "Curso de TypeScript", fecha:"1999-08-18T00:00:00", semanas:3, url: 'angular'  }, 
    { id: 4, nombre: "Sprintboot", descripcion: "Curso de JAVA", fecha:"2000-08-18T00:00:00", semanas:3, url: null   }
]

  constructor(private _service:CoursesService, private _router:Router) { }

  ngOnInit(): void {
    this.obtieneCursos();
    this.formCourse = new FormGroup({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      fecha: new FormControl('', Validators.required),
      semanas: new FormControl('', Validators.required),
      id: new FormControl(''),
    });
  }
  obtieneCursos(){
setTimeout(() => {
  this.cursos = this.datos;
this.cursosCopia = this.datos;
localStorage.setItem("cursos", this.cursosCopia.length)
}, 500);

//  localStorage.setItem("cursos", datos.length)
    //  this._service.readAllCourses().subscribe(data=>{
    //    this.cursos = data;
    //    this.cursosCopia = data;
    //    localStorage.setItem("cursos", data.length)
    //  })
  }

  filtrarCursos(nombre:any){
    this.cursosCopia= this.cursos.filter((x:any) => x.nombre.includes(nombre.target.value) || x.fecha.includes(nombre.target.value) || x.descripcion.includes(nombre.target.value) );
  }

  limpiarForm(){
    this.formCourse.reset()
  }

  agregarCurso(){ 
    const {nombre, correo, fecha, semanas} = this.formCourse.value;
    this._service.createCourse({nombre, correo, fecha, semanas}).subscribe(data =>{

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
          title: `Curso ${nombre} fue creado con Exito Exitoso`
        })
        this.obtieneCursos();
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
          title: 'Curso no Creado'
        })
      }
    })
  }

  eliminarCurso(nombre:any, id:number){
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
      if (result.isConfirmed) {
        this._service.deleteCourse(id).subscribe(data =>{

          if (data) {
            Swal.fire({
              icon: 'info',
              iconColor:'#03cf9f',
              title:`ELIMINADO`,
              html:`El curso <b>${nombre}</b>  se elimino correctamente `,
              confirmButtonColor: '#03cf9f',
              confirmButtonText: 'Ok',
          
              
            })
            
            this.obtieneCursos();
          } else {
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
        Swal.fire('Error', 'El curso No se elimino','error')
        Swal.fire({
          icon: 'info',
          iconColor:'#ff3060',
          title:'ERROR',
          html:`El curso <b>${nombre}</b> NO se elimino `,
          confirmButtonColor: '#ff3060',
          confirmButtonText: 'Ok',
      
          
        })

      }
    })
  }

  editarCurso(curso:any){
    this.formCourse.get("id").setValue(curso.id)
    this.formCourse.get("nombre").setValue(curso.nombre)
    this.formCourse.get("descripcion").setValue(curso.descripcion)
    this.formCourse.get("fecha").setValue(curso.fecha)
    this.formCourse.get("semanas").setValue(curso.semanas)

  }

  actualizarCurso(){
    const {id,nombre, correo, fechaNacimiento, sueldo} = this.formCourse.value;
    this._service.editCourse({nombre, correo, fechaNacimiento, sueldo}, id).subscribe(data =>{

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
          title: 'Curso Modificado con Exito Exitoso'
        })
        this.obtieneCursos();
      }else{
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
          title: 'Curso no Modificado'
        })
      }
    })
  }
  detalleCurso(curso:any){

    if (!curso.url) {
      Swal.fire({
        icon: 'error',
        iconColor:'#03cf9f',
        title:`Aún no esta listo`,
        html:`El curso de <b>${curso.nombre}</b> aún no se ha  finalizado`,
        confirmButtonColor: '#03cf9f',
        confirmButtonText: 'Ok',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })

    } else {

      this._router.navigate([`/cursos/${curso.url}`],{
        state:{
          informacionCurso:curso
        }
      })
    }

  }
}
