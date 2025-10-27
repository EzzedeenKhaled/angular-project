import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';

export const ResetPasswordGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const router = inject(Router);

  // Check if URL contains the 'oobCode' query parameter (sent by Firebase)
  const oobCode = route.queryParamMap.get('oobCode');

  if (!oobCode) {
    // If no code found → block access and redirect
    router.navigate(['/login']);
    return false;
  }

  // Allow access only when oobCode exists
  return true;
};
