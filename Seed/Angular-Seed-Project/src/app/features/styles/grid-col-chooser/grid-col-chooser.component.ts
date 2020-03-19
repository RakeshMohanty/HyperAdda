import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ProductDialogComponent } from './../product-dialog/product-dialog.component';
import { Product } from './../models/product.model';
import { GridColumn } from './../../../shared';

@Component({
  selector: 'app-grid-col-chooser',
  templateUrl: './grid-col-chooser.component.html',
  styleUrls: ['./grid-col-chooser.component.scss']
})
export class GridColChooserComponent implements OnInit, AfterViewInit {
  allColumns: GridColumn[];
  hoverindex = -1;
  products: Product[];
  dataSource: MatTableDataSource<Product>;
  visibleColumns = [
    'select',
    'Pid',
    'Title',
    'Item1',
    'Item2',
    'Item3',
    'Item4',
    'Item5',
    'icon'
  ];
  selection = new SelectionModel<Product>(true, []);
  @ViewChild(MatSort)
  sort: MatSort;
  @ViewChild(MatPaginator)
  paginator: MatPaginator;

  constructor(private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Product>();
  }

  ngOnInit() {
    this.getProducts();
    this.allColumns = this.getGridColumns();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  rowMouseOver(row: any) {
    this.hoverindex = row.Pid;
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  add() {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '450px',
      data: new Product()
    });
  }

  edit(event: any, product: Product) {
    const message = `Product ('${product.Pid}': '${
      product.Title
    }') Edited Susccessfully`;
    alert(message);
    event.stopPropagation();
  }

  delete(event: any, product: Product) {
    const message = `Product ('${product.Pid}': '${
      product.Title
    }') Deleted Susccessfully`;
    alert(message);
    event.stopPropagation();
  }

  deleteAll() {
    const message = `Selected Product(s) Deleted Susccessfully`;
    alert(message);
  }

  onColumnChooserClosed(event: any) {
    this.visibleColumns = [];
    this.visibleColumns.push('select');
    event.forEach(item => this.visibleColumns.push(item));
    this.visibleColumns.push('icon');
  }

  private getProducts() {
    this.fetch(data => {
      this.products = data;
      this.dataSource.data = this.products;
    }, 'products');
  }

  private fetch(mockData, file) {
    const req = new XMLHttpRequest();
    const path = `assets/data/${file}.json`;
    req.open('GET', path);
    req.onload = () => {
      mockData(JSON.parse(req.response));
    };
    req.send();
  }

  private getGridColumns(): GridColumn[] {
    return [
      { Name: 'Pid', Visible: true },
      { Name: 'Title', Visible: true },
      { Name: 'Item1', Visible: true },
      { Name: 'Item2', Visible: true },
      { Name: 'Item3', Visible: true },
      { Name: 'Item4', Visible: true },
      { Name: 'Item5', Visible: true },
      { Name: 'Item6', Visible: false },
      { Name: 'Item7', Visible: false },
      { Name: 'Item8', Visible: false },
      { Name: 'Item9', Visible: false },
      { Name: 'Item10', Visible: false },
      { Name: 'Item11', Visible: false },
      { Name: 'Item12', Visible: false },
      { Name: 'Item13', Visible: false },
      { Name: 'Item14', Visible: false },
      { Name: 'Item15', Visible: false },
      { Name: 'Item16', Visible: false },
      { Name: 'Item17', Visible: false },
      { Name: 'Item18', Visible: false }
    ];
  }


}
