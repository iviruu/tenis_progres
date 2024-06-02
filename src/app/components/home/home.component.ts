import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
 roles: string= '';

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { 
    this.tuRol()
  }
  tuRol(){
    this.roles= localStorage.getItem('userRoles')!;
  }
  logout(){
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('userRoles');
      this.tuRol();
    });
  }
}
