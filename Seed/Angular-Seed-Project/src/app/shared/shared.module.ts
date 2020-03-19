import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ColumnChooserComponent } from './column-chooser/column-chooser.component';
import { SearchPipe } from './custom-pipe/search-callback.pipe';

@NgModule({
  imports: [
    CommonModule, MaterialModule, FormsModule, RouterModule, ReactiveFormsModule
  ],
  declarations: [ColumnChooserComponent, SearchPipe],
  exports: [ColumnChooserComponent, SearchPipe]
})
export class SharedModule { }
