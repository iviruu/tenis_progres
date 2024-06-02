import { Component, OnInit } from '@angular/core';
import { Data } from '../../../interface/user';
import { UserService } from '../../../services/user.service';
import { DataRelacionAlumno } from '../../../interface/relacion';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensajes.component.html',
  styleUrl: './mensajes.component.css'
})
export class MensajesComponent implements OnInit{
  solicitud?: DataRelacionAlumno;
  user?: Data
  user_id?: number;


  constructor(
    private userService: UserService,
    private router: Router
  ) { }

 ngOnInit(): void {
    this.loadUserAndRelations();
}
loadUserAndRelations(): void {
  this.userService.getUser().subscribe(data => {
    this.user = data.data;

    if (this.user && this.user.id_user) {
      this.userService.getRelacionForAlumno(this.user.id_user).subscribe(data => {
        this.solicitud = data.data;
      });
    }
  });
}

  aceptarSolicitud(relacion_id: number, a: number){
    this.userService.updateRelacion(relacion_id, a).subscribe({
      next:(data) => {
        this.loadUserAndRelations();
      }
    });
  }
}



