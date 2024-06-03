import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { Data } from '../../../interface/user';
import { DataListaPendiente } from '../../../interface/alumnosPendientes';

@Component({
  selector: 'app-invitaciones',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invitaciones.component.html',
  styleUrl: './invitaciones.component.css'
})
export class InvitacionesComponent implements OnInit{
  solicitud: DataListaPendiente[] = [];
  user?: Data;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadUserAndRelations();
  }

  loadUserAndRelations(): void {
    this.userService.getUser().subscribe({
      next: data => {
        this.user = data.data;

        if (this.user && this.user.id_user) {
          this.userService.getRelacionIdProfesor(this.user.id_user).subscribe({
            next: data => {
              console.log(data);
              this.solicitud = data.data;
            },
            error: error => {
              console.error('Error al obtener las relaciones del profesor:', error);
            }
          });
        }
      },
      error: error => {
        console.error('Error al obtener los datos del usuario:', error);
      }
    });
  }

  eliminarSolicitud(id: number): void {
    this.userService.deleteRelacion(id).subscribe({
      next: data => {
        console.log(id)
        this.loadUserAndRelations();
      },
      error: error => {
        console.error('Error al eliminar la solicitud:', error);
      }
    });
  }
}
