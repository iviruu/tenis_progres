import { Component} from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent{

constructor(
  private authService: AuthService,
) { }

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
