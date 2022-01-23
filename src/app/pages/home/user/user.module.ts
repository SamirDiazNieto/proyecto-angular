import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';

import { ContrasenaPipe } from '../../../pipes/contrasena.pipe';
import { SalarioPipe } from 'src/app/pipes/salario.pipe';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserComponent,
    ContrasenaPipe,
     SalarioPipe,

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
  ]
})
export class UserModule { }
