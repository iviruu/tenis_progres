import {  Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {  ChartType, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DatumResultados } from '../../interface/resultados';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chards',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './chards.component.html',
  styleUrl: './chards.component.css'
})
export class ChardsComponent implements OnChanges {
  @Input() resultados: DatumResultados[] = [];
  @Input() chartType: ChartType = 'bar';

  public chart:any;

  constructor() {
    // Registrar todos los componentes de Chart.js
    Chart.register(...registerables);
  }

  createChart(){
    if (this.chart) {
      this.chart.destroy();
    }
    const transformedData = this.transformData();
    this.chart = new Chart("MyChart", {
      type: this.chartType, //this denotes tha type of chart

      data: {// values on X-Axis
        labels: transformedData.labels, 
	       datasets: [
          {
            label: "Velocidad",
            data: transformedData.velocidades,
            backgroundColor: 'blue'
          },
          {
            label: "Punteria",
            data: transformedData.punterias,
            backgroundColor: 'limegreen'
          }  
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 14 // Tamaño de fuente ajustado para dispositivos móviles
              }
            }
          },
          tooltip: {
            bodyFont: {
              size: 12 // Tamaño de fuente de las tooltips
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Valores',
              font: {
                size: 14 // Tamaño de fuente ajustado para dispositivos móviles
              }
            },
            ticks: {
              font: {
                size: 12 // Tamaño de fuente de los ticks
              }
            }
          },
          x: {
            title: {
              display: true,
              text: 'Fechas de Creación',
              font: {
                size: 14 // Tamaño de fuente ajustado para dispositivos móviles
              }
            },
            ticks: {
              font: {
                size: 12 // Tamaño de fuente de los ticks
              }
            }
          }
        }
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['resultados'] || changes['chartType']) {
      this.createChart();
      console.log(this.chartType)
    }
  }
transformData() {
  const labels = this.resultados.map(result => new Date(result.created_at).toISOString().split('T')[0]);
  const velocidades = this.resultados.map(result => Number(result.velocidad));
  const punterias = this.resultados.map(result => Number(result.punteria));

  return { labels, velocidades, punterias };
}



}
