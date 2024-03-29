import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private routes: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (localStorage.getItem('role') == 'admin' || localStorage.getItem('role') == 'Admin' ||localStorage.getItem('role') == 'user' ||localStorage.getItem('role') == 'User') {
      return true;
    }
    else {
      this.routes.navigate(['/login']);
      return false;
    }

  }
}