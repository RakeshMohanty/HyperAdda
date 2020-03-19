import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GridColumn } from '../models/grid-column';
@Component({
  selector: 'app-column-chooser',
  templateUrl: './column-chooser.component.html',
  styleUrls: ['./column-chooser.component.scss']
})
export class ColumnChooserComponent implements OnInit {
  @Input() columns: GridColumn[];
  @Output() columnChooserClosed = new EventEmitter<any>();
  query: string;
  constructor() { }
  ngOnInit() {
  }
  menuClosed() {
    const cols = [];
    this.columns.forEach( item => {
      if (item.Visible) {
        cols.push(item.Name);
      }
    });
    this.columnChooserClosed.emit(cols);
  }

 menuClick(event: any) {
    event.stopPropagation();
  }
  menuOpen(event: any) {
    this.query = '';
    event.stopPropagation();
  }
  removeText(column: GridColumn) {
   column.Visible = false;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.columns.filter(x => x.Name === filterValue);
  }

  filterUser(column: GridColumn) {
    return column;
  }

  columnClick(column: GridColumn, isSelected: boolean) {
    column.Visible = isSelected;
  }
}
