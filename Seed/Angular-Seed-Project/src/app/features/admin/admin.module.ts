import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../shared/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { LauncherComponent } from './launcher/launcher.component';

@NgModule({
  imports: [
    CommonModule, MaterialModule,
    AdminRoutingModule
  ],
  declarations: [AdminComponent, LauncherComponent]
})
export class AdminModule { }
