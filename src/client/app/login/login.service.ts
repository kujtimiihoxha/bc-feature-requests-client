/**
 * Created by refresh on 9/1/16.
 */
import {Http} from "@angular/http";
import {Injectable} from "@angular/core";
import {BaseResource} from "../shared/index";
import {UserLoginModel} from "./user_login.model";
@Injectable()
export class LoginService extends BaseResource<UserLoginModel> {
  constructor(protected http: Http){
    super(http,"auth/login")
  }
}
