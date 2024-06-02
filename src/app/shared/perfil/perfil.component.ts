import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Data } from '../../interface/user';
import {  FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  user?: Data;
  userForm: FormGroup;
  uploadMessage: string = '';
  uploadErrorMessage: string = '';
  formMessage: string = '';
  formErrorMessage: string = '';
  submitted: boolean = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.userFormSubmit();
  }

  userFormSubmit(): void {
    this.userService.getUser().subscribe({
      next: (data) => {
        this.user = data.data;
        this.userForm.patchValue({
          name: this.user?.name,
          surname: this.user?.surname,
          email: this.user?.email
        });
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
      }
    });
  }

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) {
      this.uploadMessage = 'No has seleccionado ninguna foto.';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    this.userService.uploadPhoto(formData).subscribe({
      next: (data) => {
        this.uploadMessage = 'Foto subida exitosamente.';
        this.uploadErrorMessage = '';
        this.userFormSubmit(); // Update user data
      },
      error: (err) => {
        console.error('Error uploading photo:', err);
        this.uploadMessage = '';
        this.uploadErrorMessage = err.error.message || 'Error al subir la foto.';
      }
    });
  }

  onSubmit(): void {
    this.submitted = true; // Marcar como enviado para mostrar los mensajes de error

    if (this.userForm.valid) {
      this.userService.update(this.userForm.value).subscribe({
        next: (data) => {
          this.formMessage = 'Datos actualizados exitosamente.';
          this.formErrorMessage = '';
          this.userFormSubmit();
        },
        error: (err) => {
          console.error('Error updating user data:', err);
          this.formMessage = '';
          this.formErrorMessage = err.error.message || 'Error al actualizar los datos.';
        }
      });
    } else {
      this.formMessage = '';
      this.formErrorMessage = 'Por favor, completa todos los campos obligatorios correctamente.';
    }
  }
}

