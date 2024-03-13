import {ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot, Router} from "@angular/router";
import {AuthService} from "../services/auth-service";
import {inject} from "@angular/core";

export const canActivate: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
}
