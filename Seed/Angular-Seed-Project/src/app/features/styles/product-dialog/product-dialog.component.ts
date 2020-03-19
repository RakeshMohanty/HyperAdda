import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Product } from './../models/product.model';
import { DrawerComponent } from '../../../core';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss']
})
export class ProductDialogComponent implements DrawerComponent, OnInit {
  @Input() sliderFormData: Product;
  roles = ['Developer', 'Security Expert', 'UX Designer', 'Tester'];
  product: Product;
  title = new FormControl('', [Validators.required]);
  item1 = new FormControl('', [Validators.required]);

  constructor(private dialogRef: MatDialogRef<ProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public inputdata: Product) {}

  ngOnInit() {
    this.product = this.inputdata;
  }

  getErrorMessageFirstName(field: string) {
    return this.title.hasError('required') ? `You must enter ${field}` : '';
  }

  getErrorMessageLastName(field: string) {
    return this.item1.hasError('required') ? `You must enter ${field}` : '';
  }

  save() {
    // if (this.user.userId != null && this.user.userId > 0) {
    //   this.userService.updateUser(this.user.userId, this.user).subscribe(user => {
    //     this.dialogRef.close(user);
    //   });
    // } else {
    //   this.userService.addUser(this.user).subscribe(user => {
    //   this.dialogRef.close(user);
    //   });
    // }
  }

  dismiss() {
    this.dialogRef.close(null);
  }

}
