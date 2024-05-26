import { Routes } from '@angular/router';
import { ProfeComponent } from './components/profe/profe.component';
import { HomeComponent } from './components/home/home.component';
import { AlumnoComponent } from './components/alumno/alumno.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'profe', component: ProfeComponent},
    {path: 'alumno', component: AlumnoComponent},
    {path: '**', redirectTo: 'home'}
];
