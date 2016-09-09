import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {tokenNotExpired, JwtHelper} from 'angular2-jwt/angular2-jwt';
declare const Materialize: any;

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {
  }

  canActivate() {

    if (tokenNotExpired()) {
      let role = new JwtHelper().decodeToken(localStorage.getItem('id_token')).role
      if (role === 1) {
        return true;
      }
    }

    this.router.navigate(['/bc']);
    Materialize.toast("You are not authorized to access this route", 2000);
    return false;
  }
}
