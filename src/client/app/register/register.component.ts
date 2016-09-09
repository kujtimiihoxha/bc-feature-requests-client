/**
 * Created by kujtim on 9/9/2016.
 */
import {Component} from '@angular/core';
import {UserRegistrationModel} from "./user_register.model";
import {RegisterService} from "./register.service";
import {Observable} from "rxjs/Rx";
declare const Materialize: any;
@Component({
  moduleId: module.id,
  selector: 'bc-register',
  templateUrl: 'register.component.html',
  styleUrls:['register.component.css']
})
export class RegisterComponent {
  model = new UserRegistrationModel();
  enabled = true;
  submitted = false;
  get passwordsValid(): boolean {
    return this.model.confirm_password === this.model.password
  }
  constructor(private registerService: RegisterService) {}
  save() {
    this.enabled = false;
    this.registerService.register(this.model).catch((error: any)=> {
      //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
      Materialize.toast(JSON.parse(error._body).message, 2000);
      this.enabled = true;
      return Observable.empty();
    }).subscribe(()=> {
      this.enabled = true;
      this.submitted = true
    });
  }
}
