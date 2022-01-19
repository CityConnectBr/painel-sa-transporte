import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
  CanLoad,
} from "@angular/router";
import { Observable, from } from "rxjs";
import { AuthService } from "../services/auth.service";
@Injectable({ providedIn: "root" })
export class LoggedInGuard implements CanActivate, CanLoad {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canLoad(
  ): Observable<boolean> {
    return from(this.okOrRedirect());
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return from(this.okOrRedirect());
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    //return this.canActivate(route, state);
    return from(this.okOrRedirect());
  }

  private async okOrRedirect(): Promise<boolean> {
    let status = false;
    try {
      status = await await this.authService.isLogged();
    } catch (e) {
      console.error(e);
    }

    if (!status) {
      this.router.navigate(['/']);
    }

    return status;
  }
}
