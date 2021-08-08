import { CanLoad, Route, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';
import { tap, map, take, first } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async canLoad() {
    return true;//await this.authService.isLogged();
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log("canActivate", await this.authService.isLogged());
    const user = await this.authService.isLogged();
    if (user) {
      return true;
    }

    this.authService.logout();
    this.router.navigate(['/login']);
    return false;
  }


}

