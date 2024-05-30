import { Component, NgModule } from '@angular/core';
import { DatumResultados } from '../../interface/resultados';
import { CommonModule } from '@angular/common';
import { DatumSaque } from '../../interface/saque';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-mis-resultados',
  standalone: true,
  imports: [CommonModule,FormsModule ],
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
    { saque_id: 2, velocidad: '150',punteria:'25',user_id: 1, id: 3,created_at: new Date(), updated_at: new Date()}
    // Agrega más resultados aquí
  ];

  selectedSaque_id: number | null = null;
  filteredResultados: DatumResultados[] = [];

  filterResultados() {
    if (this.selectedSaque_id !== null) {
      this.filteredResultados = this.resultados.filter(resultado => resultado.saque_id === this.selectedSaque_id);
    } else {
      this.filteredResultados = [];
    }
  }

  onSubmit() {
    // Maneja el envío del formulario si es necesario
  }
}
