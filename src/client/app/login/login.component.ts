import {Component} from '@angular/core';
import {UserLoginModel} from './user_login.model';
import {LoginService} from './login.service';
import {TokenResponseModel} from './token_response.model';
import {Observable} from 'rxjs/Rx';
import {Router} from '@angular/router';
import {JwtHelper} from 'angular2-jwt/angular2-jwt';
declare const Materialize: any;
@Component({
  moduleId: module.id,
  selector: 'bc-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent {
  jwtHelper: JwtHelper = new JwtHelper();
  model = new UserLoginModel();
  enabled = true;

  constructor(private loginService: LoginService, public router: Router) {}

  save() {
    this.enabled = false;
    this.loginService.post(this.model).catch((error: any)=> {
      //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
      Materialize.toast(JSON.parse(error._body).message, 2000);
      this.enabled = true;
      return Observable.empty();
    }).subscribe((response: TokenResponseModel)=> {
      localStorage.setItem('id_token', response.token);
      //noinspection TypeScriptUnresolvedVariable
      let firstname = this.jwtHelper.decodeToken(response.token).firstname;
      this.router.navigate(['/bc']);
      //noinspection TypeScriptUnresolvedFunction
      Materialize.toast(`Welcome back ${firstname}`, 3000);
      this.enabled = true;
    });
  }
}
