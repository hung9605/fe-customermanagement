import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { jwtDecode } from "jwt-decode";

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot,state: RouterStateSnapshot) => {
    
  const router = inject(Router);
    localStorage.setItem('redirect_url', state.url);
    const token = localStorage.getItem("access_token");
    if (!token) {
        return false;
    }
  try {
    const decoded: any = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000); // thời gian hiện tại (seconds)
    if (decoded.exp && decoded.exp < now) {
      console.warn("Token is expired");
      localStorage.removeItem("access_token");
      router.navigate(['/oauth2']);
      return false;
    }
  } catch (e) {
    console.error("Token is not valid", e);
    localStorage.removeItem('access_token');
    router.navigate(['/oauth2']);
    return false;
  }


    return true;
}