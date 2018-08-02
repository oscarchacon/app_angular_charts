import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
// tslint:disable-next-line:import-blacklist


import { ToastAlert, ToastAlertType } from './toast-alert';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ToastAlertService {

  private subject = new Subject<ToastAlert>();
  private keepAfterRouteChange = false;

  constructor(private router: Router) {
      // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
      router.events.subscribe(event => {
          if (event instanceof NavigationStart) {
              if (this.keepAfterRouteChange) {
                  // only keep for a single route change
                  this.keepAfterRouteChange = false;
              } else {
                  this.clear();
              }
          }
      });
    }

    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string, title = null, autoClosable = true, keepAfterRouteChange = false) {
        this.alert(ToastAlertType.Success, message, title, autoClosable, keepAfterRouteChange);
    }

    error(message: string, title = null, autoClosable = false, keepAfterRouteChange = false) {
        this.alert(ToastAlertType.Error, message, title, autoClosable, keepAfterRouteChange);
    }

    info(message: string, title = null, autoClosable = true, keepAfterRouteChange = false) {
        this.alert(ToastAlertType.Info, message, title, autoClosable, keepAfterRouteChange);
    }

    warn(message: string, title = null, autoClosable = true, keepAfterRouteChange = false) {
        this.alert(ToastAlertType.Warning, message, title, autoClosable, keepAfterRouteChange);
    }

    alert(type: ToastAlertType, message: string, title, autoClosable = true, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        const alert: ToastAlert = <ToastAlert>{ type: type,
          title: title || this.title(type), message: message, autoClosable: autoClosable };
        this.subject.next(alert);
    }

    clear() {
        this.subject.next();
    }

    title(type: ToastAlertType) {
        switch (type) {
            case ToastAlertType.Success:
                return 'Exito';
            case ToastAlertType.Error:
                return 'Error';
            case ToastAlertType.Info:
                return 'Información';
            case ToastAlertType.Warning:
                return 'Alerta';
        }
    }
}
