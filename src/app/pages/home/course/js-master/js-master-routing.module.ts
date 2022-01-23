import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JsMasterComponent } from './js-master.component';

const routes: Routes = [
  {
    path:'',
   component: JsMasterComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JsMasterRoutingModule { }
