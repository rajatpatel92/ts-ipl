import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApimanagementComponent } from './apimanagement.component';
import { ApimanagementRoutingModule } from './apimanagement-routing.module';

@NgModule({
  declarations: [ApimanagementComponent],
  imports: [
    CommonModule,
    ApimanagementRoutingModule
  ]
})
export class ApimanagementModule { }
