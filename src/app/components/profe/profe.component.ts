import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profe',
  standalone: true,
  imports: [NavbarComponent, RouterOutlet],
  templateUrl: './profe.component.html',
  styleUrl: './profe.component.css'
})
export class ProfeComponent {

}
