import { Component } from '@angular/core';
import { Data } from '../../../interface/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-lista-alumnos',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lista-alumnos.component.html',
  styleUrl: './lista-alumnos.component.css'
})
export class ListaAlumnosComponent {
  users: Data[] = [
    { name: 'John', surname: 'Doe', email: 'john.doe@example.com', roles: 1, created_at: new Date(), updated_at: new Date(), id_user: 1, photo: null },
    { name: 'Jane', surname: 'Doe', email: 'jane.doe@example.com', roles: 2, created_at: new Date(), updated_at: new Date(), id_user: 2, photo: null},
    // Agrega más usuarios aquí
  ];

  searchText: string = '';
  sortKey: keyof Data | ''= '';
  sortDirection: boolean = true; // true para ascendente, false para descendente

  filteredUsers() {
    let filtered = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.surname.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(this.searchText.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (this.sortKey) {
        let aValue = a[this.sortKey];
        let bValue = b[this.sortKey];

        if (aValue === null || aValue === undefined) return this.sortDirection ? -1 : 1;
        if (bValue === null || bValue === undefined) return this.sortDirection ? 1 : -1;

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        if (aValue < bValue) return this.sortDirection ? -1 : 1;
        if (aValue > bValue) return this.sortDirection ? 1 : -1;
        return 0;
      }

      return 0;
    });
  }

  sortTable(key: keyof Data) {
    if (this.sortKey === key) {
      this.sortDirection = !this.sortDirection;
    } else {
      this.sortKey = key;
      this.sortDirection = true;
    }
  }

  modifyUser(user: Data) {
    // Lógica para modificar usuario
    console.log('Modificar usuario:', user);
  }

  deleteUser(user: Data) {
    // Lógica para borrar usuario
    this.users = this.users.filter(u => u !== user);
  }


}
