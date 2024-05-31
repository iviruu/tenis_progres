import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../interface/user';
import { Saque } from '../interface/saque';
import { Resultados } from '../interface/resultados';
import { ListaAlumnos } from '../interface/ListaAlumnos';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private myAppUrl: string;
  private myApiUrl: string;

  constructor(
    private http: HttpClient,
  ) { 
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'user';
  }

  getUser():Observable<User>{
    return this.http.get<User>(this.myAppUrl + this.myApiUrl , {
      withCredentials: true // Asegura que las cookies se envíen con la solicitud
    });
  }

  getAlumnosByProfesor(id:number):Observable<ListaAlumnos>{
    return this.http.get<ListaAlumnos>(this.myAppUrl + this.myApiUrl + '/teacher/alumnos/' + id, {
      withCredentials: true // Asegura que las cookies se envíen con la solicitud
    });
  }

  getListaSaques():Observable<Saque>{
    return this.http.get<Saque>(this.myAppUrl + this.myApiUrl + '/saque', {
      withCredentials: true // Asegura que las cookies se envíen con la solicitud
    });
  }

  getResultadosByIdAlumno(id:number):Observable<Resultados>{
    return this.http.get<Resultados>(this.myAppUrl + this.myApiUrl + '/resultados/alumno/' + id, {
      withCredentials: true // Asegura que las cookies se envíen con la solicitud
    });
  }

  postResultadosSaqueAlumno(user_id:number, saque_id:number):Observable<Resultados>{
    return this.http.post<Resultados>(this.myAppUrl + this.myApiUrl + '/resultados/solo/', {user_id, saque_id}, {
      withCredentials: true // Asegura que las cookies se envíen con la solicitud
    });
  }

  createResultados(user_id:number, saque_id:number, velocidad:string, punteria:string):Observable<Resultados>{
    return this.http.post<Resultados>(this.myAppUrl + this.myApiUrl + '/create', {user_id, saque_id, velocidad, punteria}, {
      withCredentials: true // Asegura que las cookies se envíen con la solicitud
    });
  }

  createRelacionProfesorAlumno(alumno_id:number, teacher_id:number, estado_relacion:number):Observable<ListaAlumnos>{
    return this.http.post<ListaAlumnos>(this.myAppUrl + this.myApiUrl + '/teacher/create', {alumno_id, teacher_id, estado_relacion}, {
      withCredentials: true // Asegura que las cookies se envíen con la solicitud
    });
  }



}
