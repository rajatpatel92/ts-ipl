import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { auth } from 'firebase';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminAccessGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (auth().currentUser) {
      return environment.appConfig.adminUid == auth().currentUser.uid;
    } else {
      console.log('Access Denied');
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
