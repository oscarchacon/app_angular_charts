import { Component, OnInit } from '@angular/core';
import { ToastAlert, ToastAlertType } from "./toast-alert";
import { ToastAlertService } from "./toast-alert.service";

@Component({
  selector: 'toast-alert',
  templateUrl: './toast-alert.component.html',
  styleUrls: ['./toast-alert.component.css']
})
export class ToastAlertComponent implements OnInit {

  alerts: ToastAlert[] = [];

  constructor(private alertService: ToastAlertService) { }

    ngOnInit() {
        this.alertService.getAlert().subscribe((alert: ToastAlert) => {
            if (!alert) {
              this.alerts = [];
              return;
            }
            this.alerts.push(alert);
            if(alert.autoClosable){
                setTimeout(() => this.removeAlert(alert), 5000);
            }
      });
  }

  removeAlert(alert: ToastAlert) {
    alert.close = true;
    setTimeout(() => this.alerts = this.alerts.filter(x => x !== alert), 500);
  }

  cssClass(alert: ToastAlert) {
      if (!alert) {
          return;
      }
      switch (alert.type) {
          case ToastAlertType.Success:
              return 'alert alert-success';
          case ToastAlertType.Error:
              return 'alert alert-danger';
          case ToastAlertType.Info:
              return 'alert alert-info';
          case ToastAlertType.Warning:
              return 'alert alert-warning';
      }
  }
}
