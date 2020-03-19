import { SharedModule } from './../../shared';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MaterialModule } from './../../shared/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StylesRoutingModule } from './styles-routing.module';
import { StylesComponent } from './styles.component';
import { StyleGuideComponent } from './style-guide/style-guide.component';
import { CommonComponentsComponent } from './common-components/common-components.component';
import { GridBasicComponent } from './grid-basic/grid-basic.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UserService } from './grid-basic/user.service';
import { GridColChooserComponent } from './grid-col-chooser/grid-col-chooser.component';
import { GridRowDetailsComponent } from './grid-row-details/grid-row-details.component';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { PopupWindowComponent } from './popup-window/popup-window.component';
import { SliderFormComponent } from './slider-form/slider-form.component';
import { ProductSliderComponent } from './product-slider/product-slider.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    StylesRoutingModule
  ],
  declarations: [StylesComponent, StyleGuideComponent,
    CommonComponentsComponent, GridBasicComponent,
     NotificationsComponent, GridColChooserComponent,
     GridRowDetailsComponent, ProductDialogComponent, PopupWindowComponent, SliderFormComponent, ProductSliderComponent],
    providers: [UserService, DatePipe],
    entryComponents: [ProductDialogComponent, PopupWindowComponent, ProductSliderComponent]
})
export class StylesModule { }
