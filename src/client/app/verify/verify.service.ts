/**
 * Created by refresh on 9/1/16.
 */
import {Http} from '@angular/http';
import {Injectable} from '@angular/core';
import {BaseResource} from '../shared/index';
import {User} from "../shared/model/user.model";
@Injectable()
export class VerifyService extends BaseResource<User> {
  constructor(protected http: Http) {
    super(http, 'auth/verify');
  }
}
