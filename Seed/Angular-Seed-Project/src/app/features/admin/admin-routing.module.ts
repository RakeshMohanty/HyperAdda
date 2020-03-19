import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { LauncherComponent } from './launcher/launcher.component';
import { GuardService as AuthGuard } from './../../core';

const routes: Routes = [
  {
    path: '', component: AdminComponent,
    children: [
      { path: 'launcher', component: LauncherComponent, canActivate: [AuthGuard] },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
