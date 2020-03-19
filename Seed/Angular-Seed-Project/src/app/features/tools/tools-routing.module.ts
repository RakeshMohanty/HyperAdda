import { LabsiteGroupComponent } from './labsite-group/labsite-group.component';
import { ContentComponent } from './content/content.component';
import { ToolsComponent } from './tools.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuardService as AuthGuard } from './../../core';

const routes: Routes = [
  {
    path: '', component: ToolsComponent,
    children: [
      { path: 'labsite-group', component: LabsiteGroupComponent, canActivate: [AuthGuard] },
      { path: 'content', component: ContentComponent, canActivate: [AuthGuard] }
    ]
  },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToolsRoutingModule { }
