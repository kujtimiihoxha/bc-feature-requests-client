/**
 * Copyright [2016] [Kujtim Hoxha]
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {Component} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Router} from '@angular/router';
import {JwtHelper} from 'angular2-jwt/angular2-jwt';
import {
  UserLoginModel,
  TokenResponseModel
} from './index';
import {LoginService} from './login.service';
import {AuthService} from '../shared/index'
import {WebSocketService} from "../shared/websocket/websocket.service";
declare const Materialize: any;
/**
 * LoginComponent.
 * Used to login to the app.
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
@Component({
  moduleId: module.id,
  selector: 'bc-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent {

  /**
   * Decodes the jwt token.
   * @type {JwtHelper}
   */
  jwtHelper: JwtHelper = new JwtHelper();

  /**
   * The model of the data that will be sent to the server.
   */
  model:UserLoginModel = new UserLoginModel();

  /**
   * If request is submitted it disables the login button.
   */
  enabled:boolean = true;

  /**
   * Constructor tha injects the necessary injectable classes.
   * @param loginService used to send login request.
   * @param router used to navigate to dashboard.
   * @param auth used to initiate the user.
   */
  constructor(private loginService: LoginService, private router: Router, private auth: AuthService, private webSocket: WebSocketService) {}

  /**
   * Send the login request.
   */
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
      this.auth.init()
      this.router.navigate(['/bc']);
      //noinspection TypeScriptUnresolvedFunction
      if (this.auth.user().role !== 3){
        this.webSocket.connect(this.auth.user().username);
        Materialize.toast(`Welcome back ${this.auth.user().firstname}`, 3000);
      } else {
        console.log(this.auth.user())
        Materialize.toast(`Welcome back ${this.auth.user().clientname}`, 3000);
      }
      this.enabled = true;
    });
  }
}
