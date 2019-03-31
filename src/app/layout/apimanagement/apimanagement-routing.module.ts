import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ApimanagementComponent } from './apimanagement.component';

const routes: Routes = [
    {
        path: '',
        component: ApimanagementComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ApimanagementRoutingModule {}