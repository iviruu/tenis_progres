import { Routes } from '@angular/router';
import { ProfeComponent } from './components/profe/profe.component';
import { HomeComponent } from './components/home/home.component';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { AuthComponent } from './components/auth/auth.component';
import { RegistrComponent } from './components/registr/registr.component';
import { PerfilComponent } from './shared/perfil/perfil.component';
import { ListaAlumnosComponent } from './components/profe/lista-alumnos/lista-alumnos.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'profe', component: ProfeComponent, children: [
        { path: '', redirectTo: 'perfil', pathMatch: 'full' },
        { path: 'perfil', component: PerfilComponent },
        { path: 'lista_alumnos', component: ListaAlumnosComponent },
    ]},
    {path: 'alumno', component: AlumnoComponent},
    {path: 'login', component: AuthComponent},
    {path: 'register', component: RegistrComponent},
    
];
