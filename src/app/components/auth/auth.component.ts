import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  form: FormGroup;
  enviar: boolean = false;

  constructor(
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email:['',Validators.required, Validators.email],
      password:['',Validators.required]
    });
  }


  onSubmit(){
    this.enviar = true;
    if(this.form.invalid){
      console.log(this.form.value);
      return;
      
    }
  }

}
