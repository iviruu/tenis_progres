import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable, map } from 'rxjs';

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
    return this.http.post(this.myAppUrl + this.myApiUrl + '/register', data);
  }

  logout(){
    return this.http.get(this.myAppUrl + this.myApiUrl + '/logout', {
      withCredentials: true // Asegura que las cookies se envíen con la solicitud);
  });
}
}
