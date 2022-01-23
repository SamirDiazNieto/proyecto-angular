import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CourseRoutingModule } from './course-routing.module';
import { CourseComponent } from './course.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CourseComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    ReactiveFormsModule,
  ]
})
export class CourseModule { }
