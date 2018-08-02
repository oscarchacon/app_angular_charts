/**
 * CODIGO CREADO POR OSCAR CHACON CAUTIN
 */

import { Component, OnInit } from '@angular/core';
import { IndicadoresService } from './_services/indicadores.service';
import { Indicadores } from './_classes/indicadores';
import * as moment from 'moment';
import { ToastAlertService } from '../toast-alert/toast-alert.service';


@Component({
  selector: 'app-grafico-app',
  templateUrl: './grafico-app.component.html',
  styleUrls: ['./grafico-app.component.css']
})
export class GraficoAppComponent implements OnInit {

  indicadores: Indicadores[] = [];
  grupos: any[] = [];
  indices: any[] = [];
  /*Tipo de grafico*/
  public chartType:string = 'line';

  /*Opciones de grafico*/
  public chartOptions:any = {
    responsive: true
  };

  /*colores para el grafico*/
  public chartColors:Array<any> = [
    {
      backgroundColor: 'rgba(37,134,164,0.2)',
      borderColor: 'rgba(37,134,164,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(37,134,164,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(37,134,164,1)'
    },
    {
      backgroundColor: 'rgba(110,190,159,0.2)',
      borderColor: 'rgba(110,190,159,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(110,190,159,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(110,190,159,1)'
    },
    {
      backgroundColor: 'rgba(199,53,88,0.2)',
      borderColor: 'rgba(199,53,88,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(199,53,88,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(199,53,88,1)'
    },
    {
      backgroundColor: 'rgba(243,169,53,0.2)',
      borderColor: 'rgba(243,169,53,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(243,169,53,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(243,169,53,1)'
    },
    {
      backgroundColor: 'rgba(160,93,232,0.2)',
      borderColor: 'rgba(160,93,232,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(160,93,232,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(160,93,232,1)'
    },
    {
      backgroundColor: 'rgba(85,89,106,0.2)',
      borderColor: 'rgba(85,89,106,1)',
      borderWidth: 2,
      pointBackgroundColor: 'rgba(85,89,106,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(85,89,106,1)'
    },
  ];


  constructor(
    private indicadoresService: IndicadoresService,
    private alertService: ToastAlertService) {
    moment.locale('es');
  }

  /**variables globales */
  indice: string;
  periodo: string;
  f_desde: Date;
  f_hasta: Date;

  muestraGrafico: boolean = false;
  loading: boolean = false;

  ngOnInit() {
    //this.getIndicadoresEstatico();
  }

  /**Función que se obtienen los indicadores del webservice */
  getIndicadores(periodo: string, f_desde: Date, f_hasta: Date, indice?: string) : void {
    if(!periodo || !f_desde || !f_hasta){
      if(!periodo){
        this.alertService.warn("Debe Seleccionar Periodo", "Filtros Busqueda");
      }
      if(!f_desde){
        this.alertService.warn("Debe ingresar una fecha desde para la busqueda", "Filtros Busqueda");
      }
      if(!f_hasta){
        this.alertService.warn("Debe ingresar una fecha hasta para la busqueda", "Filtros Busqueda");
      }
      /*if(!indice){
        this.alertService.warn("Debe Seleccionar un indice", "Filtros Busqueda");
      }*/
      return;
    }

    let f_ini: string = moment(f_desde).format('YYYY-MM-DD');
    let f_fin: string = moment(f_hasta).format('YYYY-MM-DD');
    //console.log(f_ini);
    this.loading = true;
    this.muestraGrafico = false;
    this.indicadoresService.GetCategorias(periodo, f_ini, f_fin, indice)
      .subscribe(
        data => {
          this.indicadores = data;
          this.loading = false;
          this.muestraGrafico = true;
          this.ordenarGrupos(this.indicadores);
        },
        error => {
          this.loading = false;
        }
      );
  }

  /**Funciona que agrupa los valores obtenidos */
  ordenarGrupos(indicadores: Indicadores[]): void {
    this.grupos = [];
    if(indicadores.length > 0){
      this.indices = [];
      for(let indicador of indicadores){
        if(!this.indices.includes(indicador.indice.trim())){
          this.indices.push(indicador.indice.trim());
        }
      }
      for(let index of this.indices){
        this.grupos[index] = [];
      }
      for(let indicador of indicadores){
        let index = indicador.indice.trim();
        this.grupos[index].push(indicador);
      }
      //console.log(this.grupos);
      //console.log(this.indices);
      this.ordenarGruposFecha(this.indices, this.grupos, this.periodo);
    }

  }

  /**Función que permite agrupar los diferentes valores dentro de su rango de fecha e indice */
  ordenarGruposFecha(indices, grupos, periodo): void {
    for(let index of indices){
      let cadena = [];
      let nombre = "";
      let aux = "";
      let data = [];
      let objs = [];
      data['IndiceActual'] = [];
      data['IndiceAnterior'] = [];
      data['IndiceMayor'] = [];
      data['IndiceMenor'] = [];
      data['IndicePromedio'] = [];
      data['IndiceVariacion'] = [];
      for(let indicador of grupos[index]){
        switch(periodo){
          case 'ME':
            aux = moment(indicador.fecha, 'YYYY-MM-DD').format('MMM') + " " + moment(indicador.fecha, 'YYYY-MM-DD').format('YY');
            break;
          case 'AN':
            aux = moment(indicador.fecha, 'YYYY-MM-DD').format('YYYY');
            break;
          case 'DI':
            aux = moment(indicador.fecha, 'YYYY-MM-DD').format('DD') + " " + moment(indicador.fecha, 'YYYY-MM-DD').format('MMM') + " " + moment(indicador.fecha, 'YYYY-MM-DD').format('YY');
            break;
        }
        //aux = moment(indicador.fecha, 'YYYY-MM-DD').format('DD') + " " + moment(indicador.fecha, 'YYYY-MM-DD').format('MMM') + " " + moment(indicador.fecha, 'YYYY-MM-DD').format('YY');
        nombre = aux;
        cadena.push(nombre);
        data['IndiceActual'].push(indicador.ind_act);
        data['IndiceAnterior'].push(indicador.ind_ant);
        data['IndiceMayor'].push(indicador.ind_may);
        data['IndiceMenor'].push(indicador.ind_men);
        data['IndicePromedio'].push(indicador.ind_pro);
        data['IndiceVariacion'].push(indicador.ind_var);

      }
      let var1 = {data: data['IndiceActual'], label: 'Índice Actual'};
      let var2 = {data: data['IndiceAnterior'], label: 'Índice Anterior'};
      let var3 = {data: data['IndiceMayor'], label: 'Valor Máximo Índice'};
      let var4 = {data: data['IndiceMenor'], label: 'Valor Minimo Índice'};
      let var5 = {data: data['IndicePromedio'], label: 'Valor promedio Índice'};
      let var6 = {data: data['IndiceVariacion'], label: 'Variación Porcentual del Índice'};

      objs.push(var1);
      objs.push(var2);
      objs.push(var3);
      objs.push(var4);
      objs.push(var5);
      objs.push(var6);

      grupos[index]['ejeY'] = objs;
      grupos[index]['ejeX'] = cadena;
    }

    //console.log(grupos);
  }

  /**Opciones para hacer click en los graficos */
  /**No implementadas */
  chartClicked(e: any): void { }
  chartHovered(e: any): void { }

}
