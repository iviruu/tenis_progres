import { Routes } from '@angular/router';
import { ProfeComponent } from './components/profe/profe.component';
import { HomeComponent } from './components/home/home.component';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { AuthComponent } from './components/auth/auth.component';
import { RegistrComponent } from './components/registr/registr.component';
import { Home2Component } from './components/home2/home2.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'profe', component: ProfeComponent},
    {path: 'alumno', component: AlumnoComponent},
    {path: 'login', component: AuthComponent},
    {path: 'register', component: RegistrComponent},
    {path: 'home2', component: Home2Component},
    {path: '**', redirectTo: 'home'}
];
