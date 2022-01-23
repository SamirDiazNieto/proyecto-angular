import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { DesarrolloWebComponent } from './course/desarrollo-web/desarrollo-web.component';
import { JsMasterComponent } from './course/js-master/js-master.component';
import { AngularComponent } from './course/angular/angular.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {
        path:'',
        redirectTo:'home', pathMatch:'full'
      },
      {
        path:'home',
       component: DashboardComponent
      },
      {
        path:'usuarios',
       loadChildren:()=> import('./user/user.module').then(m => m.UserModule)
      },
      {
        path:'cursos',
       loadChildren:()=> import('./course/course.module').then(m => m.CourseModule)
      },
      {
        path:'mis-datos',
       loadChildren:()=> import('./actualizar/actualizar.module').then(m => m.ActualizarModule)
      },
      {
        path:'cursos/desarrollo-web',
       loadChildren:()=> import('./course/desarrollo-web/desarrollo-web.module').then(m => m.DesarrolloWebModule)
      },
      {
        path:'cursos/js-master',
       loadChildren:()=> import('./course/js-master/js-master.module').then(m => m.JsMasterModule)
      },
      {
        path:'cursos/angular',
       loadChildren:()=> import('./course/angular/angular.module').then(m => m.AngularModule)
      },

    ]
  },

  {
    path:'',
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
