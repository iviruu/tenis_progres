import { Component, OnInit } from '@angular/core';
import { Data } from '../../../interface/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user.service';
import { Alumno, DatumListaAlumnos } from '../../../interface/ListaAlumnos';

type SortableKeys = 'name' | 'surname';

@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-alumnos.component.html',
  styleUrl: './lista-alumnos.component.css'
})
export class ListaAlumnosComponent implements OnInit{
  users: DatumListaAlumnos[] = [];
  user?:Data;

  searchText: string = '';
  sortKey: SortableKeys = 'name';
  sortDirection: boolean = true; // true para ascendente, false para descendente


  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: data => {
        this.user = data.data;
        if (this.user) {
          this.userService.getAlumnosByProfesor(this.user.id_user).subscribe({
            next: data => {
              this.users = data.data;
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
  }


  filteredUsers() {
    if (!this.users) {
      return [];
    }
    let filtered = this.users.filter(user => {
      const name = user.Alumno.name ? user.Alumno.name.toLowerCase() : '';
      const surname = user.Alumno.surname ? user.Alumno.surname.toLowerCase() : '';
  
      return name.includes(this.searchText.toLowerCase()) || surname.includes(this.searchText.toLowerCase());
    });

    return filtered.sort((a, b) => {
      if (this.sortKey) {
        const aValue = a.Alumno[this.sortKey as keyof Alumno];
        const bValue = b.Alumno[this.sortKey as keyof Alumno];

        if (aValue === null || aValue === undefined) return this.sortDirection ? -1 : 1;
        if (bValue === null || bValue === undefined) return this.sortDirection ? 1 : -1;

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          if (aValue.toLowerCase() < bValue.toLowerCase()) return this.sortDirection ? -1 : 1;
          if (aValue.toLowerCase() > bValue.toLowerCase()) return this.sortDirection ? 1 : -1;
        } else {
          if (aValue < bValue) return this.sortDirection ? -1 : 1;
          if (aValue > bValue) return this.sortDirection ? 1 : -1;
        }
      }
      return 0;
    });
  }

  sortTable(key: SortableKeys) {
    if (this.sortKey === key) {
      this.sortDirection = !this.sortDirection;
    } else {
      this.sortKey = key;
      this.sortDirection = true;
    }
  }

  modifyUser(user: DatumListaAlumnos) {
    // Lógica para modificar usuario
  }

  deleteUser(user: DatumListaAlumnos) {
    // Lógica para borrar usuario
    this.users = this.users.filter(u => u !== user);
  }


}
