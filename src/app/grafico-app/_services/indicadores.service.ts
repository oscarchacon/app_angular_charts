/**
 * CODIGO CREADO POR OSCAR CHACON CAUTIN
 */
import { Injectable } from '@angular/core';
import { BaseService } from '../../base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomErrorHandlerService } from '../../custom-error-handler.service';
import { ToastAlertService } from '../../toast-alert/toast-alert.service';
import { Indicadores } from '../_classes/indicadores';
import { Http } from '@angular/http';

@Injectable()
export class IndicadoresService extends BaseService {

  private relativeUrl: string = 'bcstest/rest/indices/consultaIndices';

  constructor(
    protected http: HttpClient,
    // protected http: Http,
    protected errorHandler: CustomErrorHandlerService,
    protected alert: ToastAlertService) {
    super(http, errorHandler, alert);
  }

  GetCategorias(periodo: string, f_desde: string, f_hasta, indice?: string): Observable<Indicadores[]>{
    const obj = {
      periodo: periodo,
      f_desde: f_desde,
      f_hasta: f_hasta,
      indice: indice
    };
    let params = this.parametrosUrl(obj);
    return this.get(`${this.relativeUrl}${params}`).map(res => res.indicesItem);
    /*if(indice){
      return this.get(`${this.relativeUrl}?indice=${indice}&periodo=${periodo}&f_desde=${f_desde}&f_hasta=${f_hasta}`).map(res => res.indicesItem);
    }
    return this.get(`${this.relativeUrl}?periodo=${periodo}&f_desde=${f_desde}&f_hasta=${f_hasta}`).map(res => res.indicesItem);*/
  }
}
