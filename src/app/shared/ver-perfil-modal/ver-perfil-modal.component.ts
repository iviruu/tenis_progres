import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Alumno } from '../../interface/ListaAlumnos';
import { FormsModule } from '@angular/forms';
import { ChardsComponent } from '../chards/chards.component';
import { DatumSaque } from '../../interface/saque';
import { DatumResultados } from '../../interface/resultados';
import { ChartType } from 'chart.js';
import { UserService } from '../../services/user.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-ver-perfil-modal',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ChardsComponent],
  templateUrl: './ver-perfil-modal.component.html',
  styleUrl: './ver-perfil-modal.component.css'
})
export class VerPerfilModalComponent implements OnChanges {
  @Input() alumno?: Alumno;
  @Input() isVisible: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  saques: DatumSaque[] = [];
  resultados: DatumResultados[] = [];
  selectedSaque_id: number | null = null;
  filteredResultados: DatumResultados[] = [];
  showResults: boolean = false;
  selectedChartType: ChartType = 'bar';

  constructor(private router: Router, private userService: UserService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['alumno'] && changes['alumno'].currentValue) {
      this.loadAlumnoData();
    }
  }

  loadAlumnoData() {
    if (this.alumno) {
      this.userService.getListaSaques().subscribe({
        next: data => {
          this.saques = data.data;
        },
        error: error => {
          console.error('Error al obtener los saques:', error);
        }
      });
      this.userService.getResultadosByIdAlumno(this.alumno.id_user).subscribe({
        next: data => {
          this.resultados = data.data;
        },
        error: error => {
          console.error('Error al obtener los resultados:', error);
        }
      });
    }
  }

  close() {
    this.closeModal.emit();
    this.showResults = false;
  }

  verResultados() {
    this.showResults = true;
  }

  closeResults() {
    this.showResults = false;
  }

  filterResultados() {
    if (this.selectedSaque_id !== null) {
      this.filteredResultados = this.resultados.filter(resultado => resultado.saque_id == this.selectedSaque_id);
    } else {
      this.filteredResultados = [];
    }
  }
  getPhotoUrl(photo: string ): string {
    return photo? `http://localhost:3000/uploads/${photo}`: '';
  }
  openModal() {
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
}

