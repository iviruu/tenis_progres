import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const rolesGuardGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const expectedRoles = route.data['expectedRoles'] as string[];
  
  const userRoles = authService.getUserRoles();

  console.log('Roles esperados:', expectedRoles);
  console.log('Roles del usuario:', userRoles);


  const userRolesArray = userRoles.split(',').map(role => role.trim());
  const hasRole = expectedRoles.some(role => userRolesArray.includes(role));
  
  if (!hasRole) {
    router.navigate(['/access-denied']);
    return false;
  }

  return true;
};