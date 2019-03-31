import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout.component';

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
            /* {
                path: 'charts',
                loadChildren: './charts/charts.module#ChartsModule'
            }, */
            /* {
                path: 'components',
                loadChildren:
                    './material-components/material-components.module#MaterialComponentsModule'
            }, */
            {
                path: 'prediction',
                loadChildren: './prediction/prediction.module#PredictionModule'
            },
            /* {
                path: 'grid',
                loadChildren: './grid/grid.module#GridModule'
            }, */
            {
                path: 'leaderboard',
                loadChildren: './leaderboard/leaderboard.module#LeaderboardModule'
            },
            {
                path: 'apimanagement',
                loadChildren: './apimanagement/apimanagement.module#ApimanagementModule'
            }
            /* {
                path: 'blank-page',
                loadChildren: './blank-page/blank-page.module#BlankPageModule'
            } */
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
