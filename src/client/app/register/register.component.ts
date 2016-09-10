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
import {
  UserRegistrationModel,
} from './index';
import {RegisterService} from './register.service';
declare const Materialize: any;
/**
 * RegisterComponent.
 * Used to register a new user
 *
 * @author Kujtim Hoxha
 * @email kujtimii.h@gmail.com
 * @date 9/10/16
 **/
@Component({
  moduleId: module.id,
  selector: 'bc-register',
  templateUrl: 'register.component.html',
  styleUrls:['register.component.css']
})
export class RegisterComponent {
  /**
   * Model of register form that will be sent to the server.
   */
  model = new UserRegistrationModel();

  /**
   * If request is submitted it disables the register button.
   */
  enabled = true;

  /**
   * If request successful display the message for verification.
   */
  submitted = false;

  /**
   * Is password and confirm password the same.
   */
  get passwordsValid(): boolean {
    return this.model.confirm_password === this.model.password;
  }

  /**
   * Injects register service.
   * @param registerService used to send the register request to the server.
   */
  constructor(private registerService: RegisterService) {}

  /**
   * Send the register request.
   */
  save() {
    this.enabled = false;
    this.registerService.register(this.model).catch((error: any)=> {
      //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
      Materialize.toast(JSON.parse(error._body).message, 2000);
      this.enabled = true;
      return Observable.empty();
    }).subscribe(()=> {
      this.enabled = true;
      this.submitted = true;
    });
  }
}
