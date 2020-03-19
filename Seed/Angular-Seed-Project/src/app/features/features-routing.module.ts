import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesComponent } from './features.component';

const routes: Routes = [
  {
    path: '', component: FeaturesComponent,
    children: [
      {path: 'tools',
      loadChildren: 'app/features/tools/tools.module#ToolsModule'},
      {path: 'admin',
      loadChildren: 'app/features/admin/admin.module#AdminModule'},
      {path: 'styles',
      loadChildren: 'app/features/styles/styles.module#StylesModule'},
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
