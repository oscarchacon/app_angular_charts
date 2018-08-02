import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GraficoAppComponent } from './grafico-app/grafico-app.component';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import localeEsExtra from '@angular/common/locales/es-CL';
import { CustomErrorHandlerService } from './custom-error-handler.service';
import { IndicadoresService } from './grafico-app/_services/indicadores.service';
import { ToastAlertService } from './toast-alert/toast-alert.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { HttpModule } from '@angular/http';
import { PipeCompartidoModule } from './pipes/pipe-compartdo.module';
import { BolsaDatepickerModule } from './datepicker/datepicker.module';
//import { FontAwesomeModule } from '@fortawesome/fontawesome-free';
import { ToastAlertComponent } from './toast-alert/toast-alert.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

registerLocaleData(localeEs, 'es-CL', localeEsExtra);


@NgModule({
  declarations: [
    AppComponent,
    GraficoAppComponent,
    ToastAlertComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    HttpModule,
    FormsModule,
    PipeCompartidoModule,
    BolsaDatepickerModule,
    MDBBootstrapModule.forRoot()
  //FontAwesomeModule
  ],
  providers: [
    CustomErrorHandlerService,
    IndicadoresService,
    ToastAlertService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
