import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Product } from './../models/product.model';
import { ProductDialogComponent } from './../product-dialog/product-dialog.component';

@Component({
  selector: 'app-grid-basic',
  templateUrl: './grid-basic.component.html',
  styleUrls: ['./grid-basic.component.scss']
})
export class GridBasicComponent implements OnInit, AfterViewInit {
  hoverindex = -1;
  products: Product[];
  dataSource: MatTableDataSource<Product>;
  columnList = [
    'select',
    'Pid',
    'Title',
    'Item1',
    'Item2',
    'Item3',
    'Item4',
    'Item5',
    'icon-column'
  ];
  selection = new SelectionModel<Product>(true, []);
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<Product>();
  }

  ngOnInit() {
    this.getProducts();
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
}
