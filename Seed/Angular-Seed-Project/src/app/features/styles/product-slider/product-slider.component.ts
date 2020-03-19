import { LoaderService } from './../../../core/service-loader/loader.service';
import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Product } from './../models/product.model';
import { DrawerComponent } from '../../../core';

@Component({
  selector: 'app-product-slider',
  templateUrl: './product-slider.component.html',
  styleUrls: ['./product-slider.component.scss']
})
export class ProductSliderComponent implements DrawerComponent, OnInit {
  @Input() sliderFormData: Product;
  product: Product;
  title = new FormControl('', [Validators.required]);
  item1 = new FormControl('', [Validators.required]);


  constructor(private loaderService: LoaderService) {}

  ngOnInit() {
    console.log(this.sliderFormData);
    this.product = this.sliderFormData;
    this.title.setValue(this.product.Title);
    this.item1.setValue(this.product.Item1);
  }

  getErrorMessageFirstName(field: string) {
    return this.title.hasError('required') ? `You must enter ${field}` : '';
  }

  getErrorMessageLastName(field: string) {
    return this.item1.hasError('required') ? `You must enter ${field}` : '';
  }

  save() {
    // do the save databse action here
    this.loaderService.closeForm();
  }

  dismiss() {
    this.loaderService.cancelForm();
  }

}
