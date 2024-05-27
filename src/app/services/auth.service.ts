import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

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

  login(email:string, password:string){
    return this.http.post(this.myAppUrl + this.myApiUrl + '/login', {email, password});
  }

  register(data: any){
    return this.http.post(this.myAppUrl + this.myApiUrl + '/register', data);
  }

  logout(){
    return this.http.get(this.myAppUrl + this.myApiUrl + '/logout');
  }
}
