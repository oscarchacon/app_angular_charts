/**
 * CODIGO CREADO POR FELIPE ROCHA
 */
import { Injectable } from '@angular/core';
import { Response, ResponseOptions } from '@angular/http';
import { Error } from './grafico-app/_classes/Error';

import { ToastAlertService } from './toast-alert/toast-alert.service';

@Injectable()
export class CustomErrorHandlerService {
  constructor(public alert: ToastAlertService) {}

  tryParseError(error: Response): any {
    try {
      return /*error.json().error*/;
    } catch (ex) {
      try {
        return error;
      } catch (ex) {
        return error.toString();
      }
    }
  }

  parseCustomServerError(error: Error): any {
    const title = error.Codigo;
    const body = error.Descripcion;
    return { title, body };
  }

  createCustomError(error: Error): Response {
    try {
      const parsedError = this.parseCustomServerError(error);
      const responseOptions = new ResponseOptions({
        body: {
          error: { title: parsedError.title, message: parsedError.body }
        },
        status: 400,
        headers: null,
        url: null
      });
      return new Response(responseOptions);
    } catch (ex) {
      const responseOptions = new ResponseOptions({
        body: { title: 'Error desconocido', message: 'Ocurrió un error desconocido.' },
        status: 400,
        headers: null,
        url: null
      });
      return new Response(responseOptions);
    }
  }

  showToast(error: any): void {
    this.alert.error(error.body, error.title, true);
  }

  parseCustomServerErrorToString(error: Error): string {
    const parsedError = this.createCustomError(error);
    this.showToast(error);
    try {
      return JSON.stringify(this.tryParseError(parsedError));
    } catch (ex) {
      try {
        return error.Descripcion;
      } catch (error) {
        return error.toString();
      }
    }
  }
}

