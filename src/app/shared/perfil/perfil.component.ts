import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Data } from '../../interface/user';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit{
  user?:Data;


  constructor(
    private userService: UserService
  ) { 

  }
  
  ngOnInit(): void {
      this.userService.getUser().subscribe(data => {
        this.user = data.data;
        console.log('dentro de funcion',this.user);
        return this.user;
    });
  }

}

