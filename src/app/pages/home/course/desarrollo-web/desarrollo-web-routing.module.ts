import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesarrolloWebComponent } from './desarrollo-web.component';

const routes: Routes = [
  {
    path:'',
   component: DesarrolloWebComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesarrolloWebRoutingModule { }
