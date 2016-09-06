import {Component} from "@angular/core";
import {UserLoginModel} from "./user_login.model";
import {LoginService} from "./login.service";
import {TokenResponseModel} from "./token_response.module";
import {Observable} from 'rxjs/Rx';
import {Router} from "@angular/router";
import {JwtHelper} from 'angular2-jwt/angular2-jwt';
declare const  Materialize:any
@Component({
  moduleId: module.id,
  selector: 'bc-login',
  templateUrl: 'login.component.html',
})
export class LoginComponent {
    jwtHelper: JwtHelper = new JwtHelper();
    model = new UserLoginModel()
    enabled = true;
    constructor(private loginService : LoginService, public router: Router){

    }
    save(){
      this.enabled = false;
      this.loginService.post(this.model).catch((error: any)=>{
        Materialize.toast(JSON.parse(error._body).message,2000)
        this.enabled = true;
        return Observable.empty();
      }).subscribe((response: TokenResponseModel)=>{
        localStorage.setItem('id_token', response.token);
        let firstname = this.jwtHelper.decodeToken(response.token).firstname;
        this.router.navigate(['/bc']);
        Materialize.toast(`Welcome back ${firstname}`,3000)
        this.enabled = true;
      })
    }
}
