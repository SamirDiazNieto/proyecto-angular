import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JsMasterRoutingModule } from './js-master-routing.module';
import { JsMasterComponent } from './js-master.component';


@NgModule({
  declarations: [
    JsMasterComponent
  ],
  imports: [
    CommonModule,
    JsMasterRoutingModule
  ]
})
export class JsMasterModule { }
