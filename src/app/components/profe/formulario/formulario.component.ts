import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Data } from '@angular/router';
import { DatumSaque } from '../../../interface/saque';
import { DatumListaAlumnos } from '../../../interface/ListaAlumnos';
import { UserService } from '../../../services/user.service';
import { DatumResultados } from '../../../interface/resultados';


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit{

  searchText: string = '';
  filteredAlumnos: DatumListaAlumnos[] = [];

  users: DatumListaAlumnos[] = [];
  user?:Data;
  saques: DatumSaque[] = [];

  formData:  Partial<Omit<DatumResultados, 'id' | 'created_at' | 'updated_at'>> = {
    user_id: undefined,
    saque_id: undefined,
    velocidad: undefined,
    punteria: undefined,
  };

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: data => {
        this.user = data.data;
        console.log('Usuario:', this.user);

        if (this.user) {
          this.userService.getAlumnosByProfesor(this.user['id_user']).subscribe({
            next: data => {
              this.users = data.data;
              console.log('Alumnos:', this.users);
            },
            error: error => {
              console.error('Error al obtener los alumnos:', error);
            }
          });
        }
      },
      error: error => {
        console.error('Error al obtener el usuario:', error);
      }
    });
    this.userService.getListaSaques().subscribe({
      next: data => {
        this.saques = data.data;
        console.log('Saques:', this.saques);
      },
      error: error => {
        console.error('Error al obtener los saques:', error);
      }
    });
  }

  filterAlumnos() {
    const searchTerm = this.searchText.toLowerCase();
    this.filteredAlumnos = this.users.filter(alumno => {
      const name = alumno.Alumno.name ? alumno.Alumno.name.toLowerCase() : '';
      const surname = alumno.Alumno.surname ? alumno.Alumno.surname.toLowerCase() : '';
      return name.includes(searchTerm) || surname.includes(searchTerm);
    });
  }

  selectAlumno(alumno: DatumListaAlumnos) {
    this.formData.user_id = alumno.alumno_id;
    this.searchText = `${alumno.Alumno.name} ${alumno.Alumno.surname}`;
    this.filteredAlumnos = [];
  }

  onSubmit() {
    // Validación para asegurarse de que los valores no sean null o undefined antes de enviar
    if (
      this.formData.velocidad === null || this.formData.velocidad === undefined ||
      this.formData.punteria === null || this.formData.punteria === undefined ||
      this.formData.user_id === null || this.formData.user_id === undefined ||
      this.formData.saque_id === null || this.formData.saque_id === undefined 
    ) {
      console.error('Todos los campos son obligatorios y deben ser números válidos.');
      return;
    }

    const resultData: Omit<DatumResultados, 'id' | 'created_at' | 'updated_at'> = {
      user_id: this.formData.user_id!,
      saque_id: this.formData.saque_id!,
      velocidad: this.formData.velocidad!,
      punteria: this.formData.punteria!,
    };

    console.log('Formulario enviado:', resultData);
    // Lógica para manejar el envío del formulario
  }

}
