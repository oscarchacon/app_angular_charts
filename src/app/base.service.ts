/**
 * CODIGO CREADO POR FELIPE ROCHA
 */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ToastAlertService } from './toast-alert/toast-alert.service';
import { Observable } from 'rxjs';
import { Respuesta } from './grafico-app/_classes/Respuesta';
import {
  Headers,
  Request,
  RequestOptions,
  Response,
  Http
} from '@angular/http';
import 'rxjs/Rx';
import { CustomErrorHandlerService } from './custom-error-handler.service';

@Injectable()
export class BaseService {
  protected baseUrl: string;

  headers = new Headers();

  private requestOptions: RequestOptions;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  constructor(
    protected http: HttpClient,
    // protected http: Http,
    protected errorHandler: CustomErrorHandlerService,
    protected alert: ToastAlertService
  ) {
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.requestOptions = new RequestOptions({headers: this.headers});
    this.baseUrl = environment.baseUrl;
  }

  private log(message: string) {
    // this.alert.error(message);
    console.log(message);
  }

  protected get(relativeUrl: string): Observable<Respuesta> {
    console.log('GET', this.baseUrl + relativeUrl);
    return this.http
      .get<Respuesta>(this.baseUrl + relativeUrl, this.httpOptions)
      //.get(this.baseUrl + relativeUrl, this.requestOptions).map(res => {return res.json()});
      .catch((error: any) => this.handleError(error))
      .finally(() => { });
  }

  /*protected post(relativeUrl: string, obj: any): Observable<Respuesta> {
    console.log('POST', this.baseUrl + relativeUrl, obj);
    return this.http
      //.post(this.baseUrl + relativeUrl, obj, this.httpOptions)
      .post<Respuesta>(this.baseUrl + relativeUrl, obj, this.httpOptions)
      .catch((error: any) => this.handleError(error))
      .finally(() => { });
  }

  protected postFormData(relativeUrl: string, obj: FormData): Observable<Respuesta> {
    console.log('POST FormData', this.baseUrl + relativeUrl, obj);
    return this.http
      .post<Respuesta>(this.baseUrl + relativeUrl, obj)
      .catch((error: any) => this.handleError(error))
      .finally(() => { });
  }

  protected delete(relativeUrl: string): Observable<Respuesta> {
    console.log('DELETE', this.baseUrl + relativeUrl);
    return this.http
      .delete<Respuesta>(this.baseUrl + relativeUrl, this.httpOptions)
      .catch((error: any) => this.handleError(error))
      .finally(() => { });
  }

  protected put(relativeUrl: string, obj: any): Observable<Respuesta> {
    console.log('PUT', this.baseUrl + relativeUrl, obj);
    return this.http
      .put<Respuesta>(this.baseUrl + relativeUrl, obj, this.httpOptions)
      .catch((error: any) => this.handleError(error))
      .finally(() => { });
  }*/

  protected handleResponse(res: Response): Respuesta {
    const data = res.json();
    if (data.PoseeErrores) {
      this.alert.error(`Error: ${data.Errores[0].Codigo}`);
      console.log(`Server Error: ${data.Errores[0].Codigo}`);
      throw this.errorHandler.createCustomError(data.Errores[0]);
    } else {
      return data;
    }
  }

  protected handleError(err: any) {
    if (err.error.PoseeErrores) {
      const error = err.error.Errores[0];
      this.alert.error(`Error de Servidor: ${error.Codigo} - ${error.Descripcion}`);
    } else {
      console.error('handleError:', err);
    }

    return Observable.throw(this.errorHandler.tryParseError(err));
  }



  protected parametrosUrl(obj: any): string {
    let params: string;
    for (const key in obj)
    {
      if (obj[key]) {
        if (params) {
          params += '&';
        } else {
          params = '';
        }
        params += `${key}=${obj[key]}`;
      }
    }
    return `?${params}`;
  }
}
