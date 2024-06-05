import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Alumno } from '../../interface/ListaAlumnos';

@Component({
  selector: 'app-ver-perfil-modal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './ver-perfil-modal.component.html',
  styleUrl: './ver-perfil-modal.component.css'
})
export class VerPerfilModalComponent {
  @Input() alumno?: Alumno;
  @Input() isVisible: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  constructor(private router: Router) {}

  close() {
    this.closeModal.emit();
  }

  verResultados() {
    this.router.navigate(['/mis-resultados', this.alumno?.id_user]);
    this.close();
  }
  getPhotoUrl(photo: string ): string {
    return photo? `http://localhost:3000/uploads/${photo}`: '';
  }
}

