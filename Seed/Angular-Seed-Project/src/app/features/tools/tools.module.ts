import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './../../shared/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ToolsRoutingModule } from './tools-routing.module';

import { ToolsComponent } from './tools.component';
import { ContentComponent } from './content/content.component';
import { LabsiteGroupComponent } from './labsite-group/labsite-group.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ToolsRoutingModule
  ],
  declarations: [ToolsComponent, ContentComponent, LabsiteGroupComponent]
})
export class ToolsModule { }
