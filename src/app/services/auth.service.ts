import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private myAppUrl: string;
  private myApiUrl: string;


  constructor(
    private http: HttpClient,
  ) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'auth';
  }

  login(email:string, password:string): Observable<any>{
    return this.http.post(this.myAppUrl + this.myApiUrl + '/login', {email, password}, {
      withCredentials: true // Esto asegura que las cookies se envíen
    }).pipe(
      tap((response: any) => {
        if (response.code === 1) {
          // Almacenar los roles del usuario
          localStorage.setItem('userRoles', response.data.user.roles)
        }
      }),
      map((response: any) => {
        if (response.code === 1) {
          // Manejar respuesta exitosa
          return {
            success: true,
            user: response.data.user
          };
        } else {
          // Manejar error en la respuesta
          return {
            success: false,
            message: response.message
          };
        }
      })
    );
  }



  register(data: any){
    return this.http.post(this.myAppUrl + this.myApiUrl + '/register', data, {
      withCredentials: true // Esto asegura que las cookies se envíen
    }).pipe(
      tap((response: any) => {
        if (response.code === 1) {
          // Almacenar los roles del usuario
          localStorage.setItem('userRoles', response.data.user.roles)
          console.log('Roles del usuario:', response.data.user.roles);
        }
      }),
      map((response: any) => {
        if (response.code === 1) {
          // Manejar respuesta exitosa
          return {
            success: true,
            user: response.data.user
          };
        } else {
          // Manejar error en la respuesta
          return {
            success: false,
            message: response.message
          };
        }
      })
    );
  }

  logout(){
    return this.http.get(this.myAppUrl + this.myApiUrl + '/logout', {
      withCredentials: true // Asegura que las cookies se envíen con la solicitud);
  }).pipe(
    tap(() => {
      // Borrar roles del usuario de localStorage al cerrar sesión
      localStorage.removeItem('userRoles');
    })
  );
}

getUserRoles(): string {
  return localStorage.getItem('userRoles') || '';
}

hasRole(role: string): boolean {
  return this.getUserRoles().split(',').map(r => r.trim()).includes(role);
}



}
