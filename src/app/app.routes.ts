import { Routes } from '@angular/router';
import { ProfeComponent } from './components/profe/profe.component';
import { HomeComponent } from './components/home/home.component';
import { AlumnoComponent } from './components/alumno/alumno.component';
import { AuthComponent } from './components/auth/auth.component';
import { RegistrComponent } from './components/registr/registr.component';
import { PerfilComponent } from './shared/perfil/perfil.component';
import { ListaAlumnosComponent } from './components/profe/lista-alumnos/lista-alumnos.component';
import { FormularioComponent } from './components/profe/formulario/formulario.component';
import { MisResultadosComponent } from './shared/mis-resultados/mis-resultados.component';
import { rolesGuardGuard } from './guards/roles-guard.guard';
import { AccessDeniedComponent } from './shared/access-denied/access-denied.component';
import { NuevoAlumnoComponent } from './components/profe/nuevo-alumno/nuevo-alumno.component';
import { MensajesComponent } from './components/alumno/mensajes/mensajes.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'profe', component: ProfeComponent, canActivate:[rolesGuardGuard], data:{ expectedRoles: ['2'] },
     children: [
        { path: '', redirectTo: 'perfil', pathMatch: 'full' },
        { path: 'perfil', component: PerfilComponent },
        { path: 'lista_alumnos', component: ListaAlumnosComponent },
        { path: 'resultados', component: FormularioComponent},
        {path: 'nuevo_alumno', component: NuevoAlumnoComponent},
    ]},
    {path: 'alumno', component: AlumnoComponent, canActivate:[rolesGuardGuard], data:{ expectedRoles: ['1'] }, 
    children:[
        { path: '', redirectTo: 'perfil', pathMatch: 'full' },
        { path: 'perfil', component: PerfilComponent },
        { path: 'mis_resultados', component: MisResultadosComponent},
        {path: 'mensajes', component: MensajesComponent}
    
    ]},
    {path: 'login', component: AuthComponent},
    {path: 'register', component: RegistrComponent},
    {path: 'access-denied', component: AccessDeniedComponent},
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    
];
