import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesarrolloWebRoutingModule } from './desarrollo-web-routing.module';
import { DesarrolloWebComponent } from './desarrollo-web.component';


@NgModule({
  declarations: [
    DesarrolloWebComponent
  ],
  imports: [
    CommonModule,
    DesarrolloWebRoutingModule
  ]
})
export class DesarrolloWebModule { }
