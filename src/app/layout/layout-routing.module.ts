import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { AdminAccessGuard } from '../shared/guard';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'dashboard'
            },
            {
                path: 'dashboard',
                loadChildren: './dashboard/dashboard.module#DashboardModule'
            },
            {
                path: 'prediction',
                loadChildren: './prediction/prediction.module#PredictionModule'
            },
            {
                path: 'leaderboard',
                loadChildren: './leaderboard/leaderboard.module#LeaderboardModule'
            },
            {
                path: 'apimanagement',
                loadChildren: './apimanagement/apimanagement.module#ApimanagementModule',
                canActivate: [AdminAccessGuard]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
