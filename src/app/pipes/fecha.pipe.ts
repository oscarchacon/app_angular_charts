/**
 * CODIGO CREADO POR OSCAR CHACON CAUTIN
 */
import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';


@Pipe({
  name: 'fecha'
})
export class FechaPipe extends DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // return super.transform(value, 'dd/MM/y	yyy');
    if (value) {
      // console.log(value);
      const date = moment(value, ['DD/MM/YYYY', moment.ISO_8601, 'DD-MM-YYYY'])['_d'];
      return super.transform(date, 'dd/MM/yyyy');
    }
  }

}
