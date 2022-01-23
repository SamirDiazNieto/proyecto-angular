import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { UserGuard } from './guards/user.guard';
import { RegisterGuard } from './guards/register.guard';

const routes: Routes = [
  {
    canActivate: [UserGuard],
    path:'',
    loadChildren:()=> import('./pages/home/home.module').then( m=> m.HomeModule)
  },
  {
    canActivate: [LoginGuard],
    path:'login',
    loadChildren:()=> import('./pages/login/login.module').then( m=> m.LoginModule)
  },
  {
    canActivate: [RegisterGuard],
    path:'register',
    loadChildren:()=> import('./pages/register/register.module').then( m=> m.RegisterModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

