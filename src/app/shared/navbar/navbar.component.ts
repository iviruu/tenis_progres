import { Component} from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { Data } from '../../interface/user';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{
user?: Data;
roles: string = '';

constructor(
  private authService: AuthService,
  private userService: UserService
) { 
  this.userService.getUser().subscribe({
    next: data => {
      this.user = data.data;
      console.log('Usuario:', data);
    },
    error: error => {
      console.error('Error al obtener el usuario:', error);
    }
  });
  this.roles = localStorage.getItem('userRoles')!;
}

logout(){
  this.authService.logout().subscribe({
    next: data => {
      console.log('Sesión cerrada:', data);
      window.location.href = '/login';
    },
    error: error => {
      console.error('Error al cerrar sesión:', error);
    }
  });

}
}
