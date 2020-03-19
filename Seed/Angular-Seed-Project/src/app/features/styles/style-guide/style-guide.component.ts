import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith, take} from 'rxjs/operators';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {NgZone, ViewChild} from '@angular/core';



export interface SampleProcess {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-style-guide',
  templateUrl: './style-guide.component.html',
  styleUrls: ['./style-guide.component.scss']
})
export class StyleGuideComponent implements OnInit {
  panelOpenState = false;
  step = 0;
  // fxFlex = '25';
  options: FormGroup;
  email = new FormControl('', [Validators.required, Validators.email]);
  myControl = new FormControl();
  numbers: string[] = ['Analytical Activity', 'Detection', 'Defect Confirmation', 'Enumeration',
  'Enumeration Confirmation', 'Identification', 'Sample Preparation', 'Insemination', 'Classification', 'Distribution'];
  filteredOptions: Observable<string[]>;

  searchAutoControl = new FormControl();

  animalControl = new FormControl('', [Validators.required]);

  @ViewChild('autosize') autosize: CdkTextareaAutosize;


  labelPosition = 'after';

  steps: SampleProcess[] = [
    {value: 'step-0', viewValue: 'Analytical Activity'},
    {value: 'step-1', viewValue: 'Detection'},
    {value: 'step-2', viewValue: 'Defect Confirmation'},
    {value: 'step-3', viewValue: 'Enumeration'},
    {value: 'step-4', viewValue: 'Enumeration Confirmation'},
    {value: 'step-5', viewValue: 'Identification'},
    {value: 'step-6', viewValue: 'Insemination'},
    {value: 'step-7', viewValue: 'Classification'},
    {value: 'step-8', viewValue: 'Distribution'}
  ];
  disabled = false;
  indeterminate = true;

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }

  constructor(private ngZone: NgZone) {}


  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
        .subscribe(() => this.autosize.resizeToFitContent(true));
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.numbers.filter(option => option.toLowerCase().includes(filterValue));
  }

}
