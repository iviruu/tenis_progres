import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {  FormsModule } from '@angular/forms';
import { DatumListaAlumnos } from '../../../interface/ListaAlumnos';
import { UserService } from '../../../services/user.service';
import { Data } from '../../../interface/user';
import { relacion, todaListaAlumnos } from '../../../interface/relacion';

@Component({
  selector: 'app-nuevo-alumno',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './nuevo-alumno.component.html',
  styleUrl: './nuevo-alumno.component.css'
})
export class NuevoAlumnoComponent implements OnInit{

  searchText: string = '';
  filteredAlumnos: todaListaAlumnos[] = [];
  showDropdown: boolean = false;

  users: todaListaAlumnos[] = [];
  user?: Data;

  selectedAlumno?: todaListaAlumnos;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: data => {
        this.user = data.data;
        console.log('Usuario:', this.user);

          this.userService.getAlumnosList().subscribe({
            next: data => {
              this.users = data.data;
              console.log('Alumnos:', this.users);
              this.filteredAlumnos = this.users; // Inicialmente mostrar todos los alumnos
              console.log('Alumnos filtrados:', this.filteredAlumnos);
            },
            error: error => {
              console.error('Error al obtener los alumnos:', error);
            }
          });
        
      },
      error: error => {
        console.error('Error al obtener el usuario:', error);
      }
    });
  }

  filterAlumnos() {
    const searchTerm = this.searchText.toLowerCase();
    this.filteredAlumnos = this.users.filter(alumno => {
      const name = alumno.name ? alumno.name.toLowerCase() : '';
      const surname = alumno.surname ? alumno.surname.toLowerCase() : '';
      return name.includes(searchTerm) || surname.includes(searchTerm);
    });
    this.showDropdown = true; // Mostrar el dropdown al filtrar
  }

  showAllAlumnos() {
    this.filteredAlumnos = this.users; // Mostrar todos los alumnos al enfocar
    this.showDropdown = true; // Mostrar el dropdown
  }

  hideAlumnos() {
    // Utiliza un pequeño retraso para permitir que el clic en los elementos del dropdown se registre
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  selectAlumno(alumno: todaListaAlumnos) {
    this.selectedAlumno = alumno;
    this.searchText = `${alumno.name} ${alumno.surname}`;
    this.filteredAlumnos = [];
    this.showDropdown = false; // Ocultar el dropdown al seleccionar un alumno
  }

  onSubmit() {
    if (!this.selectedAlumno || !this.user) {
      console.error('Debe seleccionar un alumno para crear la conexión.');
      return;
    }

    const connectionData:Omit<relacion, 'relacion_id'> = {
      alumno_id: this.selectedAlumno.id,
      teacher_id: this.user['id_user'],
      estado_relacion: 0
    };

    this.userService.createRelacionProfesorAlumno(connectionData).subscribe({
      next: data => {
        console.log('Conexión creada:', data);
      },
      error: error => {
        console.error('Error al crear la conexión:', error);
      }
    });
  }
}
