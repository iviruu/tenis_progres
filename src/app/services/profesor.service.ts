import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { Saque } from '../interface/saque';


@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(
    private http: HttpClient,
  ) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'user';
  }

  getUser():Observable<User>{
    return this.http.get<User>(this.myAppUrl + this.myApiUrl );
  }

  getListaAlumnos(id:number):Observable<User[]>{
    return this.http.get<User[]>(this.myAppUrl + this.myApiUrl + '/teacher/alumnos/' + id);
  }

  postListaSaques():Observable<Saque[]>{
    return this.http.post<Saque[]>(this.myAppUrl + this.myApiUrl + '/teacher/saques');
  }








}
