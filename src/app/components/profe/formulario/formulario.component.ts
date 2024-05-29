import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Data } from '@angular/router';
import { DatumSaque } from '../../../interface/saque';

@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent {

  searchText: string = '';
  filteredAlumnos: Data[] = [];

  users: Data[] = [
    { name: 'John', surname: 'Doe', email: 'john.doe@example.com', roles: 1, created_at: new Date(), updated_at: new Date(), id_user: 1, photo: null },
    { name: 'Jane', surname: 'Doe', email: 'jane.doe@example.com', roles: 2, created_at: new Date(), updated_at: new Date(), id_user: 2, photo: null},
    // Agrega más usuarios aquí
  ];

  saques: DatumSaque[] = [
    { id_saque: 1, type_saque: 'Saque de potencia' },
    { id_saque: 2, type_saque: 'Saque de precisión' },
    // Agrega más tipos de saques aquí
  ];

  formData = {
    user_id: null,
    saque_id: null,
    velocidad: null,
    punteria: null
  };

  filterAlumnos() {
    if (this.searchText) {
      const searchTerm = this.searchText.toLowerCase();
      this.filteredAlumnos = this.users.filter(alumno =>
        alumno['name'].toLowerCase().includes(searchTerm) || alumno['surname'].toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredAlumnos = [];
    }
  }

  selectAlumno(alumno: Data) {
    this.formData.user_id = alumno['id_user'];
    this.searchText = `${alumno['name']} ${alumno['surname']}`;
    this.filteredAlumnos = [];
  }

  onSubmit() {
    console.log('Formulario enviado:', this.formData);
    // Lógica para manejar el envío del formulario
  }

}
