import { ProductDialogComponent } from './../product-dialog/product-dialog.component';
import { Component, OnInit, AfterViewInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { MatDialog } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Product } from './../models/product.model';
import { LoaderService } from '../../../core';
import { ProductSliderComponent } from './../product-slider/product-slider.component';
import { MessageService } from '../../../main';

@Component({
  selector: 'app-slider-form',
  templateUrl: './slider-form.component.html',
  styleUrls: ['./slider-form.component.scss']
})
export class SliderFormComponent implements OnInit, AfterViewInit {
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

  constructor( private dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver,
    private loader: LoaderService,
    private messageService: MessageService) {
    this.dataSource = new MatTableDataSource<Product>();
  }

  ngOnInit() {
    this.getProducts();
    this.loader
      .onFormClose()
      .subscribe(isClosed => this.closeSlider(isClosed));
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

  addpopup() {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '450px',
      data: new Product()
    });
  }

  addslider() {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ProductSliderComponent);
    // this.loader.addDynamicComponent(componentFactory, 450, new Product());
    this.loader.addDynamicComponent(componentFactory, 750, this.products[0]);
  }

  closeSlider(isClosed: boolean) {
    if (isClosed) {
      this.messageService.success('Data saved successfully');
    }
  }

  addmain() {
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
