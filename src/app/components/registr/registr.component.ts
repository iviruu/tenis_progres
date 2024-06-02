import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-registr',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule, HttpClientModule, FormsModule],
  templateUrl: './registr.component.html',
  styleUrl: './registr.component.css'
})
export class RegistrComponent {
[x: string]: any;

  form: FormGroup;
  enviar: boolean = false;
  serverError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private login: AuthService,
  ) {
    this.enviar = false;
    this.form = this.fb.group({
      name:['',Validators.required],
      surname:['',Validators.required],
      email:['',[Validators.required, Validators.email]],
      password:['',Validators.required],
      roles:['',Validators.required]
    });
  }


  onSubmit(){
    this.enviar = true;
    this.serverError = null;
    if(this.form.valid){
      this.enviar = false;
      this.login.register(this.form.value).subscribe({
        next: res => {          
          if (this.form.value.roles === '2') {
            this.router.navigate(['/profe']);
          } else if (this.form.value.roles === '1') {
            this.router.navigate(['/alumno']);
          }
        },
        error: err => {
          console.log(err);
          if (err.error && err.error.message) {
            
            this.serverError = err.error.message; // Capture server error message
          } else {
            this.serverError = 'An unexpected error occurred. Please try again later.';
          }
        }
      });
      
    }
  }
}
