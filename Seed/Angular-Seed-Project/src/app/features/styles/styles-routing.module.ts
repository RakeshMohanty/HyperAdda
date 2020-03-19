import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StylesComponent } from './styles.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { CommonComponentsComponent } from './common-components/common-components.component';
import { GridBasicComponent } from './grid-basic/grid-basic.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { GridColChooserComponent } from './grid-col-chooser/grid-col-chooser.component';
import { GridRowDetailsComponent } from './grid-row-details/grid-row-details.component';
import { SliderFormComponent } from './slider-form/slider-form.component';
const routes: Routes = [
  {
    path: '', component: StylesComponent,
    children: [
      { path: 'style-guide', component: StyleGuideComponent },
      { path: 'components', component: CommonComponentsComponent },
      { path: 'grid-basic', component: GridBasicComponent },
      { path: 'grid-col-chooser', component: GridColChooserComponent },
      { path: 'grid-row-details', component: GridRowDetailsComponent },
      { path: 'slider-form', component: SliderFormComponent },
      { path: 'notifications', component: NotificationsComponent },
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StylesRoutingModule { }
