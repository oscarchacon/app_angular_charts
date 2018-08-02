import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatepickerComponent } from './datepicker.component';
import { BsDatepickerModule, defineLocale, esLocale, BsLocaleService} from 'ngx-bootstrap';
import { PipeCompartidoModule } from '../pipes/pipe-compartdo.module';

defineLocale('es', esLocale);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PipeCompartidoModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    DatepickerComponent
  ],
  providers: [
    BsLocaleService
  ],
  exports: [
    DatepickerComponent
  ]
})
export class BolsaDatepickerModule { }
