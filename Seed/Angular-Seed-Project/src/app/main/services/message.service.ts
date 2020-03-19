import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { MatDialog } from '@angular/material';
import { ConfirmPopupComponent } from './../confirm-popup/confirm-popup.component';
import { ToastrService } from 'ngx-toastr';

const TIME_OUT = 5000;

@Injectable()
export class MessageService {

  constructor(private dialog: MatDialog, private toastr: ToastrService) { }

  confirm(message: string): Observable<boolean> {
    const dialogRef = this.dialog.open(ConfirmPopupComponent, {
      width: '500px',
      height: '240px',
      data: message,
      autoFocus: false
    });
    return dialogRef.afterClosed();
  }

  primary(message: string) {
    this.toastr.show(message, null , {
      toastClass: 'toast border-p',
      messageClass: 'custom-message',
      timeOut: TIME_OUT
    });
  }


  warning(message: string) {
    this.toastr.show(message, null , {
      toastClass: 'toast border-w',
      messageClass: 'custom-message',
      timeOut: TIME_OUT
    });
  }


  success(message: string) {
    this.toastr.show(message, null , {
      toastClass: 'toast border-s',
      messageClass: 'custom-message',
      timeOut: TIME_OUT
    });
  }


  alert(message: string) {
    this.toastr.show(message, null , {
      toastClass: 'toast border-a',
      messageClass: 'custom-message',
      timeOut: TIME_OUT
    });
  }
}
