import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE
} from '@angular/material/core';
import * as moment from 'moment';
import { MatDialog } from '@angular/material';
import { MessageService } from '../../../main';
import { PopupWindowComponent } from './../popup-window/popup-window.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY'
  },
  display: {
    dateInput: 'DD/MM/YYYY, HH:mm',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'MM/DD/YYYY',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-common-components',
  templateUrl: './common-components.component.html',
  styleUrls: ['./common-components.component.scss'],
  providers: [
    // { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
    // The locale would typically be provided on the root module of your application. We do it at
    // the component level here, due to limitations of our example generation script.
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },

    // `MomentDateAdapter` and `MAT_MOMENT_DATE_FORMATS` can be automatically provided by importing
    // `MatMomentDateModule` in your applications root module. We provide it at the component level
    // here, due to limitations of our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
    // {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ]
})
export class CommonComponentsComponent implements OnInit {
  private format = 'MM/DD/YYYY, HH:mm';
  startDate = new Date(1990, 0, 1);
  expand = false;
  date = new FormControl(moment());
  date2 = new FormControl(moment());
  flashMessageInput = new FormControl('Hello world! message from the Toaster.');
  popupmessage = new FormControl();
  confirmmessage = new FormControl();
  constructor(
    private adapter: DateAdapter<any>,
    private messageService: MessageService,
    private dialog: MatDialog
  ) {
    const now = moment();
    console.log('Date Format - YYYY/MM/DD HH:mm:ss', now.format(this.format));
    console.log(now.add(7, 'days').format(this.format));
    this.popupmessage.setValue(
      'When downloading an ebook from Intercom (which are great resources by the way),' +
        '\n\nThe microcopy on the confirmation modal lets you know where you will find it.'
    );

    this.confirmmessage.setValue(
      'This cannot be Undone! \nThis will permanently delete this property'
    );
  }

  french() {
    this.adapter.setLocale('fr');
  }

  japanese() {
    this.adapter.setLocale('ja');
  }

  english() {
    this.adapter.setLocale('en');
  }

  primary() {
    this.messageService.primary(this.flashMessageInput.value);
  }

  warning() {
    this.messageService.warning(this.flashMessageInput.value);
  }

  success() {
    this.messageService.success(this.flashMessageInput.value);
  }

  alert() {
    this.messageService.alert(this.flashMessageInput.value);
  }

  inputEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    console.log(event.value);
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    const val = moment(event.value)
      .add(23, 'h')
      .add(44, 'm');
    this.date.setValue(val);
  }
  ngOnInit() {}

  showPopup() {
    this.dialog.open(PopupWindowComponent, {
      width: '650px',
      height: '400px',
      data: this.popupmessage.value,
      autoFocus: false
    });
  }

  displayConfirm() {
    this.messageService
      .confirm(this.confirmmessage.value)
      .subscribe(x => console.log(x));
  }
}
