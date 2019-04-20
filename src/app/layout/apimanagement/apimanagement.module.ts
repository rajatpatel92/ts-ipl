import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApimanagementComponent } from './apimanagement.component';
import { ApimanagementRoutingModule } from './apimanagement-routing.module';
import { MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [ApimanagementComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    ApimanagementRoutingModule
  ]
})
export class ApimanagementModule { }
