import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink,  } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {  HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {

  form: FormGroup;
  enviar: boolean = false;
  roles: string= '';
  backendError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private login: AuthService,
  ) {
    this.enviar = false;
    this.form = this.fb.group({
      email:['',[Validators.required, Validators.email]],
      password:['',Validators.required]
    });
  }


  onSubmit(){
    this.enviar = true;
    if(this.form.valid){
      this.enviar = false;
      this.login.login(this.form.value.email, this.form.value.password).subscribe({
        next: res => {
          this.roles= localStorage.getItem('userRoles')!;
          if(this.roles === '2'){
          this.router.navigate(['/profe']);
        }
          else if(this.roles === '1'){
            this.router.navigate(['/alumno']);
          }
        },
        error: err => {
          // Mostrar el mensaje de error del backend
          if (err.status === 401) {
            this.backendError = 'Email o contraseña incorrecta.';
          } else {
            this.backendError = 'Ocurrió un error. Por favor, inténtalo de nuevo.';
          }
        }
      });
    } else {
      console.log('Formulario inválido');
    }
  }
}
