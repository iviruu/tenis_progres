import { Component } from '@angular/core';
import { DatumResultados } from '../../interface/resultados';
import { CommonModule } from '@angular/common';
import { DatumSaque } from '../../interface/saque';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChardsComponent } from '../chards/chards.component';
import * as bootstrap from 'bootstrap';
import { ChartType } from 'chart.js';


@Component({
  selector: 'app-mis-resultados',
  standalone: true,
  imports: [CommonModule,FormsModule,BaseChartDirective, ChardsComponent  ],
  templateUrl: './mis-resultados.component.html',
  styleUrl: './mis-resultados.component.css'
})
export class MisResultadosComponent {

  saques: DatumSaque[] = [
    { id_saque: 1, type_saque: 'Saque de potencia' },
    { id_saque: 2, type_saque: 'Saque de precisión' },
    // Agrega más tipos de saques aquí
  ];

  resultados: DatumResultados[] = [
    { saque_id: 1, velocidad: '100',punteria: '20',user_id: 1, id: 1,created_at: new Date(), updated_at: new Date()},
    { saque_id: 1, velocidad: '120',punteria: '30' ,user_id: 1, id: 2,created_at: new Date(), updated_at: new Date()},
    { saque_id: 1, velocidad: '110',punteria: '15',user_id: 1, id: 3,created_at: new Date(), updated_at: new Date()},
    { saque_id: 1, velocidad: '160',punteria: '13',user_id: 1, id: 4,created_at: new Date(), updated_at: new Date()},
    { saque_id: 1, velocidad: '70',punteria: '18',user_id: 1, id: 5,created_at: new Date(), updated_at: new Date()},
    { saque_id: 2, velocidad: '150',punteria:'25',user_id: 1, id: 6,created_at: new Date(), updated_at: new Date()}
    // Agrega más resultados aquí
  ];

  selectedSaque_id: number | null = null;
  filteredResultados: DatumResultados[] = [];
  modalResultados: DatumResultados[] = [];

  filterResultados() {
    if (this.selectedSaque_id !== null) {
      this.filteredResultados = this.resultados.filter(resultado => resultado.saque_id == this.selectedSaque_id);
    } else {
      this.filteredResultados = [];
    }
  }
  openModal() {
    this.modalResultados = this.filteredResultados;
    const modalElement = document.getElementById('resultadosModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  chartTypes = {
    bar: true,
    line: false
  };

  selectedChartType: ChartType = 'bar';

  updateChartType() {
    if (this.chartTypes.bar && this.chartTypes.line) {
      // Si ambos están seleccionados, por defecto a 'bar'
      this.selectedChartType = 'bar';
    } else if (this.chartTypes.line) {
      this.selectedChartType = 'line';
    } else {
      this.selectedChartType = 'bar';
    }
  }
}
