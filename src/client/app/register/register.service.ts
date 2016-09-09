/**
 * Created by refresh on 9/1/16.
 */
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {BaseResource} from '../shared/index';
import {User} from "../shared/model/user.model";
import {UserRegistrationModel} from "./user_register.model";
@Injectable()
export class RegisterService extends BaseResource<User> {
  constructor(protected http: Http) {
    super(http, 'auth/register');
  }
  register(model: UserRegistrationModel) {
    return this.http.post(this.url, JSON.stringify(model), this.options)
      .map(this.extractData);
  }

}
