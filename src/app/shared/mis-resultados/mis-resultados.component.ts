import { Component, OnInit } from '@angular/core';
import { DatumResultados } from '../../interface/resultados';
import { CommonModule } from '@angular/common';
import { DatumSaque } from '../../interface/saque';
import { FormsModule } from '@angular/forms';
import { BaseChartDirective } from 'ng2-charts';
import { ChardsComponent } from '../chards/chards.component';
import * as bootstrap from 'bootstrap';
import { ChartType } from 'chart.js';
import { UserService } from '../../services/user.service';
import { Data } from '../../interface/user';


@Component({
  selector: 'app-mis-resultados',
  standalone: true,
  imports: [CommonModule,FormsModule,BaseChartDirective, ChardsComponent  ],
  templateUrl: './mis-resultados.component.html',
  styleUrl: './mis-resultados.component.css'
})
export class MisResultadosComponent implements OnInit{

  saques: DatumSaque[] = [];
  user?:Data;
  resultados: DatumResultados[] = [];

  selectedSaque_id: number | null = null;
  filteredResultados: DatumResultados[] = [];
  modalResultados: DatumResultados[] = [];

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getListaSaques().subscribe({
      next: data => {
        this.saques = data.data;
        console.log('Saques:', this.saques);
      },
      error: error => {
        console.error('Error al obtener los saques:', error);
      }
    });
    this.userService.getUser().subscribe({
      next: data => {
        this.user = data.data;
        console.log('Usuario:', this.user);
  if (this.user) {
  this.userService.getResultadosByIdAlumno(this.user.id_user).subscribe({
    next: data => {
      this.resultados = data.data;
      console.log('Resultados:', this.resultados);
    },
    error: error => {
      console.error('Error al obtener los resultados:', error);
    }
  });
  }
}
});
 }
  filterResultados() {
    if (this.selectedSaque_id !== null) {
      this.filteredResultados = this.resultados.filter(resultado => resultado.saque_id == this.selectedSaque_id);
    } else {
      this.filteredResultados = [];
    }
  }
  openModal() {
    console.log('Resultados filtrados:', this.filteredResultados);
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
