import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Data } from '@angular/router';
import { DatumSaque } from '../../../interface/saque';
import { DatumListaAlumnos } from '../../../interface/ListaAlumnos';
import { UserService } from '../../../services/user.service';
import { DatumResultados } from '../../../interface/resultados';


@Component({
  selector: 'app-formulario',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css'
})
export class FormularioComponent implements OnInit{

  searchText: string = '';
  filteredAlumnos: DatumListaAlumnos[] = [];
  showDropdown: boolean = false;
  submitted: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  showConfirmation: boolean = false;

  users: DatumListaAlumnos[] = [];
  user?: Data;
  saques: DatumSaque[] = [];

  formData: FormGroup;

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.formData = this.fb.group({
      user_id: [null, Validators.required],
      saque_id: [null, Validators.required],
      velocidad: [null, [Validators.required, Validators.min(1)]],
      punteria: [null, [Validators.required, Validators.min(1)]]
    });
  }

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

  showAllAlumnos() {
    console.log('los alumnos', this.users);
    this.filteredAlumnos = this.users; // Mostrar todos los alumnos al enfocar
    this.showDropdown = true; // Mostrar el dropdown
  }

  hideAlumnos() {
    // Utiliza un pequeño retraso para permitir que el clic en los elementos del dropdown se registre
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }

  filterAlumnos() {
    const searchTerm = this.searchText.toLowerCase();
    this.filteredAlumnos = this.users.filter(alumno => {
      const name = alumno.Alumno.name ? alumno.Alumno.name.toLowerCase() : '';
      const surname = alumno.Alumno.surname ? alumno.Alumno.surname.toLowerCase() : '';
      return name.includes(searchTerm) || surname.includes(searchTerm);
    });
    this.showDropdown = true;
  }

  selectAlumno(alumno: DatumListaAlumnos) {
    this.formData.patchValue({ user_id: alumno.alumno_id });
    this.searchText = `${alumno.Alumno.name} ${alumno.Alumno.surname}`;
    this.filteredAlumnos = [];
    this.showDropdown = false;
  }

  onSubmit() {
    this.submitted = true;

    if (this.formData.invalid) {
      console.error('Todos los campos son obligatorios y deben ser números válidos.');
      return;
    }

    const resultData: Omit<DatumResultados, 'id' | 'created_at' | 'updated_at'> = {
      user_id: this.formData.value.user_id,
      saque_id: Number(this.formData.value.saque_id),
      velocidad: this.formData.value.velocidad,
      punteria: this.formData.value.punteria
    };

    this.userService.createResultados(resultData).subscribe({
      next: data => {
        console.log('Resultados creados:', data);
        this.showConfirmation = true;

        this.errorMessage = '';
        this.formData.reset();
        this.searchText = '';
        this.submitted = false;
        setTimeout(() => {
          this.showConfirmation = false;
        }, 3000);
      },
      error: error => {
        console.error('Error al crear los resultados:', error);
        this.errorMessage = error.error.message || 'Ocurrió un error al crear los resultados.';
        this.successMessage = '';
      }
    });

    console.log('Formulario enviado:', resultData);
  }
}