import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActualizarRoutingModule } from './actualizar-routing.module';
import { ActualizarComponent } from './actualizar.component';

import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ActualizarComponent,
  ],
  imports: [
    CommonModule,
    ActualizarRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ActualizarModule { }
