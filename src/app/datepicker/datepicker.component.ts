/**
 * CODIGO CREADO POR OSCAR CHACON CAUTIN
 */
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap';
import * as moment from 'moment';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit, OnChanges {
  @Input() dateFormat = 'DD/MM/YYYY';
  @Input() value: Date;
  @Input() MaxDate: Date;
  @Input() MinDate: Date;
  @Input() smallmode = false;
  @Input() posicion: string = 'bottom';
  @Input() disabled: boolean = false;
  @Output() valueChange = new EventEmitter<Date>();

  constructor(private _localeService: BsLocaleService) {
    this._localeService.use('es');
  }

  ngOnInit() {
    if (this.value) {
      this.value = moment(this.value, [
        'DD/MM/YYYY',
        moment.ISO_8601,
        'DD-MM-YYYY'
      ])['_d'];
    }
    if (this.MaxDate) {
      this.MaxDate = moment(this.MaxDate, [
        'DD/MM/YYYY',
        moment.ISO_8601,
        'DD-MM-YYYY'
      ])['_d'];
    }

    if (this.MinDate) {
      this.MinDate = moment(this.MinDate, [
        'DD/MM/YYYY',
        moment.ISO_8601,
        'DD-MM-YYYY'
      ])['_d'];
    }
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  dateChange(): void {
    if(this.value != null){
      this.value.setSeconds(0);
      this.value.setMinutes(0);
      this.value.setHours(0);
      this.valueChange.emit(this.value);
    }
  }

  cleanInput(): void {
    this.value = null;
    this.valueChange.emit(this.value);
  }
}
